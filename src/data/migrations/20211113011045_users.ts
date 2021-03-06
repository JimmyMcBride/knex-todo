import { Knex } from "knex"

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments()
    tbl.text("username").notNullable().unique()
    tbl.text("email").notNullable().unique()
    tbl.text("password").notNullable()
  })
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTableIfExists("users")
}
