'use client'

import { FormEvent, useState } from 'react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { ITask } from '@/types/tasks'
import Modal from './Modal'
import { deleteTodo, editTodo, completeTodo } from '../api/api'

interface TaskProps {
  task: ITask
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter()
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [openModalDeleted, setOpenModalDeleted] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(task.text)
  const [taskToComplete, setTaskToComplete] = useState(task.isComplete)

  const handleSubmitEditTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await editTodo({
      id: task.id,
      text: taskToEdit,
      isComplete: taskToComplete,
    })
    setOpenModalEdit(false)
    router.refresh()
  }

  const handleToggleComplete = async () => {
    const newCompleteStatus = !taskToComplete
    await completeTodo({
      id: task.id,
      text: task.text,
      isComplete: newCompleteStatus,
    })
    setTaskToComplete(newCompleteStatus)
    router.refresh()
  }

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id)
    setOpenModalDeleted(false)
    router.refresh()
  }

  return (
    <tr>
      <td className="w-full">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={taskToComplete}
            onChange={handleToggleComplete}
            className="checkbox checkbox-sm checkbox-success"
          />
          <div className={taskToComplete ? "line-through" : ''}>{task.text}</div>
        </div>
      </td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-700"
          size={18}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                type="text"
                placeholder="Type here"
                className="input w-full"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
              />
              <button type="submit" className="btn">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-700"
          size={18}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="font-bold text-lg">Delete task</h3>
          <div className="modal-action">
            <div className="w-full">
              Are you sure, you want to delete this task?
            </div>
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  )
}

export default Task
