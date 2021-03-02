import React, { Component } from 'react'
import Container from './Container'
import TaskEditor from './TaskEditor'
import Cookies from 'js-cookie'
import axios from 'axios'

class TaskTracker extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      tasks: [],
      taskToUpdate: {},
      isUpdateMode: false,
      token: Cookies.get("token")
    }
  }

  setTasks = (tasks) => {
    this.setState({tasks})
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
      console.log({error})
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
      console.log({error})
    }
  }

  deleteTask = async(_id) => {
    const { tasks, token } = this.state
    try {
      await axios.delete(
        `http://localhost:3100/api/tasks/${_id}`,
        {
          headers: {
            Authorization: token
          }
        }
      )
      this.setState({ 
        tasks: tasks.filter((task) => task._id!==_id) 
      })
    } catch (error) {
      console.log({error})
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
    const resp = await this.getTasks()
    const {tasks} = resp.data
    this.setTasks(tasks)
  }

  render() {
    const { tasks, isUpdateMode,  taskToUpdate} = this.state
    return (
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
    )
  }
}

export default TaskTracker