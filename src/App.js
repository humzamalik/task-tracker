import React, { Component } from 'react'
import Container from './Components/Container'
import Header from './Components/Header'
import "./Styles/main.css"

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
        tasks: [
            {
              id: 1,
              text: "Meeting with Randy",
              date: "2021-08-09"
            },
            {
              id: 2,
              text: "Meeting with Randy",
              date: "2021-08-09"
            },
            {
              id: 3,
              text: "Meeting with Randy",
              date: "2021-08-09"
            }
          ],
        isUpdateMode: false,
        taskToUpdate: {}
    }
  }

  setUpdateMode = (task, flag) => {
    this.setState({
      isUpdateMode: flag,
      taskToUpdate: task
    })
  }
  
  addTasks = (task) => {
    const { tasks } = this.state
    const id = Math.floor(Math.random() * 10000) + 1
    this.setState({
      tasks: [...tasks, {...task, id}]
    })
  }

  updateTask = (newTask) => {
    const { tasks } = this.state
    this.setState({
      tasks: tasks.map((task)=> task.id === newTask.id ? newTask : task)
    })
  }

  deleteTask = (id) => {
    const { tasks } = this.state
    this.setState({ 
      tasks: tasks.filter((task) => task.id!==id) 
    })
  } 

  render() {
    const { tasks, isUpdateMode,  taskToUpdate} = this.state
    return (
      <>
        <Header
          title="Task Tracker"
          onAddTask={this.addTasks}
          setUpdateMode={this.setUpdateMode}
          isUpdateMode={isUpdateMode}
          taskToUpdate={taskToUpdate}
          updateTask={ this.updateTask } 
        />
        <Container
          tasks={tasks}
          deleteTask={this.deleteTask}
          setUpdateMode={this.setUpdateMode}
        />
      </>
    )
  }
}

export default App