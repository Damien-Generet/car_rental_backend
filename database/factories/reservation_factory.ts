import factory from '@adonisjs/lucid/factories'
import Reservation from '#models/reservation'

export const ReservationFactory = factory
  .define(Reservation, async ({ faker }) => {
    return {}
  })
  .build()