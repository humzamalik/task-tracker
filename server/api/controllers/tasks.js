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
    const { _id } = req.userData
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    try {
        const filter = { author: _id }
        const tasks = await Task.find(filter)
            .sort({ 'updatedAt': -1 })
            .limit(limit)
            .skip((page - 1) * limit)
            .populate("User")
        const count = await Task.countDocuments(filter)
        return res.status(200).json({
            status: true,
            totalCount: count,
            pagesCount: Math.ceil(count / limit),
            page,
            pageSize: tasks.length,
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
    const { text, date } = req.body
    const { userData } = req
    if (!text || !date) {
        return res.status(400).json({
            status: false,
            message: 'text and date required'
        })
    }
    try {
        const task = await Task.create({
            text,
            date,
            author: userData._id
        })
        res.status(201).json({
            status: true,
            message: "task created",
            task
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            error
        })
    }
}

const patch = async(req, res, next) => {
    const { id } = req.params
    const { text, date } = req.body
    const { userData } = req
    if (!text || !date) {
        return res.status(400).json({
            status: false,
            message: 'text and date required'
        })
    }
    try {
        const result = await Task.updateOne({ _id: id, author: userData._id }, {
            $set: {
                text,
                date
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
    const { userData } = req
    try {
        console.log(id)
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