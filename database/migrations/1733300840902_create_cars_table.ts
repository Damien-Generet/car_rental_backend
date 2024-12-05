import { BaseSchema } from '@adonisjs/lucid/schema'


export default class Cars extends BaseSchema {
  protected tableName = 'cars'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Primary key

      table.string('brand').notNullable() // Brand of the car
      table.string('model').notNullable() // Model of the car
      table.integer('year').unsigned().notNullable() // Manufacturing year
      table.string('license_plate').notNullable().unique() // License plate number
      table.string('status').notNullable() // Car status (e.g., available)
      table.decimal('price_per_day', 8, 2).notNullable() // Price per day
      table.integer('kw').unsigned().notNullable() // Power in kilowatts
      table.integer('ch').unsigned().notNullable() // Power in kilowatts
      table.string('type_shape').notNullable() // Type of car shape
      table.string('consommation_type').notNullable() // Fuel type
      table.decimal('consommation', 5, 2).unsigned().notNullable() // Fuel consumption
      table.decimal('autonomie', 8, 2).unsigned().notNullable() // Autonomy in kilometers
      table.decimal('emission_co_2', 8, 2).unsigned().notNullable() // CO2 emissions
      table.decimal('fuel_level', 5, 2).unsigned().notNullable() // Fuel level percentage
      table.bigInteger('mileage').unsigned().notNullable() // Mileage
      table.dateTime('last_maintenance_date').nullable() // Last maintenance date
      table.integer('number_seats').unsigned().notNullable() // Number of seats
      table.string('gearbox_type').notNullable() // Gearbox type
      table.string('car_color').notNullable() // Car color
      table.dateTime('insurance_expiration_date').nullable() // Insurance expiration date
      table.boolean('gps_equiped').defaultTo(false) // Whether GPS is equipped
      table.text('additional_features').nullable() // Additional features
      table.string('category').notNullable() // Car category
      table.integer('rental_count').unsigned().defaultTo(0) // Number of times rented
      table.text('status_details').nullable() // Status details (optional)

      // Timestamps
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}