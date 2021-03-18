import React, { Component } from 'react'
import { format } from 'date-fns'
import { AiFillEdit } from 'react-icons/ai'
import DeleteTaskModal from './DeleteTaskModal'
import { connect } from 'react-redux'
import { setUpdateMode } from '../redux'

class Task extends Component {
    render() {
        const { task , setUpdateMode } = this.props
        const { _id, text, date } = task
        return (
            <div className="flex flex-row items-center justify-between mb-1">
                <div className="flex flex-col">
                    <h1 className="flex-auto text-xl text-gray-700 font-semibold">
                        {text}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {format(new Date(date), 'yyyy-MM-dd')}
                    </p>
                </div>
                <div className="flex flex-row space-x-2">
                    <AiFillEdit
                        className="text-gray-800 h-6 w-6 cursor-pointer" 
                        onClick={() => setUpdateMode(task, true)} 
                    />
                    <DeleteTaskModal 
                        taskId={_id}
                    />
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUpdateMode: (task, flag) => dispatch(setUpdateMode(task, flag))
    }
}

export default connect(null, mapDispatchToProps)(Task)
