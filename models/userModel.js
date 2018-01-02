'use strict'

let mongoose = require('mongoose');
let paginate = require('mongoose-paginate');
let connection = require('../../../mongooseSetUp');

let ObjectId = mongoose.Schema.Types.ObjectId;
let Schema = mongoose.Schema;

const UserSchema = Schema({
  /**
   *  User Schema
   *  @module User
   *  @class User
   *  @property {string} imageSrc - Path for the user image, unique param and not required
   *  @property{string} username - User's name, required, unique and lowercased
   *  @property {string} id - User's Identification number, required and unique
   *  @property {string} email - User's
   */
  imageSrc: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase:true
  },
  id:{
    type:String,
    unique:true,
    required:true
  },
  email:[{
    type: String,
    unique: true,
    lowercase:true,
    match: /\b[a-z0-9._%+-]@[a-z0-9.-]+\.[a-z]{2,4}\b/ 
    //,sparse:true
  }],
  isEnable:{
    type:Boolean,
    default:true
  },
  socialNetworks:{
    facebook:{type:String},
  },
  workflow:{
    networks:{
      asana:{},
      slack:{},
      github:{}
    }/**,
    tasks:{/*id reference*//*
      type:ObjectId,
      ref:tasks
    }*/
  },
  conections:{/*to define*/},
  //hashed password, whom actually saves a plain password?
  password:{
    type:String,
    default:'',
    required:true
  },
  /*roles:[{
    type:ObjectId,
    ref:roles
  }], */
  title:String,
  id:Number,
  url:String
});

//paginate
UserSchema.plugin(paginate);

// Statics
UserSchema.statics.loadAll = function(params, cb) {
  if(!params.filter) params.filter = {};
  if(!params.options) params.options = {page:1, limit:10} ;
  if(!params.options.sort) params.options.sort = 'title';
  this.paginate(params.filter, params.options, function(err, results){
    cb(err, results);
  }); 
}

UserSchema.statics.load = function(params, cb){
  if(!params) return cb({
      message:'Error, no parameters defined',
      status: 404
    });
  //more speific validations, use middleware
  if(!params.query.title && !params.query.url) return cb({
    message:'Error, no query defined defined',
    status: 404
  });
  if(!params.fields) params.fields = 'title url id';
  this.findOne(params.query, params.fields, (err, person)=>{
    return cb(err, person);
  })  
}

UserSchema.statics.updateDoc = function(params, cb){
  if(!params || !params.id || !params.structure) return cb({
    message:'Error. No query parameters',
    status: 500
  });
  this.findByIdAndUpdate(
    params.id, 
    {$set:params.structure}, 
    {new: true}, 
    (err, usr)=>{
      if(err) return cb(err);
      return cb(err, usr);
    });
}

UserSchema.statics.deletOne = function(params, cb){
  this.remove(params.query, (err)=>{
    if(err) console.log(err);
    return cb(err);
  })  
}

//Methods
UserSchema.methods.promise = function(){
  console.log(this.title);
}


let Users = connection.model('Users', UserSchema);
module.exports = Users;

