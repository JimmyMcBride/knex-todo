import { Knex } from "knex"
import moment from "moment"

export async function up(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.createTable("todos", (tbl) => {
    tbl.increments()
    tbl.text("title").notNullable()
    tbl.text("description")
    tbl.boolean("completed").notNullable()
    tbl.integer("userId").notNullable()
    tbl.text("date").defaultTo(moment().unix()).notNullable()
    tbl.text("updatedAt").defaultTo(moment().unix()).notNullable()
  })
}

export async function down(knex: Knex): Promise<Knex.SchemaBuilder> {
  return knex.schema.dropTableIfExists("todos")
}
