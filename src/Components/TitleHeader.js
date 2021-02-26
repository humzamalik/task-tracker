import React, { Component } from 'react'

class TitleHeader extends Component {
    render() {
        const { title } = this.props
        return (
            <header className="flex items-center justify-between flex-wrap bg-gray-800 p-5">
                <div className="flex items-center flex-shrink-0 text-white mr-5">
                    <span className="font-bold text-xl">{ title }</span>
                </div>
            </header>
        )
    }
}

export default TitleHeader
