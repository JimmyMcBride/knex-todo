import { Knex } from "knex"

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries 💀
  return knex("todos")
    .del()
    .then(async function () {
      // Inserts seed entries 🌱
      return knex("todos").insert([
        {
          title: "Build Todo API",
          description: "Build a todo api with auth",
          completed: true,
          userId: 1,
        },
        {
          title: "Update Todo table to include a tile",
          completed: false,
          userId: 1,
        },
      ])
    })
}
