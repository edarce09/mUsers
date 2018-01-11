var express = require('express');
var router = express.Router();
let roles = require('../controllers/rolesControllers');

router.route('/')
  .get(roles.getAll)
  .post(roles.saveRole);

module.exports = router;
