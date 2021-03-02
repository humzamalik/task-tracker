import Form from './Form'
import React, { Component } from 'react'
import { BiLogOut } from "react-icons/bi"

class Header extends Component {
    render() {
        const {title} = this.props
        return (
            <header className="flex flex-grow-0 items-center justify-between flex-wrap bg-gray-800 p-5">
                <div className="flex items-center flex-shrink-0 text-white mr-5">
                    <span className="font-bold text-xl">{ title }</span>
                </div>
                <BiLogOut></BiLogOut>
                <Form {...this.props}/>
            </header>
        )
    }
}

export default Header
