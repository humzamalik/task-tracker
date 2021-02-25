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

class Form extends Component {

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

    // static getDerivedStateFromProps(props, state){
    //     if(props.isUpdateMode){
    //         return {
    //             text: props.taskToUpdate.text,
    //             date: props.taskToUpdate.date
    //         }
    //     }
    //     return null
    // }

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
            <form onSubmit={this.onSubmit}>
                <input
                    type="text"
                    value={text}
                    placeholder="Write a note.."
                    onChange={(e)=> this.setText(e.target.value)}
                    className="focus:outline-none shadow appearance-none border rounded py-2 px-3 text-grey-darker"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e)=> this.setDate(e.target.value)}
                    className="focus:outline-none shadow appearance-none border rounded py-2 px-3 text-grey-darker ml-2"
                />
                <button
                    type="submit"
                    className="ml-2 rounded bg-gray-200 py-2 px-3"
                >
                    {isUpdateMode ? "Update" :  "Add"}
                </button>
            </form>
        )
    }
}

export default Form
