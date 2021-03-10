import React, { Component } from 'react'
import Task from './Task'

class Container extends Component {
    render() {
        const { deleteTask, setUpdateMode, tasks, sortOrder, setSortOrder } = this.props
        console.log(tasks.length)
        return (tasks.length > 0) ? (
            <div className="flex flex-1 flex-col m-4">
                <div className='flex flex-row-reverse items-center text-gray-700'>
                    <select
                        value={sortOrder}
                        onChange={setSortOrder}
                        className='bg-gray-700 text-white appearance-none border-none inline-block py-2 px-3 rounded leading-tight'
                    >
                        <option value='-1'>Latest</option>
                        <option value='1'>Oldest</option>
                    </select>
                    <span className='mr-2'>
                        Sort By
                    </span>
                </div>
                <div className='flex flex-col'>
                    {tasks.map(task => {
                        return <Task key={task._id} task={task} deleteTask={deleteTask} setUpdateMode={setUpdateMode}/>
                    })}
                </div>
            </div>
        ) : (
            <div className='flex flex-1 m-4 justify-center content-center'>
                <span className='text-3xl text-center text-red-600'>
                    No Tasks
                </span>
            </div>
        )
    }
}

export default Container
