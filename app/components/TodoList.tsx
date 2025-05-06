import { ITask } from '@/types/tasks'
import Task from './Task'

interface TodoListProps {
  tasks: ITask[]
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TodoList
