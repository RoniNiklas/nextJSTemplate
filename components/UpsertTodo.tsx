/* eslint-disable jsx-a11y/label-has-associated-control */
import Input from '@root/globals/ReusableComponents/Input';
import trpc from '@root/utils/trpc';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { TodoInput } from '@pages/api/trpc/[trpc]';
import ElseIf from '@root/globals/ReusableComponents/ElseIf';
import If from '@root/globals/ReusableComponents/If';
import Else from '@root/globals/ReusableComponents/Else';

const emptyInput = {
  id: null,
  description: '',
  title: '',
  dueDate: new Date('2022-09-02').toISOString(),
  assigneeId: 1,
};

type Props = {
  id: number | null,
  closeModal: () => void
};

const UpsertTodo = ({ id, closeModal } : Props) => {
  const [todo, setTodo] = useState<TodoInput>(emptyInput);

  const todoQuery = trpc.useQuery(['todos.getSingle', id ?? 0], {
    onSuccess: (data) => {
      if (data) {
        setTodo({
          ...data,
          dueDate: data.dueDate.toString(),
        });
      } else {
        setTodo(emptyInput);
      }
    },
  });

  const peopleQuery = trpc.useQuery(['peoples.getMany']);
  const assigneeOptions = peopleQuery.data || [];

  const mutation = trpc.useMutation(['todos.upsert'], {
    onSuccess: closeModal,
  });

  const saveData = () => {
    mutation.mutate({
      id: todo.id,
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      assigneeId: todo.assigneeId,
    });
  };

  return (
    <form className="m-4 p-2 bg-slate-700 border-2 w-full max-w-xl drop-shadow-xl shadow-xl rounded-2xl glowing">
      <If rif={mutation.isLoading || todoQuery.isLoading || peopleQuery.isLoading}>
        <div className="p-4 text-blue-300">Loading...</div>
        <ElseIf elIf={mutation.error !== null}>
          <div className="p-4 text-blue-300">{mutation.error?.message}</div>
        </ElseIf>
        <Else>
          <Input
            value={todo.title}
            labelText="Title"
            onChange={(e) => {
              setTodo({
                ...todo,
                title: e.currentTarget.value,
              });
            }}
          />
          <Input
            value={todo.description}
            labelText="Description"
            onChange={(e) => {
              setTodo({
                ...todo,
                description: e.currentTarget.value,
              });
            }}
          />
          <div className="flex flex-col">
            <label htmlFor="dueDate" className="mx-4 my-2 text-blue-300">
              Due Date
            </label>
            <DatePicker
              id="dueDate"
              selected={new Date(todo.dueDate)}
              className="mx-4 my-2 p-2 border-2 border-blue-400"
              onChange={(dueDate: Date) => {
                setTodo({
                  ...todo,
                  dueDate: dueDate.toISOString(),
                });
              }}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="assigneeId" className="mx-4 my-2 text-blue-300">
              Assignee
            </label>
            <select
              id="assigneeId"
              className="mx-4 my-2 p-2 w-40"
              onChange={((e) => {
                setTodo({
                  ...todo,
                  assigneeId: parseInt(e.currentTarget.value, 10),
                });
              })}
            >
              {
                  assigneeOptions.map(
                    (item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ),
                  )
                }
            </select>
          </div>
          <div className="flex justify-end px-4 py-2">
            <button
              className="my-2 py-2 w-28 bg-gray-400 text-white"
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="ml-4 my-2 py-2 w-28 bg-blue-400 text-white"
              type="button"
              onClick={saveData}
            >
              Save
            </button>
          </div>
        </Else>
      </If>
    </form>
  );
};

export default UpsertTodo;
