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

    this.addTasks = this.addTasks.bind(this)
    this.deleteTask = this.deleteTask.bind(this)
    this.updateTask = this.updateTask.bind(this)
    this.setUpdateMode = this.setUpdateMode.bind(this)
  }

  setUpdateMode(task, flag){
    this.setState({
      isUpdateMode: flag,
      taskToUpdate: task
    })
  }
  
  addTasks(task){
    const id = Math.floor(Math.random() * 10000) + 1
    this.setState({
      tasks: [...this.state.tasks, {...task, id}]
    })
  }

  updateTask(newTask){
    console.log(newTask)
    this.setState({
      tasks: this.state.tasks.map((task)=> task.id === newTask.id ? newTask : task)
    })
  }

  deleteTask(id){
    this.setState({ 
      tasks: this.state.tasks.filter((task) => task.id!==id) 
    })
  }

  render() {
    const tasks = this.state.tasks
    return (
      <>
        <Header title="Task Tracker" onAddTask={this.addTasks} setUpdateMode={this.setUpdateMode} isUpdateMode={this.state.isUpdateMode} taskToUpdate={this.state.taskToUpdate} updateTask={ this.updateTask } />
        <Container tasks={tasks} deleteTask={ this.deleteTask } setUpdateMode={this.setUpdateMode}/>
      </>
    )
  }
}

export default App