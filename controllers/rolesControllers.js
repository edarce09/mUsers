'use strict'

let db = require('../../../mongooseSetUp');
let Role = require('../models/rolesModel');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');
let controllerBase = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozControllerBase');

const getAll = function findAllRoles(req, res){
  let populate = 'permissions';
  let params = {
    options:{
      populate: populate,
      sort: 'name'
    }
  }
  Role.loadAll(params, (err, roles)=>{
    if(err) return response.serverError(res, roles, err);
    if(!roles) return response.notFound(res);
    else return response.ok(res, roles);
  });
}

/*
cons getOne = findOneRole(req, res){
  let role =  '';  
}
*/

const saveRole = function createsNewRole(req, res){
  let role = new Role();
  let params = req.body;
  role.name = req.body.name;
  role.save((err, r)=>{
    if(err) return response.serverError(res, r, err);
    return response.created(res, r);
  });
}

module.exports = {
  getAll,
  saveRole
}
