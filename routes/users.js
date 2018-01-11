var express = require('express');
var router = express.Router();
let user = require('../controllers/userControllers');

//GET  get Users
//Post creation of new user
router.route('/')
  .get(user.getAll)
  .post(user.saveUser); 

router.route('/role/')
 // .put(user.addRole)
//  .delete(user.removeRole)
  .get(user.getAll);

router.route('/:user')
  .get(user.getOne)
  .post(user.update)
  .put(user.editUser)
  .delete(user.deleteUser);

module.exports = router;
