import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Car extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // Brand of the car (e.g., Toyota, Tesla)
  @column()
  declare brand: string

  // Model of the car (e.g., Corolla, Model S)
  @column()
  declare model: string

  // Manufacturing year
  @column()
  declare year: number

  // License plate number
  @column()
  declare licensePlate: string

  // Status (e.g., available, rented, maintenance)
  @column()
  declare status: string

  // Price per day for renting the car
  @column()
  declare pricePerDay: number

  // Power in kilowatts
  @column()
  declare kw: number

  // Power in Chx
  @column()
  declare ch: number

  // Type of car shape (e.g., SUV, sedan, hatchback)
  @column()
  declare typeShape: string

  // Type of fuel consumption (e.g., petrol, diesel, electric)
  @column()
  declare consommationType: string

  // Fuel consumption rate (e.g., liters per 100 km)
  @column()
  declare consommation: number

  // Car autonomy (e.g., maximum distance on full tank/charge)
  @column()
  declare autonomie: number

  // CO2 emissions in grams per kilometer
  @column()
  declare emissionCo2: number

  // Current fuel level in percentage
  @column()
  declare fuelLevel: number

  // Total mileage of the car
  @column()
  declare mileage: number

  // Last maintenance date
  @column.dateTime()
  declare lastMaintenanceDate: DateTime

  // Number of seats in the car
  @column()
  declare numberSeats: number

  // Type of gearbox (e.g., manual, automatic)
  @column()
  declare gearboxType: string

  // Color of the car
  @column()
  declare carColor: string

  // Insurance expiration date
  @column.dateTime()
  declare insuranceExpirationDate: DateTime

  // Whether the car has GPS
  @column()
  declare gpsEquiped: boolean

  // Additional features of the car
  @column()
  declare additionalFeatures: string

  // Category of the car (e.g., economy, luxury)
  @column()
  declare category: string

  // Number of times the car has been rented
  @column()
  declare rentalCount: number

  // Details about the car's status (optional)
  @column()
  declare statusDetails: string

  // Timestamps for createdAt and updatedAt
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}