import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Car from '#models/car'
import { faker } from '@faker-js/faker'
import { DateTime } from 'luxon'

export default class CarSeeder extends BaseSeeder {
  public async run() {
    const cars = Array.from({ length: 10 }).map(() => ({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      year: faker.number.int({ min: 2000, max: 2023 }),
      licensePlate: faker.vehicle.vrm(),
      status: 'available',
      pricePerDay: faker.number.int({ min: 50, max: 500 }),
      kw: faker.number.int({ min: 50, max: 400 }),
      ch: faker.number.int({ min: 70, max: 550 }),
      typeShape: faker.helpers.arrayElement(['sedan', 'SUV', 'hatchback', 'convertible']),
      consommationType: faker.helpers.arrayElement(['petrol', 'diesel', 'electric', 'hybrid']),
      consommation: faker.number.float({ min: 0, max: 15, fractionDigits: 1 }),
      autonomie: faker.number.int({ min: 200, max: 1000 }),
      emissionCo2: faker.number.int({ min: 0, max: 300 }),
      fuelLevel: faker.number.int({ min: 0, max: 100 }),
      mileage: faker.number.int({ min: 0, max: 200000 }),
      lastMaintenanceDate: DateTime.fromJSDate(faker.date.recent()),
      numberSeats: faker.number.int({ min: 2, max: 7 }),
      gearboxType: faker.helpers.arrayElement(['manual', 'automatic']),
      carColor: faker.color.human(),
      insuranceExpirationDate: DateTime.fromJSDate(faker.date.future()),
      gpsEquiped: faker.datatype.boolean(),
      additionalFeatures: faker.helpers.arrayElement([
        'Bluetooth',
        'Sunroof',
        'Autopilot',
        'Heated seats',
      ]),
      category: faker.helpers.arrayElement(['economy', 'luxury', 'family', 'sport']),
      rentalCount: faker.number.int({ min: 0, max: 50 }),
      statusDetails: faker.lorem.sentence(),
    }))

    await Car.createMany(cars)
  }
}
