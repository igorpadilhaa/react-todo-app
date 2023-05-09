import { useState } from 'react'

import TaskForm from './task/TaskForm'
import TaskList from './task/TaskList'

import taskService from './task/task-service'

function App() {
  const [ tasks, setTasks ] = useState(taskService.allTasks())

  const newTask = (task) => {
    setTasks([ task, ...tasks ])
  }

  const taskChange = (taskId, newStatus) => {
    taskService.updateTaskStatus(taskId, newStatus)
    setTasks(taskService.allTasks())
  }

  return (
    <>
      <TaskForm onSubmit={newTask}/>
      <TaskList tasks={tasks} updateTaskStatus={taskChange}/>
    </>
  )
}

export default App
