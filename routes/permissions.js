var express = require('express');
var router = express.Router();
let permissions = require('../controllers/permissionsControllers');

router.route('/')
  .get(permissions.getAll)
  .post(permissions.saveRole);

module.exports = router;
