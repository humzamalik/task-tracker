import React, { Component } from 'react'
import Form from './Form'

class Header extends Component {
    render() {
        const {taskToUpdate, setUpdateMode, isUpdateMode, onAddTask, updateTask} = this.props
        return (
            <header className="flex items-center justify-between flex-wrap bg-gray-800 p-5">
                <div className="flex items-center flex-shrink-0 text-white mr-5">
                    <span className="font-bold text-xl">{ this.props.title }</span>
                </div>
                <Form onAddTask={onAddTask} updateTask={updateTask} taskToUpdate={taskToUpdate} setUpdateMode={setUpdateMode} isUpdateMode={isUpdateMode}/>
            </header>
        )
    }
}

export default Header
