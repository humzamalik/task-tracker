import React, { Component } from 'react'

const formatDate = (date) => {
    let d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    return [year, month, day].join('-');
}

class TaskEditor extends Component {

    constructor(props) {
        super(props)
        this.state = {
             text: "",
             date: formatDate(Date())
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.isUpdateMode){
            this.setState({
                text: nextProps.taskToUpdate.text,
                date: nextProps.taskToUpdate.date
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
                id: taskToUpdate.id
            })
            setUpdateMode(null, false)
        } else {
            onAddTask({text, date})
        }
        this.setText('')
        this.setDate(formatDate(Date()))
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
