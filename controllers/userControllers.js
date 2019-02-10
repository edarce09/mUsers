'use strict'

let db = require('../../../mongooseSetUp');
let User = require('../models/userModel');
let _ = require('lodash');
//let response= require('oz_responses');
let response= require('../../test/index.js').responses;
//let controllerBase= require('controllerBase');
let controllerBase= require('../../test/index.js').controllerBase;

// set standar controllers to for the model
let controllers = controllerBase.exportControllers(User, {
  sort:'username',
  populate: [{path:'roles'}]
});

const queryBuilder = function createsAQuery(body, params, cb){
  let collectionToSearch = JSON.parse("{"+params+"}");
  let query = (collectionToSearch._id !== undefines)?
    {_id:collectionToSearch._id}:
    {username:user.username};

}

//callback to apply
const userLoaded= function(err, req, docToEdit){
  docToEdit.preEdit(req.body, (err)=>{
    docToEdit.save((err)=>{
      return response.ok(res, user);
    });
  });
}

const addRole = function assignRolesToAUser(req, res){
  let roles = req.body.roles.split(",");
  let user_id = req.body.user_id;
  let objectToSend = {roles:roles};
  //let roles = req.body.roles;
  // to change the query
  let params = {query: {_id:user_id}};
  User.load(params, (err, user)=>{
    if(err) return response.serverError(res, user, err);
    if(!user) return response.notFound(res);
    user.addRole(roles, (err)=>{
      console.log(err);
    //user.roles.push(req.body.roles);
    //user.save(function(err){
    if(err) return response.serverError(res, user, err);
    else return response.ok(res);
    });
  });
}

controllers.addRole = addRole;

module.exports = controllers;
