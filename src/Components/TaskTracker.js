import React, { Component } from 'react'
import Container from './Container'
import TaskEditor from './TaskEditor'
import Cookies from 'js-cookie'
import axios from 'axios'
import { BiError } from "react-icons/bi"

class TaskTracker extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      tasks: [],
      isError: false,
      errorMessage: '',
      taskToUpdate: {},
      isUpdateMode: false,
      token: Cookies.get("token")
    }
  }

  setUpdateMode = (task, flag) => {
    this.setState({
      isUpdateMode: flag,
      taskToUpdate: task
    })
  }
  
  addTasks = async(task) => {
    const { text, date } = task
    const { token, tasks } = this.state
    try {
      const resp = await axios.post(
        'http://localhost:3100/api/tasks',
        {
          text,
          date
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      const {task} = resp.data
      this.setState({
        tasks: [...tasks, task]
      })
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: 'Task posting failed'
      })
      this.errorTimeout()
    }
  }

  updateTask = async(newTask) => {
    const {_id, date, text} = newTask
    const { tasks, token } = this.state
    try {
      await axios.patch(
        `http://localhost:3100/api/tasks/${_id}`,
        {
          text,
          date
        },
        {
          headers: {
            Authorization: token
          }
        }
      )
      this.setState({
        tasks: tasks.map((task)=> task._id === _id ? newTask : task)
      })
    } catch (error) {
      console.log('object')
      this.setState({
        isError: true,
        errorMessage: 'Task updation failed'
      })
      this.errorTimeout()
    }
  }

  deleteTask = async(taskId) => {
    const { tasks, token } = this.state
    try {
      await axios.delete(
        `http://localhost:3100/api/tasks/${taskId}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      this.setState({ 
        tasks: tasks.filter((task) => task._id!==taskId) 
      })
    } catch (error) {
      this.setState({
        isError: true,
        errorMessage: 'Task deletion failed'
      })
      this.errorTimeout()
    }
  }

  getTasks = () => {
    const {token} = this.state
    return axios.get(
      'http://localhost:3100/api/tasks',
      {
        headers: {
          Authorization: token
        }
      }
    )
  }

  async componentDidMount() {
    try{
      const resp = await this.getTasks()
      const {tasks} = resp.data
      this.setState({tasks})
    } catch {
      this.setState({
        isError: true,
        errorMessage: 'Network Connection Failed'
      })
    }
  }

  errorTimeout = () => {
    setTimeout( () =>
      this.setState({
        isError: false,
        errorMessage: ""
      }),
      5000
    )
  }

  render() {
    const { tasks, isUpdateMode, taskToUpdate, isError, errorMessage } = this.state
    return (
        <>
          <div
            className={`${isError ? "" : "hidden"} flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-md text-red-700 bg-red-100 border border-red-300 transition duration-150 ease-in-out`}
          >
            <BiError
              className='h-6 w-6 mr-1'
            />
            <div
              className='text-xl font-normal  max-w-full flex-initial'
            >
              {errorMessage}
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between mx-auto">
              <Container
                  tasks={tasks}
                  deleteTask={this.deleteTask}
                  setUpdateMode={this.setUpdateMode}
              />
              <TaskEditor
                  onAddTask={this.addTasks}
                  setUpdateMode={this.setUpdateMode}
                  isUpdateMode={isUpdateMode}
                  taskToUpdate={taskToUpdate}
                  updateTask={ this.updateTask }
              />
          </div>
        </>
    )
  }
}

export default TaskTracker