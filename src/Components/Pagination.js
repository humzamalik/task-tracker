import React, { Component } from 'react'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

class Pagination extends Component {

    render() {
        const { currentPage , totalPages, pageNavigationHandler } = this.props
        const pages = Array(totalPages).fill()
        return (totalPages>0) ? (
            <ul className='relative z-0 flex shadow-sm -space-x-px justify-center items-center rounded-md border-gray-100 border-t'>
                <li
                    onClick={() => pageNavigationHandler(currentPage-1)}
                    className={`relative inline-flex cursor-pointer items-center self-stretch px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100`}
                >
                    <BsChevronLeft
                        className='h-5 w-5'
                    />
                </li>
                {pages.map((_, i) => {
                    return (
                        <li 
                            key={i+1}                    
                            onClick={() => pageNavigationHandler(i+1)}
                            className={`relative inline-flex cursor-pointer items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 ${(currentPage === i+1) ? "border-gray-400":""}`}
                        >
                            {i+1}
                        </li>
                    )
                })}
                <li
                    onClick={() => pageNavigationHandler(currentPage+1)}
                    className={`relative inline-flex cursor-pointer self-stretch items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100`}
                >
                    <BsChevronRight
                        className='h-5 w-5'
                    />
                </li>
            </ul>
        ) : null
    }
}

export default Pagination
