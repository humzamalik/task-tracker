import React, { Component } from 'react'
import Task from './Task'

class Container extends Component {
    render() {
        const { deleteTask, setUpdateMode, tasks } = this.props
        return (
            <div className="flex flex-1 flex-col m-4">
                {tasks.map(task => {
                    return <Task key={task.id} task={task} deleteTask={deleteTask} setUpdateMode={setUpdateMode}/>
                })}
            </div>
        )
    }
}

export default Container
