import React, { Component } from 'react'
import { BiLogOut } from 'react-icons/bi'
import Cookies from 'js-cookie'

class Header extends Component {

    logoutHandler = (e) => {
        const { setToken } = this.props
        Cookies.remove('token')
        setToken(false)
    }

    render() {  
        const { title, token } = this.props
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
                    className={`h-6 w-6 cursor-pointer text-white ${token? "" : "hidden"}`}
                />
            </header>
        )
    }
}

export default Header
