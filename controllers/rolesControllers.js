'use strict'

let Role = require('../models/rolesModel');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');
let controllerBase = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozControllerBase');

// set standar controllers to for the model
let controllers = controllerBase.exportControllers(Role, {});
const addPermissions = function assignPermissionsToOneRole(req, res){
  let permissions = req.body.premissions.split(","); 
}

module.exports = controllers;
