import factory from '@adonisjs/lucid/factories'
import Car from '#models/car'

export const CarFactory = factory
  .define(Car, async ({ faker }) => {
    return {}
  })
  .build()