'use stric'

let db = require('../../../mongooseSetUp');
let User = require('../models/userModel');
let _ = require('lodash');
//let response= require('oz_responses');
let response = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/responses');

const getAll = function findAllUsers(req, res){
  let params = {};
  User.loadAll(params, (err, usrs)=>{
    if(err) return response.serverError(res, usrs, err);
    if(!usrs) return response.notFound(res);
    else return response.ok(res, usrs);
  });
}

const getOne = function findOneUser(req,res){
  let user = JSON.parse("{"+req.params.user+"}");
  let query = (user._id !== undefined)? 
    {_id:user._id}:
    {username:user.username};
  let params = {query:query};
  User.load(params, (err, usr)=>{
    if(err) return response.serverError(res, user, err);
    if(!usr) return response.notFound(res);
    else return response.ok(res, usr);
  });
}

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

const editUser = function editOneUser(req, res){
  let user = JSON.parse("{"+req.params.user+"}");
  let query = (user._id !== undefined)? 
    {_id:user._id}:
    {username:user.username};
  let params = {query:query};
  let err;
  User.load(params, (err, user)=>{
    user.preEdit(req.body, (err)=>{
      if(err) return response.serverError(res, user, err);
      user.save((err)=>{
        return response.ok(res, user);
      });
    })
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

//test new edit
const newUpdate = function dinamycEdit(req, res){
  
}

const saveUser = function savesNewUserData(req, res){
  let user = new User();
  let params = req.body;
  //much to do here
  user.title = params.title;
  user.id = params.id;
  user.url = params.url;
  user.password= params.password;
  user.username= params.username;
  user.email = params.email

  user.save((err, u)=>{
    if(err) response.serverError(res, user, err);
    else {
      u.promise();
      return response.created(res, u);
    }
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
  let user_id = req.body.user_id;
  let roles = req.body.roles;
  // to change the query
  let params = {query: {_id:user_id}};
  User.load(params, (err, user)=>{
    if(err) return response.serverError(res, user, err);
    if(!user) return response.notFound(res);
    user.addRole(req.body.roles, (err)=>{
    if(err) return response.serverError(res, user, err);
    else return response.ok(res);
    });
  });
}


module.exports = {
  saveUser,
  getOne,
  update,
  deleteUser,
  editUser,
  addRole,
  getAll
}
