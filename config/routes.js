const RouterController = require('../controllers/RouterController');
module.exports = [
  { 
  	method: 'GET', 
  	path: '/', 
  	config: RouterController.getAll
  }
]