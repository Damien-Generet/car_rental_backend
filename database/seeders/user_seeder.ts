import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import { faker } from '@faker-js/faker'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    const users = Array.from({ length: 10 }).map(() => ({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      password: 'password123', // Utilise un mot de passe fixe pour simplifier les tests
    }))

    await User.createMany(users)
  }
}
