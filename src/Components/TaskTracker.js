import React, { Component } from 'react'
import Container from './Container'
import TaskEditor from './TaskEditor'
import { BiError } from "react-icons/bi"
import Pagination from './Pagination'
import { connect } from 'react-redux'
import { getTasks, setSearchParams } from '../redux'

class TaskTracker extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      allowedLimits: [2, 5, 10]
    }
  }

  componentDidMount() {
    const  { allowedLimits} = this.state
    const { currentPage, sortOrder, limit, setSearchParams, getTasks, location} = this.props
    const { search } = location
    if(search){
      const params = new URLSearchParams(search)
      const paramSort = (!isNaN(params.get("sort")) && params.get("sort")) || sortOrder
      const paramPage = (!isNaN(params.get("page")) && params.get("page")) || currentPage
      const paramLimit =  (allowedLimits.includes(parseInt(params.get("limit"))) && params.get("limit")) || limit
      setSearchParams(
        paramLimit,
        paramSort,
        paramPage
      )
      getTasks(paramPage)
    } else{
      getTasks()
    }
  }

  render() {
    const { isError, errorMessage } = this.props
    const { allowedLimits } = this.state
    return (
        <>
          <div
            className={`${isError ? "" : "hidden"} flex justify-center items-center m-1 font-medium py-1 px-2 rounded-md text-red-700 bg-red-100 border border-red-300 transition duration-150 ease-in-out`}
          >
            <BiError
              className='h-6 w-6 mr-1'
            />
            <div
              className='text-xl font-normal  max-w-full flex-initial'
            >
              {errorMessage}
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between mx-auto">
              <Container
                  allowedLimits={allowedLimits}
              />
              <TaskEditor/>
          </div>
          <Pagination/>
        </>
    )
  }
}


const mapStateToProps = (state) => {
  const {isError, currentPage, errorMessage, sortOrder, limit} = state.task
  return {
    limit,
    isError,
    sortOrder,
    currentPage,
    errorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTasks: (page = 1) => dispatch(getTasks(page)),
    setSearchParams: (limit, sortOrder, currentPage) => dispatch(setSearchParams(limit, sortOrder, currentPage))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskTracker)