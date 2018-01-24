var express = require('express');
var router = express.Router();
let roles = require('../controllers/rolesControllers');

router.route('/')
  .get(roles.getAll)
  .post(roles.createOne);


router.route('/:doc')
  .get(roles.getOne);
 /*
  .post(roles.update)
  .put(roles.editUser)
  .delete(roles.deleteUser);
  */

module.exports = router;
