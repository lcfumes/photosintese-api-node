const RouterController = require('../controllers/RouterController');
const LoginController = require('../controllers/LoginController');
const AlbumsController = require('../controllers/AlbumsController');

module.exports = [
  { 
  	method: 'GET', 
  	path: '/', 
  	config: RouterController.getAll
  },
  {
    method: 'POST',
    path: '/user/authenticate',
    config: LoginController.configAuthenticate
  },
  {
    method: 'POST',
    path: '/user/create',
    config: LoginController.configCreateUser
  },
  {
    method: 'POST',
    path: '/albums/create',
    config: AlbumsController.configCreateAlbum
  },
  {
    method: 'GET',
    path: '/albums',
    config: AlbumsController.configListAlbums
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    config: AlbumsController.configListAlbum
  }
]