const RouterController = require('../controllers/RouterController');
const LoginController = require('../controllers/LoginController');

module.exports = [
  { 
  	method: 'GET', 
  	path: '/', 
  	config: RouterController.getAll
  },
  {
    method: 'POST',
    path: '/authenticate',
    config: LoginController.configAuthenticate
  },
  {
    method: 'GET',
    path: '/authenticate',
    config: LoginController.configGetAuthenticate
  }
]