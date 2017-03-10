const RouterController = require('../controllers/RouterController');
const LoginController = require('../controllers/LoginController');
const AlbumsController = require('../controllers/AlbumsController');
const PicturesController = require('../controllers/PicturesController');


module.exports = [
  { 
  	method: 'GET', 
  	path: '/', 
  	config: RouterController.getAll
  },
  // Authentication
  {
    method: 'POST',
    path: '/user/authenticate',
    config: LoginController.configAuthenticate
  },
  // User
  {
    method: 'POST',
    path: '/user/create',
    config: LoginController.configCreateUser
  },
  // Albums
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
  },
  // Pictures
  {
    method: 'POST',
    path: '/pictures/{albumId}/create',
    config: PicturesController.configCreatePicture
  }
]