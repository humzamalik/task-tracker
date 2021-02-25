import express from "express"
import taskRoutes from "./tasks"
import userRoutes from "./users"

const routes = express.Router()

routes.use("/tasks", taskRoutes)
routes.use("/users", userRoutes)

export default routes