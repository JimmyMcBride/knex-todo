// Enable tools 🔨
import Express, { Request, Response } from "express"
import todos from "../models/todos"
import cors from "cors"
import { authenticate } from "../middleware"

// Enable .env 💬
require("dotenv").config()

// Create router
const todoRouter = Express.Router()

// Enable middleware 🐎
todoRouter.use(cors())

// Set up endpoints ☠️
todoRouter.get("/", authenticate, async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const todoList = await todos.findBy({ userId: req.decodedJwt?.id })
    if (todoList) {
      res.status(200).json(todoList)
    } else {
      res.status(404).json({ message: "Could not find todos 🤷‍" })
    }
  } catch (_) {
    res.status(500).json({ message: "Failed to get todos ☠️" })
  }
})

todoRouter.get("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const todo = await todos.findBy({
      id: Number(id),
      // @ts-ignore
      userId: req.decodedJwt?.id,
    })
    if (todo.length > 0) {
      res.json(todo[0])
    } else {
      res.status(404).json({
        message:
          "Either this todo does not, or no longer, exists, or it belongs to another user. 🤷‍",
      })
    }
  } catch (_) {
    res.status(500).json({
      message: "Failed to get schemes ☠️",
    })
  }
})

todoRouter.post("/", authenticate, async (req: Request, res: Response) => {
  // @ts-ignore
  const id = req.decodedJwt?.id
  let newTodo = req.body
  newTodo = {
    ...newTodo,
    userId: id,
  }
  try {
    const updatedTodo = await todos.add(newTodo)
    if (updatedTodo) {
      res.json(updatedTodo)
    } else {
      res.status(404).json({
        message: "Could not find todo with given id 🤷‍",
      })
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo ☠️" })
  }
})

todoRouter.put("/:id", authenticate, async (req: Request, res: Response) => {
  const { id } = req.params
  const changes = req.body
  try {
    const todo = await todos.findById(Number(id))
    if (todo) {
      const updatedTodo = await todos.update(changes, Number(id))
      res.json(updatedTodo)
    } else {
      res.status(404).json({
        message: "Could not find todo with given id 🤷‍",
      })
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to update todo ☠️" })
  }
})

todoRouter.delete("/:id", authenticate, async (req: Request, res: Response) => {
  // @ts-ignore
  const user_id = req.decodedJwt?.id
  const { id } = req.params
  try {
    const todo = await todos.findById(Number(id))
    console.log(`User`)
    if (todo.userId != user_id) {
      res.status(401).json({
        message:
          "Stop right there! You're not allowed to delete other users todos!!! 🛑",
      })
    } else {
      const deleted = await todos.delete(Number(id))
      if (deleted) {
        res.json({ message: "Message has been successfully deleted 💣" })
      } else {
        res.status(404).json({
          message: "Could not find the todo with given id 🤷‍",
        })
      }
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to delete todo ☠️" })
  }
})

// Export router 🚀
export default todoRouter
