import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';
import prisma from '@root/prisma/prisma';
import { Person, Prisma, Todo } from '@prisma/client';

export type TodoWithAssignee = Prisma.TodoGetPayload<{
  include: { assignee: true }
}>;

export type TodoInput = {
  id: number | null,
  assigneeId: number,
  description: string,
  dueDate: string,
  title: string
};

export const appRouter = trpc
  .router()
  .query('todos.getMany', {
    async resolve() : Promise<TodoWithAssignee[]> {
      const todos : TodoWithAssignee[] = await prisma.todo.findMany({
        include: { assignee: true },
      });
      return todos;
    },
  })
  .query('peoples.getMany', {
    async resolve() : Promise<Person[]> {
      const people: Person[] = await prisma.person.findMany();
      return people;
    },
  })
  .query('todos.getSingle', {
    input: z.number(),
    async resolve({ input }) : Promise<Todo | null> {
      const todo: Todo | null = await prisma.todo.findUnique({
        where: { id: input },
      });
      return todo;
    },
  })
  .mutation('todos.upsert', {
    input: z.object({
      id: z.number().nullish(),
      description: z.string(),
      title: z.string(),
      dueDate: z.string(),
      assigneeId: z.number(),
    }),
    async resolve({ input }) : Promise<TodoInput> {
      const todo = await prisma.todo.upsert({
        where: { id: input.id ?? 0 },
        create: {
          description: input.description,
          title: input.title,
          dueDate: input.dueDate,
          assigneeId: input.assigneeId,
        },
        update: {
          description: input.description,
          title: input.title,
          dueDate: input.dueDate,
          assigneeId: input.assigneeId,
        },
      });

      return {
        ...todo,
        dueDate: todo.dueDate.toISOString(),
      };
    },
  })
  .mutation('todos.delete', {
    input: z.number(),
    async resolve({ input }) : Promise<number> {
      const todo = await prisma.todo.delete({
        where: { id: input },
      });

      return todo.id;
    },
  });
// export type definition of API

export type AppRouter = typeof appRouter;
// export API handler

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
