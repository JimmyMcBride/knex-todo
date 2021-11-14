import db from "../data/dbConfig"
import { Todo } from "../types"
import moment from "moment"

interface Filter {
  id?: number
  description?: string
  completed?: boolean
  userId?: number
  date?: string
  updatedAt?: string
}

export default {
  async find(): Promise<Todo[]> {
    return await db("todos")
  },
  async findBy(filter: Filter): Promise<Todo[]> {
    return await db("todos").where(filter)
  },
  async findById(id: number): Promise<Todo> {
    return await db("todos").where({ id }).first()
  },
  async update(todo: Todo, id: number): Promise<Todo> {
    const updatedTodo = await db("todos")
      .update({
        ...todo,
        updatedAt: moment().unix(),
      })
      .where({ id })
      .returning("*")

    return updatedTodo[0]
  },
  async add(todo: Todo) {
    const newTodo = await db("todos").insert(todo).returning("*")

    return newTodo[0]
  },
  async delete(id: number) {
    const destroy = await db("todos").where({ id }).del()

    if (!destroy) return false

    return true
  },
}
