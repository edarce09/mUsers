'use stric'

let db = require('../../../mongooseSetUp');
let User = require('../models/userModel');
let _ = require('lodash');
let response= require('../models/utils');

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
  console.log(user);
  let query = (user.id !== undefined)? 
    {_id:user.id}:
    {title:user.title};
    console.log(query);
  let params = {query:{title : user.title}};
  User.load(params, (err,usr)=>{
    if(err) return response.serverError(res, user, err);
    if(!usr) return response.notFound(res);
    else return response.ok(res, usr);
  })
}

const update = function updateUserDocument(req, res){
  if(_.isEmpty(req.body)) return res.status(500).send({message:'No information to update'});
  let params = {};
    if(req.body.title) params.title = req.body.title; 
    if(req.body.url) params.url = req.body.url;
    if(req.body.id) params.id = req.body.id

  User.updateDoc({id:req.params.id, structure:params}, (err, usr)=>{
   if(err) return response.serverError(res, usr, err);
   if(!usr) return response.notFound(res);
   return response.ok(res, usr);
  });
}

const saveUser = function savesNewUserData(req, res){
  let user = new User();
  let params = req.body;
  user.title = params.title;
  user.id = params.id;
  user.url = params.url;

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
  User.deletOne(params, (err)=>{
    if(err) return response.serverError(res, {}, err);
    return response.ok(res);
  });
}

module.exports = {
  saveUser,
  getOne,
  update,
  deleteUser,
  getAll
}
