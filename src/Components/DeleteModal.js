import React, { Component } from 'react'
import { AiFillDelete } from "react-icons/ai";


class DeleteModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showModal: false
        }
        this.setShowModal = this.setShowModal.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    setShowModal(flag){
        this.setState({
            showModal: flag
        })
    }
    
    onDelete(e){
        const {id, deleteTask} = this.props
        this.setShowModal(false)
        deleteTask(id)
    }

    render() {
        return (
            <>
                <AiFillDelete
                    className="ml-2 h-6 w-6 cursor-pointer"
                    onClick={() => this.setShowModal(true)}
                >
                    Open small modal
                </AiFillDelete>
                {this.state.showModal ? (
                    <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        // onClick={() => this.setShowModal(false)}
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                            <h3 className="text-3xl font-semibold">
                            Delete Record
                            </h3>
                            </div>
                            {/*body*/}
                            <div className="relative p-6 flex-auto">
                            <p className="my-4 text-gray-600 text-lg leading-relaxed">
                            Are you sure you want to delete this record? 
                            </p>
                            </div>
                            {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => this.setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-gray-800 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
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

export default DeleteModal
