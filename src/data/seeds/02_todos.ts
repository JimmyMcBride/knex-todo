import { Knex } from "knex"

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries 💀
  return knex("todos")
    .del()
    .then(async function () {
      // Inserts seed entries 🌱
      return knex("todos").insert([
        {
          description: "Build a todo api with auth",
          completed: false,
          userId: 1,
        },
      ])
    })
}
