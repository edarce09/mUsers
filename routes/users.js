var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/')
.get(function(req, res, next) {
  res.send('this should be the users DB');
})
  //creation of new user
.post(function(req, res){
  let user = req.body;
  res.send(user);
});

module.exports = router;
