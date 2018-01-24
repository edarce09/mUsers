var express = require('express');
var router = express.Router();
let user = require('../controllers/userControllers');

//GET  get Users
//Post creation of new user
router.route('/')
  .get(user.getAll)
  .post(user.createOne); 

router.route('/role/')
  .put(user.addRole)
  .delete(user.disableIt)
  .get(user.getAll);

router.route('/:doc')
  .get(user.getOne)
  .post(user.disableIt)
  .put(user.editOne)
  .delete(user.deleteOne);

module.exports = router;
