import React, { Component } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import DeleteModal from './DeleteModal'

class Task extends Component {


    render() {
        const task = this.props.task
        return (
            <div className='flex items-center justify-between'>
                <div className="flex items-left flex-shrink-0 flex-col">
                    <h1 className="flex-auto text-xl text-gray-700 font-semibold">{task.text}</h1>
                    <p className="text-sm text-gray-500">{task.date}</p>
                </div>
                <div className="flex flex-row">
                    <AiFillEdit className="ml-2 h-6 w-6 cursor-pointer" onClick={() => this.props.setUpdateMode(task, true)} />
                    <DeleteModal id={task.id} deleteTask={this.props.deleteTask}/>
                </div>
            </div>
        )
    }
}

export default Task
