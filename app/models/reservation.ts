import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Car from '#models/car'
import type { BelongsTo as BelongsToDecorator } from '@adonisjs/lucid/types/relations'

export default class Reservation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // ID of the user who made the reservation
  @column()
  declare userId: number | null

  // ID of the car being reserved
  @column()
  declare carId: number | null

  // Start date of the reservation
  @column.dateTime()
  declare startDate: DateTime

  // End date of the reservation
  @column.dateTime()
  declare endDate: DateTime

  // Status of the reservation (e.g., pending, confirmed, cancelled)
  @column()
  declare status: 'pending' | 'confirmed' | 'cancelled'

  // Total price of the reservation
  @column()
  declare totalPrice: number

  // Timestamps for createdAt and updatedAt
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation to the User model
  @belongsTo(() => User)
  declare user: BelongsToDecorator<typeof User>

  // Relation to the Car model
  @belongsTo(() => Car)
  declare car: BelongsToDecorator<typeof Car>
}
