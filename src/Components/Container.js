import React, { Component } from 'react'
import Task from './Task'

class Container extends Component {
    render() {
        const { deleteTask, setUpdateMode, tasks, sortOrder, setSortOrder, limit, setLimit, allowedLimits, infoMessage } = this.props
        return (tasks.length > 0) ? (
            <div className="flex flex-1 flex-col m-4">
                <div className='flex flex-row-reverse items-center text-gray-700'>
                    <div className= 'flex items-center'>
                        <span className='mr-2'>
                            Sort By
                        </span>
                        <select
                            value={sortOrder}
                            onChange={setSortOrder}
                            className='bg-gray-700 text-white appearance-none border-none inline-block py-2 px-3 rounded leading-tight'
                        >
                            <option value='-1'>Latest</option>
                            <option value='1'>Oldest</option>
                        </select>
                    </div>
                    <div className='mr-3 flex items-center'>
                        <span className='mr-2'>
                            Per Page
                        </span>
                        <select
                            value={limit}
                            onChange={setLimit}
                            className='bg-gray-700 text-white appearance-none border-none inline-block py-2 px-3 rounded leading-tight'
                        >
                            {allowedLimits.map((limit) => <option value={limit}>{limit}</option>)}
                        </select>
                    </div>
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
                    {infoMessage}
                </span>
            </div>
        )
    }
}

export default Container
