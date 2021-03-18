import mongoose from "mongoose"

const taskSchema = mongoose.Schema({
    text: String,
    date: Date,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isImportant: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model("Task", taskSchema)