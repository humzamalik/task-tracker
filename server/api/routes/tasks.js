import express from "express"
import checkAuth from '../middlewares/check_auth'
import { getOne, deleteOne, getAll, post, patch } from "../controllers/tasks"

const router = express.Router()

router.route("/")
    .get(checkAuth, getAll)
    .post(checkAuth, post)

router.route('/:id')
    .get(checkAuth, getOne)
    .patch(checkAuth, patch)
    .delete(checkAuth, deleteOne)

export default router