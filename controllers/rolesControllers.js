'use strict'

let Role = require('../models/rolesModel');
//let response= require('oz_responses');
let response= require('../../test/index.js').responses;
//let controllerBase= require('controllerBase');
let controllerBase= require('../../test/index.js').controllerBase;

// set standar controllers to for the model
let controllers = controllerBase.exportControllers(Role, {});
const addPermissions = function assignPermissionsToOneRole(req, res){
  let permissions = req.body.premissions.split(","); 
}

module.exports = controllers;
