'use client'

import { FormEventHandler, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AiOutlinePlus } from 'react-icons/ai'
import { addTodo } from '../api/api'
import { v4 as uuidv4 } from 'uuid'
import Modal from './Modal'

const AddTask = () => {
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newTaskValue, setNewTaskValue] = useState<string>('')

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    await addTodo({
      id: uuidv4(),
      text: newTaskValue
    })
    setNewTaskValue('')
    setModalOpen(false)
    router.refresh()
  }

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task
        <AiOutlinePlus className="ml-2" size={18} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              type="text"
              placeholder="Type here"
              className="input w-full"
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
            />
            <button type="submit" className="btn">
              Submit
            </button>
          </div>
          <div></div>
        </form>
      </Modal>
    </div>
  )
}

export default AddTask
