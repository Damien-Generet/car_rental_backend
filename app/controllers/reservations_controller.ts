import type { HttpContext } from '@adonisjs/core/http'
import Reservation from '#models/reservation'
import Car from '#models/car'
import { reservationCreateValidator, reservationUpdateValidator } from '#validators/reservation'
import { DateTime } from 'luxon'

export default class ReservationsController {
  /**
   * Lister toutes les réservations de l'utilisateur connecté
   */
  async index({ auth, response }: HttpContext) {
    const userId = auth.user!.id
    const reservations = await Reservation.query().where('userId', userId).preload('car') // Charger les détails de la voiture associée
    return response.ok(reservations)
  }

  /**
   * Créer une nouvelle réservation
   */
  async store({ request, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const payload = await request.validateUsing(reservationCreateValidator)

    // Vérifier la disponibilité de la voiture
    const car = await Car.findOrFail(payload.carId)
    if (car.status !== 'available') {
      return response.badRequest({ message: 'Car is not available for reservation' })
    }

    // Valider les dates
    const startDate = DateTime.fromISO(payload.startDate)
    const endDate = DateTime.fromISO(payload.endDate)

    if (!startDate.isValid || !endDate.isValid || startDate >= endDate) {
      return response.badRequest({ message: 'Invalid date range' })
    }

    // Calculer le prix total
    const totalDays = Math.ceil(endDate.diff(startDate, 'days').days)
    const totalPrice = totalDays * car.pricePerDay

    // Créer la réservation
    const reservation = await Reservation.create({
      userId,
      carId: payload.carId,
      startDate,
      endDate,
      totalPrice,
      status: 'pending',
    })

    // Marquer la voiture comme "louée"
    car.status = 'rented'
    await car.save()

    return response.created(reservation)
  }

  /**
   * Obtenir les détails d'une réservation spécifique
   */
  async show({ params, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const reservation = await Reservation.query()
      .where('id', params.id)
      .andWhere('userId', userId) // Assurer que la réservation appartient à l'utilisateur connecté
      .preload('car')
      .firstOrFail()

    return response.ok(reservation)
  }

  /**
   * Mettre à jour une réservation
   */
  async update({ params, request, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const payload = await request.validateUsing(reservationUpdateValidator)

    const reservation = await Reservation.query()
      .where('id', params.id)
      .andWhere('userId', userId) // Assurer que la réservation appartient à l'utilisateur connecté
      .firstOrFail()

    // Mettre à jour les dates ou autres champs modifiables
    if (payload.startDate || payload.endDate) {
      const startDate = payload.startDate
        ? DateTime.fromISO(payload.startDate)
        : reservation.startDate
      const endDate = payload.endDate ? DateTime.fromISO(payload.endDate) : reservation.endDate

      if (!startDate.isValid || !endDate.isValid || startDate >= endDate) {
        return response.badRequest({ message: 'Invalid date range' })
      }

      reservation.startDate = startDate
      reservation.endDate = endDate
    }

    reservation.status = payload.status ?? reservation.status
    await reservation.save()

    return response.ok(reservation)
  }

  /**
   * Supprimer une réservation
   */
  async destroy({ params, auth, response }: HttpContext) {
    const userId = auth.user!.id
    const reservation = await Reservation.query()
      .where('id', params.id)
      .andWhere('userId', userId) // Assurer que la réservation appartient à l'utilisateur connecté
      .firstOrFail()

    // Vérifier si la réservation est déjà annulée
    if (reservation.status === 'cancelled') {
      return response.badRequest({ message: 'Reservation is already cancelled' })
    }

    // Marquer la réservation comme annulée
    reservation.status = 'cancelled'
    await reservation.save()

    // Rendre la voiture disponible à nouveau
    const car = await reservation.related('car').query().first()
    if (car) {
      car.status = 'available'
      await car.save()
    }

    return response.ok({ message: 'Reservation cancelled' })
  }
}
