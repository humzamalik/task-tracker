import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'


class Login extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            username: "",
            password: "",
            isLoginFailed: false
        }
    }

    setLoginFailedToggle = () => {
        const { isLoginFailed } = this.state
        this.setState({isLoginFailed: !isLoginFailed})
    }

    setUsername = (username) => {
        this.setState({ username })
    }

    setPassword = (password) => {
        this.setState({ password })
    }
    
    authUser = (username, password) => {
        return axios.post(
            'http://localhost:3100/api/users/login',
            {
                username,
                password
            }
        )
    }

    onSubmit = async(e) => {
        const { setToken } = this.props
        const { username, password } = this.state
        e.preventDefault()
        if(!username || !password){
            alert("Please provide username and password")
            return
        }
        try{
            const resp = await this.authUser(username, password)
            const {data} = resp
            const {status, token} = data
            if(status){
                Cookies.set("token", token, {expires: 30})
            }
            setToken(token)
        } catch (error) {
            console.log({error})
            this.setLoginFailedToggle()
            setTimeout(this.setLoginFailedToggle, 5000)
            return
        }
    }

    render() {
        const { isLoginFailed } = this.state
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
                            <h3 className={`text-red-900 pl-1 mb-1 ${isLoginFailed ? "": 'hidden'}`}>Login Failed. Please Try again</h3>
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
                                type="submit"
                                className="w-full bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-lg font-semibold text-lg mb-3"
                            >
                                Login
                            </button>
                            <hr />
                            <Link
                                to={"/signup"}
                                className="w-full bg-green-400 hover:bg-green-500 mt-3 mb-4 text-white p-3 rounded-lg font-semibold text-lg"
                            >
                                Create New Account
                            </Link>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}

export default Login
