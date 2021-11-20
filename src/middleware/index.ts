import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import users from "../models/users"

// Validation middleware 🆔
export function validate(req: Request, res: Response, next: NextFunction) {
  const { username, password } = req.body
  if (username && password) {
    users
      .findBy({ username })
      .then((user) => {
        if (user && bcrypt.compareSync(password, String(user.password))) {
          next()
        } else {
          res.status(401).json({ message: "You shall not pass 🛑" })
        }
      })
      .catch((err) => {
        res.status(500).json({ message: "unexpected error 🤷‍" })
      })
  } else {
    res.status(400).json({ message: "no credentials provided 🤥" })
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, String(process.env.SECRET), (err, decodedToken) => {
      if (err) {
        res
          .status(401)
          .json({
            message:
              "You must be authenticated to make this request. 🛑 Are you passing a valid token in your headers?",
          })
      } else {
        // @ts-ignore
        req.decodedJwt = decodedToken
        next()
      }
    })
  } else {
    res.status(401).json({ message: "no 💩 for you" })
  }
}
