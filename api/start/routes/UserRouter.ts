import Route from '@ioc:Adonis/Core/Route'

Route.post('/users', 'UsersController.store')
Route.get('/users/username-check/:username', 'UsersController.showByUsername')

Route.group(() => {
  Route.get('/', 'UsersController.index')
  Route.get('/:id', 'UsersController.show')
  Route.put('/', 'UsersController.update')
  Route.delete('/', 'UsersController.destroy')
  Route.get('/user/by-token', 'UsersController.showByToken')
})
  .prefix('/users')
  .middleware(['auth'])
