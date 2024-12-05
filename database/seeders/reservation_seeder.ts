import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Reservation from '#models/reservation'
import Car from '#models/car'
import User from '#models/user'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class ReservationSeeder extends BaseSeeder {
  public async run() {
    // Récupérer les voitures et utilisateurs existants
    const cars = await Car.query().where('status', 'available') // Utilise uniquement les voitures disponibles
    const users = await User.all()

    if (cars.length === 0 || users.length === 0) {
      console.warn('Aucune voiture ou utilisateur disponible pour les réservations')
      return
    }

    const reservations = Array.from({ length: 5 }).map(() => {
      // Sélectionner une voiture et un utilisateur aléatoires
      const car = faker.helpers.arrayElement(cars)
      const user = faker.helpers.arrayElement(users)

      // Générer des dates de réservation
      const startDate = DateTime.now().plus({ days: faker.number.int({ min: 1, max: 15 }) })
      const endDate = startDate.plus({ days: faker.number.int({ min: 1, max: 7 }) })

      return {
        userId: user.id,
        carId: car.id,
        startDate,
        endDate,
        totalPrice: faker.number.int({ min: 100, max: 1000 }),
        status: faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled']),
      }
    })

    await Reservation.createMany(reservations)
  }
}
