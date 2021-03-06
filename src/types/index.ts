export interface User {
  id?: number
  email?: string
  username?: string
  password?: string
  date?: string
  updatedAt?: string
}

export interface Todo {
  id?: number
  description?: string
  complete?: boolean
  userId?: number
  date?: string
  updatedAt?: string
}
