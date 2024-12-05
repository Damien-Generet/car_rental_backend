import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reservations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('car_id').unsigned().references('id').inTable('cars').onDelete('SET NULL')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('SET NULL')

      // Statut de la réservation
      table.enum('status', ['pending', 'confirmed', 'cancelled']).defaultTo('pending')

      // Date de début de la réservation
      table.timestamp('start_date').notNullable()

      // Date de fin de la réservation
      table.timestamp('end_date').notNullable()

      // Prix total de la réservation
      table.float('total_price').notNullable()

      // Date d'annulation ( null si la réservation n'est pas annulée )
      table.timestamp('cancelled_at').nullable()

      // Note supplémentaire
      table.text('note').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}