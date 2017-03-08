const RouterController = require('../controllers/RouterController');
module.exports = [
  { 
  	method: 'GET', 
  	path: '/', 
  	config: RouterController.getAll
  },
  {
    method: 'POST',
    path: '/authenticate',
    config: RouterController.configAuthenticate
  },
  {
    method: 'GET',
    path: '/authenticate',
    config: RouterController.configGetAuthenticate
  }
]