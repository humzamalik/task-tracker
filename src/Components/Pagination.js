import React, { Component } from 'react'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"
import { Link } from 'react-router-dom'

class Pagination extends Component {

    render() {
        const { currentPage , totalPages, pageNavigationHandler } = this.props
        let pages = []
        if (totalPages <= 6) {
            for (let i = 1; i <= totalPages; i++) {
              pages.push(i)
            }
        } else {
            pages.push(1)
            if (currentPage > 3) {
                pages.push("...")
            }
            if (currentPage === totalPages) {
                pages.push(currentPage - 2)
            }
            if (currentPage > 2) {
                pages.push(currentPage - 1);
            }
            if (currentPage !== 1 && currentPage !== totalPages) {
                pages.push(currentPage)
            }
            if (currentPage < totalPages - 1) {
                pages.push(currentPage + 1)
            }
            if (currentPage === 1) {
                pages.push(currentPage + 2)
            }
            if (currentPage < totalPages - 2) {
                pages.push("...")
            }
            pages.push(totalPages)
        }
        return (totalPages>0) ? (
            <ul className='relative z-0 flex shadow-sm -space-x-px justify-center items-center rounded-md border-gray-100 border-t'>
                <Link
                    to={`?page=${currentPage-1}`}
                    onClick={() => pageNavigationHandler(currentPage-1)}
                    className={`${currentPage===1 ? "pointer-events-none cursor-not-allowed" : "cursor-pointer"} relative inline-flex items-center self-stretch px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100`}
                >
                    <BsChevronLeft
                        className='h-5 w-5'
                    />
                </Link>
                {pages.map((i) => {
                    return (
                        <Link 
                            key={i}
                            to={`?page=${i}`}           
                            onClick={() => pageNavigationHandler(i)}
                            className={`${(currentPage === i) ? "bg-gray-700 text-white hover:bg-gray-800":"bg-white text-gray-700 hover:border-gray-100"} ${i==="..." ? "pointer-events-none":""} relative inline-flex cursor-pointer items-center px-4 py-2 border text-sm font-medium border-gray-300`}
                        >
                            {i}
                        </Link>
                    )
                })}
                <Link
                    to={`?page=${currentPage+1}`}
                    onClick={() => pageNavigationHandler(currentPage+1)}
                    className={`${currentPage===totalPages ? "cursor-not-allowed pointer-events-none" : "cursor-pointer"} relative inline-flex self-stretch items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100`}
                >
                    <BsChevronRight
                        className='h-5 w-5'
                    />
                </Link>
            </ul>
        ) : null
    }
}

export default Pagination
