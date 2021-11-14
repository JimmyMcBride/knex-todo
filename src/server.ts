import Express, { Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"

import { authenticate } from "./middleware"
import authRouter from "./routes/auth"
import todosRouter from "./routes/todos"

const server = Express()

require("dotenv").config()
const PORT = process.env.PORT || 3300

server.use(helmet())
server.use(cors())
server.use(Express.json())

server.use("/api/auth", authRouter)
server.use("/api/todos", authenticate, todosRouter)

server.get("/", (_: Request, res: Response) => {
  res.json({ message: "Welcome HackerNation! 🔥" })
})

server.listen(PORT, () => {
  console.log(`\n=== Server listening on port ${PORT} ===\n`)
})
