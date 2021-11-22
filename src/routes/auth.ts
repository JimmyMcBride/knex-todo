// Enable tools 🔨
import Express, { Request, Response, NextFunction } from "express"
import users from "../models/users"
import cors from "cors"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { authenticate, validate } from "../middleware"
import { User } from "../types"

// Enable .env 💬
require("dotenv").config()

// Create router
const authRouter = Express.Router()

// Enable middleware 🐎
authRouter.use(cors())

// Set up endpoints ☠️
authRouter.post("/register", (req, res) => {
  let user = req.body
  console.log(`User: ${user}`)
  const hash = bcrypt.hashSync(user.password, 10)
  user.password = hash

  users
    .add(user)
    .then((user: User) => {
      console.log(`User: ${user}`)
      const token = genToken(user)
      res.status(201).json({
        message: `Welcome ${user.username}! 🔥`,
        token,
      })
    })
    .catch((error: any) => {
      res.status(500).json(error)
    })
})

authRouter.post("/login", validate, (req, res) => {
  let { username, password } = req.body

  users
    .findBy({ username })
    .then((user: User) => {
      if (user && bcrypt.compareSync(String(password), String(user.password))) {
        const token = genToken(user)
        res.status(200).json({
          message: `Welcome ${user.username}! 🔥`,
          token,
        })
      } else {
        res.status(401).json({
          message: "Invalid Credentials 💩",
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error ☠️",
        error,
      })
    })
})

authRouter.get("/me", authenticate, (req, res) => {
  // @ts-ignore
  const id = req.decodedJwt?.id

  users
    .findBy({ id })
    .then((user: User) => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(401).json({
          message: "Invalid Credentials 💩",
        })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server error ☠️",
        error,
      })
    })
})

// Generate a JSON web token 🌹
function genToken(user: User) {
  const payload = {
    subject: "user",
    id: user.id,
    username: user.username,
    email: user.email,
  }

  const secret = process.env.SECRET

  const options = {
    expiresIn: "1y",
  }

  return jwt.sign(payload, String(secret), options)
}

// Export router 🚀
export default authRouter
