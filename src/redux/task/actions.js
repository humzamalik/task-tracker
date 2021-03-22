import axios from "axios"
import Cookies from "js-cookie"
import {
    GET_TASKS_FAIL ,
    GET_TASKS_SUCCESS ,
    GET_TASKS,
    SET_SORT_ORDER,
    SET_PAGE_LIMIT,
    SET_UPDATE_MODE,
    SET_SEARCH_PARAMS
} from "./types"

const tasksRequest = () => {
    return {
        type: GET_TASKS
    }
}

const requestSuccess = (data) => {
    return {
        type: GET_TASKS_SUCCESS ,
        payload: data
    }
}

const setSearchParams = (limit, sortOrder, currentPage) => {
    return {
        type: SET_SEARCH_PARAMS,
        payload: { limit, sortOrder, currentPage }
    }
}

const requestFailure = () => {
    return {
        type: GET_TASKS_FAIL 
    }
}

const setSortOrder = (order) => {
    return {
        type: SET_SORT_ORDER,
        payload: order
    }
}

const setPageLimit = (limit) => {
    return {
        type: SET_PAGE_LIMIT,
        payload: limit
    }
}

const setUpdateMode = (task, updateMode) => {
    return {
        type: SET_UPDATE_MODE,
        payload: { task, updateMode }
    }
}

const getTasks = (page) => {
    return async(dispatch, getState) => {
        const token = Cookies.get("token")
        const { sortOrder, limit } = getState().task
        const params = {
            page,
            limit,
            sortOrder
        }
        dispatch(tasksRequest())
        try {
            const resp = await axios.get(
                'http://localhost:3100/api/tasks', {
                    params,
                    headers: {
                        Authorization: token
                    }
                }
            )
            const { tasks, page: currentPage, pagesCount: totalPages } = resp.data
            dispatch(requestSuccess({ tasks, currentPage, totalPages }))
        } catch (error) {
            dispatch(requestFailure())
        }
    }
}

const addTasks = (task) => {
    return async(dispatch, getState) => {
        const { text, date } = task
        const token = Cookies.get("token")
        const { currentPage } = getState().task
        try {
            await axios.post(
                'http://localhost:3100/api/tasks', {
                    text,
                    date
                }, {
                    headers: {
                        Authorization: token
                    }
                })
            dispatch(getTasks(currentPage))
        } catch (error) {
            dispatch(requestFailure())
        }
    }
}

const updateTask = (newTask) => {
    return async(dispatch, getState) => {
        const { _id, date, text } = newTask
        const token = Cookies.get("token")
        const { currentPage } = getState().task
        dispatch(tasksRequest())
        try {
            await axios.patch(
                `http://localhost:3100/api/tasks/${_id}`, {
                    text,
                    date
                }, {
                    headers: {
                        Authorization: token
                    }
                })
            dispatch(getTasks(currentPage))
        } catch (error) {
            dispatch(requestFailure())
        }
    }
}

const deleteTask = (taskId) => {
    return async(dispatch, getState) => {
        const token = Cookies.get("token")
        const { currentPage } = getState().task
        dispatch(tasksRequest())
        try {
            await axios.delete(
                `http://localhost:3100/api/tasks/${taskId}`, {
                    headers: {
                        Authorization: token
                    }
                })
            dispatch(getTasks(currentPage))
        } catch (error) {
            dispatch(requestFailure())
        }
    }
}

const setSort = (e) => {
    return (dispatch, getState) => {
        const { currentPage } = getState().task
        dispatch(setSortOrder(e.target.value))
        dispatch(getTasks(currentPage))
    }
}

const setLimit = (e) => {
    return (dispatch, getState) => {
        const { currentPage } = getState().task
        dispatch(setPageLimit(e.target.value))
        dispatch(getTasks(currentPage))
    }
}

export {
    setSort,
    setLimit,
    addTasks,
    getTasks,
    updateTask,
    deleteTask,
    tasksRequest,
    setUpdateMode,
    requestSuccess,
    requestFailure,
    setSearchParams,
}