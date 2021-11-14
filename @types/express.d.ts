import * as express from "express"
import { JwtPayload } from "jsonwebtoken"
import { User } from "../src/types"

declare global {
  namespace Express {
    interface Request {
      decodedJwt?: User
    }
  }
}
