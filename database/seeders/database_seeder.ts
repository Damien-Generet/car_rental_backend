import { BaseSeeder } from '@adonisjs/lucid/seeders'
import UserSeeder from './user_seeder.js'
import CarSeeder from './car_seeder.js'
import ReservationSeeder from './reservation_seeder.js'

export default class DatabaseSeeder extends BaseSeeder {
  public async run() {
    await new UserSeeder().run()
    await new CarSeeder(this.client).run()
    await new ReservationSeeder(this.client).run()
  }
}
