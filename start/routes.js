'use strict'

const Route = use('Route')

Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store')
Route.put('/users/:id', 'UserController.update')

Route.post('sessions', 'SessionController.store')

Route.resource('/posts', 'PostController')
  .apiOnly()
  .except(['index', 'show'])
  .middleware(['auth', 'is:(administrator || moderator)'])

Route.get('/posts', 'PostController.index')
  .middleware(['auth', 'can:(read_post || read_private_post)'])

Route.get('/posts/:id', 'PostController.show')
  .middleware(['auth', 'can:(read_post || read_private_post)'])

Route.resource('permissions', 'PermissionController').apiOnly().middleware('auth')

Route.resource('roles', 'RoleController').apiOnly().middleware('auth')
