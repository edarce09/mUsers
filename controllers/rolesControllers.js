'use stric'

let db = require('../../../mongooseSetUp');
let Role = require('../models/rolesModel');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');

const getAll = function findAllRoles(req, res){
  let params = {};
  Role.loadAll(params, (err, roles)=>{
    if(err) return response.serverError(res, roles, err);
    if(!roles) return response.notFound(res);
    else return response.ok(res, roles);
  });
}

const saveRole = function createsNewRole(req, res){
  let role = new Role();
  let params = req.body;
  role.name = req.body.name;
  role.save((err, r)=>{
    if(err) response.serverError(res, r, err);
    return response.created(res, r);
  });
}

module.exports = {
  getAll,
  saveRole
}
