/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')


router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router.post('/register', [AuthController, 'register'])
    router.post('/login', [AuthController, 'login'])
    router.post('/logout', [AuthController, 'logout']).use(middleware.auth())
  })
  .prefix('user')

router
  .get('me', async ({ auth, response }) => {
    try {
      const user = auth.getUserOrFail()
      return response.ok(user)
    } catch (error) {
      return response.unauthorized({ error: 'User not found' })
    }
  })
  .use(middleware.auth())

// CARS ROUTES
const CarsController = () => import('#controllers/cars_controller')


router
  .group(() => {
    // Lister toutes les voitures
    router.get('/', [CarsController, 'index'])

    // Créer une voiture
    router.post('/', [CarsController, 'store']).use(middleware.auth()) // Nécessite une authentification

    // Obtenir une voiture spécifique
    router.get('/:id', [CarsController, 'show'])

    // Mettre à jour une voiture
    router.put('/:id', [CarsController, 'update']).use(middleware.auth())

    // Supprimer une voiture
    router.delete('/:id', [CarsController, 'destroy']).use(middleware.auth())
  })
  .prefix('cars') // Toutes les routes commencent par /cars