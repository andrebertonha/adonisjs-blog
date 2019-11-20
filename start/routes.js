'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store')
Route.put('/users/:id', 'UserController.update')

Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.resource('posts', 'PostController').apiOnly()
}).middleware(['auth'])

Route.resource('permissions', 'PermissionController').apiOnly().middleware('auth')

Route.resource('roles', 'RoleController').apiOnly().middleware('auth')
