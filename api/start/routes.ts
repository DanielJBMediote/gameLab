/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route';

Route.post('', async({ response }) => {
  const hello = 'Hello World';
  return response.status(200).send(hello);
});

// Session routes --------------------------------------------------------------

Route.group(() => {
  Route.post('/login', 'SessionsController.store');
  Route.get('/logout', 'SessionsController.destroy').middleware(['auth']);
}).prefix('/session');

// Users routes ----------------------------------------------------------------

Route.group(() => {
  Route.post('/', 'UsersController.store');
  Route.get('/:id', 'UsersController.show');

  Route.group(() => {
    Route.get('logged', 'UsersController.logged');
    Route.get('', 'UsersController.index');
    Route.put(':id', 'UsersController.update');
    Route.delete(':id', 'UsersController.destroy');
  }).middleware(['auth']);
}).prefix('users');

// Profiles routes -------------------------------------------------------------

Route.group(() => {
  Route.get(':id', 'ProfilesController.show');
  Route.get('usernames/:username', 'ProfilesController.show');
}).prefix('profiles');
// RoomsRepository routes ------------------------------------------------------

Route.group(() => {
  Route.get('', 'RoomsController.index');

  Route.group(() => {
    Route.post('', 'RoomsController.store');
    Route.get(':id', 'RoomsController.show');
    Route.delete(':id', 'RoomsController.destroy');
  }).middleware(['auth']);
}).prefix('rooms');

// files routes ----------------------------------------------------------------

Route.group(() => {
  Route.get(':id', 'FilesController.show');
}).prefix('files');
