import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {

    render() {
        return (
            <>
                <div
                    className="p-10 flex flex-col-reverse md:flex-row items-center justify-center"
                >
                    <div
                        className="container mx-auto flex flex-col items-center"
                    >
                        <form
                            className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg"
                        >
                            <input
                                type="text"
                                placeholder="Username"
                                className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                            />
                            <input
                                type="text"
                                placeholder="Pasword"
                                className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                            />
                            <button
                                className="w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg font-semibold text-lg mb-3"
                            >
                                Login
                            </button>
                            <hr />
                            <Link
                                to={"/signup"}
                                className="w-full bg-green-400 hover:bg-green-500 mt-3 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
                            >
                                Create New Accoun
                            </Link>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Login
