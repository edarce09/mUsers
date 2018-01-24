'use strict'

let Permissions = require('../models/permissionsModel');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');
let controllerBase = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozControllerBase');

// set standar controllers to for the model
let controllers = controllerBase.exportControllers(Permissions, {});

module.exports = controllers;
