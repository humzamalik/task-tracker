import {
    GET_TASKS_FAIL,
    GET_TASKS_SUCCESS ,
    GET_TASKS ,
    SET_SORT_ORDER,
    SET_PAGE_LIMIT,
    SET_UPDATE_MODE,
    SET_SEARCH_PARAMS
} from "./types"

const initialState = {
    loading: false,
    limit: 5,
    tasks: [],
    sortOrder: -1,
    totalPages: 0,
    currentPage: 1,
    taskToUpdate: {},
    isUpdateMode: false,
    infoMessage: "",
    isError: false,
    errorMessage: "Something went wrong. Please try again"
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TASKS :
            return {
                ...state,
                loading: true,
                infoMessage: "Loading..."
            }
        case GET_TASKS_SUCCESS :
            const { tasks, totalPages, currentPage } = action.payload
            return {
                ...state,
                tasks,
                totalPages,
                currentPage,
                loading: false,
                isError: false,
                infoMessage: tasks.length > 0 ? "" : "No Tasks",
            }
        case GET_TASKS_FAIL:
            return {
                ...state,
                loading: false,
                tasks: [],
                isError: true
            }
        case SET_SORT_ORDER:
            return {
                ...state,
                sortOrder: action.payload
            }
        case SET_PAGE_LIMIT:
            return {
                ...state,
                limit: action.payload
            }
        case SET_UPDATE_MODE:
            const { task, updateMode } = action.payload
            return {
                ...state,
                taskToUpdate: task,
                isUpdateMode: updateMode
            }
        case SET_SEARCH_PARAMS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
}

export default reducer