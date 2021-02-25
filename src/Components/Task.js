import React, { Component } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import DeleteTaskModal from './DeleteTaskModal'

class Task extends Component {
    render() {
        const { task , deleteTask, setUpdateMode } = this.props
        const { id, text, date } = task
        return (
            <div className='flex items-center justify-between mb-1'>
                <div className="flex items-left flex-shrink-0 flex-col">
                    <h1 className="flex-auto text-xl text-gray-700 font-semibold">{text}</h1>
                    <p className="text-sm text-gray-500">{date}</p>
                </div>
                <div className="flex flex-row">
                    <AiFillEdit
                        className="ml-2 h-6 w-6 cursor-pointer" 
                        onClick={() => setUpdateMode(task, true)} 
                    />
                    <DeleteTaskModal taskId={id} deleteTask={deleteTask}/>
                </div>
            </div>
        )
    }
}

export default Task
