'use strict'

let db = require('../../../mongooseSetUp');
let User = require('../models/userModel');
let _ = require('lodash');
//let response= require('oz_responses');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');
let controllerBase = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozControllerBase');

// set standar controllers to for the model
let controllers = controllerBase.exportControllers(User, {
  sort:'username',
  populate: [{path:'roles'}]
});

const createOne = controllers.createOne;
const getOne = controllers.getOne;
const getAll = controllers.getAll;
const editOne = controllers.editOne;
const disableIt = controllers.disableIt;

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

const update = function updateUserDocument(req, res){
  if(_.isEmpty(req.body)) return res.status(500).send({message:'No information to update'});
  let params = {};
  if(req.body.title) params.title = req.body.title; 
  if(req.body.url) params.url = req.body.url;
  if(req.body.id) params.id = req.body.id;
  if(req.body.username) params.username= req.body.username;
  User.updateDoc({_id:req.params.user, structure:params}, (err, usr)=>{
  if(err) return response.serverError(res, usr, err);
  if(!usr) return response.notFound(res);
  return response.ok(res, usr);
  });
}


const deleteUser = function deletUserDocument(req, res){
  let params = {query:{_id:req.params.user}}
  User.deleteOne(params, (err)=>{
    if(err) return response.serverError(res, {}, err);
    return response.ok(res);
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


module.exports = {
  createOne,
  getOne,
  getAll,
  update,
  deleteUser,
  editOne,
  addRole,
  disableIt
}
