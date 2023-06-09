import { useEffect, useRef, useState } from 'react'

import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import Dialog from '../components/Dialog/Dialog'

import './app.css'
import { Navigate } from 'react-router-dom'
import { Button } from '../components/Button'

import AddIcon from '@mui/icons-material/Add';
import { useTaskService } from '../state/tasks'


function Home() {
  const [ tasks, setTasks ] = useState([])
  const { taskService } = useTaskService()

  const [ editingTask, setEditingTask ] = useState(null)
  const dialogRef = useRef(null)

  const fetchTasks = (updateFunction) => {
    if (taskService)
      taskService.fetchTasks().then(updateFunction)
  }

  useEffect(() => fetchTasks(setTasks), [])

  useEffect(() => {
    if (!dialogRef.current)
      return

    if (editingTask)
      dialogRef.current.openModal()
    else
      dialogRef.current.close()
  }, [editingTask])

  if (!taskService)
    return <Navigate to="/" />

  const closeForm = () => {
    if (editingTask) {
      setEditingTask(null)
    }

    dialogRef.current.close()
  }

  const submitForm = (task) => {
    if (editingTask)
      taskChange(editingTask.id, task)
    else {
      taskService.addTask(task)
        .then(createdTask => {
          setTasks([createdTask, ...tasks])
          closeForm()
        })
    }
  }

  const taskChange = (taskId, newData) => {
    taskService.updateTask(taskId, newData)
      .then(() => fetchTasks(setTasks))
      .then(closeForm)
  }

  const deleteTask = (taskId) => {
    taskService.deleteTask(taskId)
      .then(() => fetchTasks(setTasks))
  }

  return (
    <>
      <Dialog ref={dialogRef} closeAction={closeForm} className="task-dialog">
        <TaskForm
          title={editingTask ? "Edit task" : "New task"}
          submitText={editingTask ? "Save changes" : "Save"}
          data={editingTask}
          onSubmit={submitForm} />
      </Dialog>

      <main className="tasks-display">
        <Button action={() => dialogRef.current.openModal()} round paddingRight="10px"><AddIcon /> New</Button>
        <TaskList
          tasks={tasks}
          updateTaskStatus={(id, completed) => taskChange(id, { completed })}
          onRemoveTask={deleteTask}
          onEditTask={setEditingTask} />
      </main>
    </>
  )
}

export default Home
