import Task from "../models/task"

const getOne = async(req, res, next) => {
    const { id } = req.params
    const { userData } = req
    try {
        const task = await Task.findOne({ _id: id, author: userData._id })
        if (task) {
            res.status(200).json({
                status: true,
                task
            })
        } else {
            res.status(404).json({
                status: false,
                message: "no task found against passed id "
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error
        })
    }
}

const getAll = async(req, res, next) => {
    const { userData } = req
    try {
        const tasks = await Task.find({ author: userData._id }).populate("User")
        return res.status(200).json({
            status: true,
            count: tasks.length,
            tasks
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error
        })
    }
}

const post = async(req, res, next) => {
    const { text } = req.body
    const { userData } = req
    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'text required'
        })
    }
    try {
        await Task.create({
            author: userData._id,
            text
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error
        })
    }
    res.status(201).json({
        status: true,
        message: "task created"
    })
}

const patch = async(req, res, next) => {
    const { id } = req.params
    const { text } = req.body
    const { userData } = req
    if (!text) {
        return res.status(400).json({
            status: false,
            message: 'text required'
        })
    }
    try {
        const result = await Task.updateOne({ _id: id, author: userData._id }, {
            $set: {
                text
            }
        })
        if (result.n > 0) {
            res.status(201).json({
                status: true,
                message: "Updated"
            })
        } else {
            res.status(203).json({
                status: false,
                message: "Not updated"
            })
        }
    } catch (error) {
        return res.status(500).json({
            status: false,
            error
        })
    }
}

const deleteOne = async(req, res, next) => {
    const { id } = req.params
    const { userData } = requestAnimationFrame
    try {
        const task = await Task.findOneAndDelete({ _id: id, author: userData._id })
        res.status(200).json({
            status: true,
            message: 'task deleted'
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error
        })
    }
}

export {
    post,
    patch,
    getOne,
    getAll,
    deleteOne
}