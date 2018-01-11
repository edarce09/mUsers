'use strict'

let mongoose = require('mongoose');
let paginate = require('mongoose-paginate');
let connection = require('../../../mongooseSetUp');
//let crud = require('ozmodelbase');
let crud = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozModelBase');

let ObjectId = mongoose.Schema.Types.ObjectId;
let Schema = mongoose.Schema;

/** 
 *  Module Dependencies
 */
const UserSchema = Schema({
  /**
   *  @module User
   *  @class User
   *  User Schema
   *  @property {String} imageSrc - Path for the user image, unique param and not required
   *  @property {String} username - User's name, required, unique and lowercased
   *  @property {String} id - User's Identification number, required and unique
   *  @property {Array} email - User's collections of mails
   *  @property {String} social
   * 
   *  @property  {Object} socialnetworks
   *  @property  {Object} workFlow
   *  @property  {String} password - Hashed password
   *  @property  {String} collectioName - Users
   *
   *
   */
  imageSrc: {
    type: String,
    //unique: true,
    required:false
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
    //validate: /\b[a-z0-9._%+-]@[a-z0-9.-]+\.[a-z]{2,4}\b/,
    lowercase:true
    //,sparse:true
  }],
  socialNetworks:{
    facebook:{type:String},
  },
  workflow:{
    networks:{
      asana:{},
      slack:{},
      github:{}
    }/**,
    tasks:[{/*id reference*//*
      type:ObjectId,
      ref:tasks
    }]*/
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
  //Mandatory attributes
  lastEdit:{
    date:{type: Number, default:0},
    editor:{}
  },
  collectionName:{ type: String, default:"User"},
  createdAt: {type:Number, default:0},
  isEnable:{type:Boolean, default:true}
});

//paginate
UserSchema.plugin(paginate);
UserSchema.plugin(crud);

// Statics

//crud

UserSchema.statics.updateDoc = function(params, cb){
  console.log(params);
  if(!params || !params._id || !params.structure) return cb({
    message:'Error. No query parameters',
    status: 500
  });
  this.findByIdAndUpdate(
    params._id, 
    {$set:params.structure}, 
    {new: true}, 
    (err, usr)=>{
      if(err) return cb(err);
      return cb(err, usr);
    });
}

/**
 *  Edit  w
 *
 */
UserSchema.methods.edit = function(params, cb){
  this.preEdit(params, (err)=>{
    if(params.imageSrc) this.imageSrc = params.imageSrc;
    if(params.username) this.username = params.username;
    if(params.id) this.id = params.id;
    if(params.url) this.url = params.url;
    if(params.title) this.title = arams.title;
    this.save(cb);
  });
}

/**
UserSchema.statics.deletOne = function(params, cb){
  this.remove(params.query, (err)=>{
    if(err) console.log(err);
    return cb(err);
  })  
}
*/

//Methods
UserSchema.methods.promise = function(){
  console.log(this.title);
}


let Users = connection.model('Users', UserSchema);
module.exports = Users;

