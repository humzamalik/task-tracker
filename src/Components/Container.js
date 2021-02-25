import React, { Component } from 'react'
import Task from './Task'

class Container extends Component {
    render() {
        const { deleteTask, setUpdateMode, tasks } = this.props
        return (
            <div className="container mx-auto mt-2">
                {tasks.map(task => {
                    return <Task key={task.id} task={task} deleteTask={deleteTask} setUpdateMode={setUpdateMode}/>
                })}
            </div>
        )
    }
}

export default Container
