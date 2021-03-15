import React, { Component } from 'react'
import { format } from 'date-fns'

class TaskEditor extends Component {

    constructor(props) {
        super(props)
        this.state = {
             text: "",
             date: format(new Date(), 'yyyy-MM-dd')
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const { isUpdateMode, taskToUpdate } = nextProps
        if(isUpdateMode){
            this.setState({
                text: taskToUpdate.text,
                date: format(new Date(taskToUpdate.date), "yyyy-MM-dd")
            })
        }
    }

    setText = (text) => {
        this.setState({text})
    }

    setDate = (date) => {
        this.setState({date})
    }

    onSubmit = (e) => {
        e.preventDefault()
        const {text, date} = this.state
        const {isUpdateMode, onAddTask, updateTask, setUpdateMode, taskToUpdate} = this.props
        if(!text || !date){
            alert("Please write a note and choose date")
            return
        }
        if(isUpdateMode){
            updateTask({
                text,
                date,
                _id: taskToUpdate._id
            })
            setUpdateMode(null, false)
        } else {
            onAddTask({text, date})
        }
        this.setText('')
        this.setDate(format(new Date(), 'yyyy-MM-dd'))
    }

    render() {
        const {isUpdateMode} = this.props
        const {text, date} = this.state
        return (
            <div className="p-4">
                <form
                    className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg"
                    onSubmit={this.onSubmit}
                >
                    <input
                        type="text"
                        value={text}
                        placeholder="Enter note"
                        onChange={(e)=> this.setText(e.target.value)}
                        className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                    />
                    <input 
                        type="date"
                        value={date}
                        onChange={(e)=> this.setDate(e.target.value)}
                        className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg font-semibold text-lg mb-3"
                    >
                        {isUpdateMode ? "Update" :  "Add"}
                    </button>
                </form>
            </div>
        )
    }
}

export default TaskEditor
