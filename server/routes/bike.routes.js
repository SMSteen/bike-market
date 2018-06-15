const { bikeController } = require('../controllers');
const router = require('express').Router();

module.exports = router
  .get('/', bikeController.index)
  .get('/:bikeID', bikeController.show)
  .post('/', bikeController.create)
  .put('/:bikeID', bikeController.update)
  .delete('/:bikeID', bikeController.destroy);
