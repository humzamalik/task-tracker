import React, { Component } from 'react'
import { BiLogOut } from 'react-icons/bi'
import Cookies from 'js-cookie'

class Header extends Component {

    logoutHandler = (e) => {
        const { setToken } = this.props
        try {
            Cookies.remove('token')
            setToken(false)
        } catch (error) {
            console.log(error)
        } 
    }

    render() {
        const logoutStyle = {
            color: "#FFF"
        }
        const { title, logoutVisibilty } = this.props
        return (
            <header
                className="flex items-center justify-between flex-wrap bg-gray-800 p-5"
            >
                <div
                    className="flex items-center flex-shrink-0 text-white mr-5"
                >
                    <span
                        className="font-bold text-xl"
                    >
                        { title }
                    </span>
                </div>
                <BiLogOut 
                    onClick={this.logoutHandler}
                    style={logoutStyle}
                    className={`h-6 w-6 cursor-pointer ${logoutVisibilty? "" : "hidden"}`}
                />
            </header>
        )
    }
}

export default Header
