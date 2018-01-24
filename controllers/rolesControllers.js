'use strict'

//let db = require('../../../mongooseSetUp');
let Role = require('../models/rolesModel');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');
let controllerBase = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozControllerBase');

// set standar controllers to for the model
let controllers = controllerBase.exportControllers(Role, {});

module.exports = controllers;
