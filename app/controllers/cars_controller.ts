import type { HttpContext } from '@adonisjs/core/http'
import Car from '#models/car'
import { carCreateValidator, carUpdateValidator } from '#validators/car'
import { DateTime } from 'luxon'

export default class CarsController {
  async index({ response }: HttpContext) {
    const cars = await Car.all()
    return response.ok(cars)
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(carCreateValidator)
    const car = await Car.create({
      ...payload,
      lastMaintenanceDate: payload.lastMaintenanceDate
        ? DateTime.fromJSDate(payload.lastMaintenanceDate)
        : undefined,
      insuranceExpirationDate: payload.insuranceExpirationDate
        ? DateTime.fromJSDate(payload.insuranceExpirationDate)
        : undefined,
    })
    return response.created(car)
  }

  async show({ params, response }: HttpContext) {
    const car = await Car.findOrFail(params.id)
    return response.ok(car)
  }

  /**
   * Update a car
   */
  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(carUpdateValidator) // Validate input
    const car = await Car.findOrFail(params.id) // Find car by ID
    car.merge({
      ...payload,
      lastMaintenanceDate: payload.lastMaintenanceDate
        ? DateTime.fromJSDate(payload.lastMaintenanceDate)
        : undefined,
      insuranceExpirationDate: payload.insuranceExpirationDate
        ? DateTime.fromJSDate(payload.insuranceExpirationDate)
        : undefined,
    }) // Merge the validated data into the car
    await car.save() // Save the updated car to the database
    return response.ok(car) // Return the updated car
  }

  /**
   * Delete a car
   */
  async destroy({ params, response }: HttpContext) {
    const car = await Car.findOrFail(params.id) // Find car by ID or throw error if not found
    await car.delete() // Delete the car from the database
    return response.noContent() // Return 204 No Content response
  }
}
