import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             isError: false,
            message: "",
            username: "",
            password: "",
            messageVisibility: false
        }
    }

    setSignupVisibilityToggle = () => {
        this.setState(
            (prevState) => ({messageVisibility: !prevState.messageVisibility})
        )
    }

    setUsername = (username) => {
        this.setState({ username })
    }

    setPassword = (password) => {
        this.setState({ password })
    }

    createUser = (username, password) => {
        return axios.post(
            'http://localhost:3100/api/users/signup',
            {
                username,
                password
            }
        )
    }

    onSubmit = async(e) => {
        const { username, password } = this.state
        e.preventDefault()
        if(!username || !password){
            alert("Please provide username and password")
            return
        }
        try{
            const resp = await this.createUser(username, password)
            const { data } = resp
            const { status, message } = data
            if(status){
                this.setState({
                    message,
                     isError: false,
                    messageVisibility: true,
                })
            }
        } catch (error) {
            let message =  "Signup Failed" 
            if (error.response){
                message = error.response.data.message
            }
            this.setState({
                message,
                 isError: true,
                messageVisibility: true,
            })
            setTimeout(this.setSignupVisibilityToggle, 5000);
        }
    }

    render() {
        const { message,  isError, messageVisibility } = this.state
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
                            onSubmit={this.onSubmit}
                        >
                            <h3
                                className={`${ isError ? 'text-red-900' : 'text-green-900'} pl-1 mb-1 ${messageVisibility ? "": "hidden"}`}
                            >
                                {message}
                            </h3>
                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e)=> this.setUsername(e.target.value)}
                                className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e)=> this.setPassword(e.target.value)}
                                className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
                            />
                            <button
                                className="w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg font-semibold text-lg mb-3"
                            >
                                Sign Up
                            </button>
                            <hr />
                            <Link 
                                to="/login"
                                className="w-full bg-green-400 hover:bg-green-500 mt-3 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
                            >
                                Have Account?
                            </Link>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Signup
