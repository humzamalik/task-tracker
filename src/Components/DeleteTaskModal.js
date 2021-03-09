import React, { Component } from 'react'
import { AiFillDelete } from "react-icons/ai";


class DeleteTaskModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showModal: false
        }
    }

    setShowModal = (flag) => {
        this.setState({
            showModal: flag
        })
    }
    
    onDelete = (e) => {
        const {taskId, deleteTask} = this.props
        this.setShowModal(false)
        deleteTask(taskId)
    }

    render() {
        return (
            <>
                <AiFillDelete
                    className="text-gray-800 h-6 w-6 cursor-pointer"
                    onClick={() => this.setShowModal(true)}
                >
                </AiFillDelete>
                {this.state.showModal ? (
                    <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        // onClick={() => this.setShowModal(false)}
                    >
                        <div 
                            className="relative w-auto my-6 mx-auto max-w-sm"
                        >
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
                            >
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t"
                                >
                                    <h3
                                        className="text-3xl font-semibold text-gray-900"
                                    >
                                        Delete Task
                                    </h3>
                                </div>
                                <div
                                    className="relative p-6 flex-auto"
                                >
                                    <p
                                        className="my-4 text-gray-600 text-lg leading-relaxed"
                                    >
                                        Are you sure you want to delete this task? 
                                    </p>
                                </div>
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b"
                                >
                                    <button
                                        className="text-gray-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={() => this.setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="bg-red-500 hover:bg-red-600 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                                        type="button"
                                        style={{ transition: "all .15s ease" }}
                                        onClick={this.onDelete}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) : null}
                </>
        )
    }
}

export default DeleteTaskModal
