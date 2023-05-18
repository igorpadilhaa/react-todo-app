import { useEffect, useRef, useState } from 'react'

import { Navbar } from './page/Navbar'

import TaskForm from './task/TaskForm'
import TaskList from './task/TaskList'

import taskService from './task/service'

import './app.css'

function fetchTasks(updateFunction) {
  taskService.allTasks().then(updateFunction)
}

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => fetchTasks(setTasks), [])

  const newTask = (task) => {
    taskService.createTask(task)
      .then(createdTask => {
        setTasks([ createdTask, ...tasks ])
        dialogRef.current.close()
      })
  }

  const taskChange = (taskId, newStatus) => {
    taskService.updateTaskStatus(taskId, newStatus)
      .then(() => fetchTasks(setTasks))
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId)
      .then(() => fetchTasks(setTasks))
  }

  const dialogRef = useRef()

  const openForm = () => {
    dialogRef.current.showModal()
  }

  const closeForm = () => {
    dialogRef.current.close()
  }

  return (
    <section className='page-layout'>
      <Navbar />

      <dialog ref={dialogRef}>
        <button onClick={closeForm}>Close</button>
        <TaskForm onSubmit={newTask} />
      </dialog>

      <main className="tasks-display">
        <button onClick={openForm}>Add task</button>
        <TaskList tasks={tasks} updateTaskStatus={taskChange} onRemoveTask={deleteTask} />
      </main>
    </section>
  )
}

export default App
