import db from "../data/dbConfig"
import { User } from "../types"

interface Filter {
  id?: number
  username?: string
  email?: string
}

export default {
  async find(): Promise<User[]> {
    return await db("users")
  },
  async findBy(filter: Filter): Promise<User> {
    return await db("users").where(filter).first()
  },
  async add(user: User) {
    const [id] = await db("users").insert(user)

    return this.findBy(id)
  },
}
