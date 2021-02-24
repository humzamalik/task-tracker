import React, { Component } from 'react'
import Task from './Task'

class Container extends Component {
    render() {
        return (
            <div className="container mx-auto mt-2">
            {this.props.tasks.map(task => {
                return <Task key={task.id} task={task} deleteTask={this.props.deleteTask} setUpdateMode={this.props.setUpdateMode}/>
            })}
        </div>
        )
    }
}

export default Container
