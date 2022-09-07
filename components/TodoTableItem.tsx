import { TodoWithAssignee } from '@pages/api/trpc/[trpc]';

type Props = {
  todo: TodoWithAssignee,
  onDelete: () => void
  onEdit: () => void
};

export default ({ todo, onDelete, onEdit }: Props) => (
  <section className="p-4 bg-slate-700/75 border-2 h-full w-full max-w-md drop-shadow-xl shadow-xl rounded-2xl glowing">
    <div className="grid grid-flow-col-dense gap-4">
      <div>
        <div className="pb-4">
          <h2 className="text-blue-300">
            {todo.title}
          </h2>
          <span className="text-sm text-fuchsia-300">
            {new Date(todo.dueDate).toLocaleDateString('FI')}
          </span>
        </div>

        <div>
          <p className="text-white">
            {todo.description}
          </p>
          <span className="text-white">
            Assignee:
            {' '}
            {todo.assignee.name}
          </span>
        </div>
      </div>
      <div className="ml-auto">
        <button
          className="text-white"
          type="button"
          onClick={onEdit}
        >
          Edit
        </button>
        <button type="button" className="text-white pl-2" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  </section>
);
