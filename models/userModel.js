'use strict'

let mongoose = require('mongoose');
let paginate = require('mongoose-paginate');
let connection = require('../../../mongooseSetUp');
let _ = require('lodash');
//let crud = require('ozmodelbase');
let testAddress = require('../../test/index.js');
let crud = testAddress.crud;
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
  //RefenceId
  roles:[{
    type:ObjectId,
    ref:'Roles'
  }],
  //Mandatory attributes
  lastEdit:{
    date:{type: Number, default:0},
    editor:{}
  },
  collectionName:{ type: String, default:"User"},
  createdAt: {type:Number, default:0},
  isEnable:{type:Boolean, default:true}
},
{
  usePushEach:true
});

//plugins
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

UserSchema.methods.addRole = function(roles, cb){
  let nThis = this;
  //this.roles= roles;
  roles.forEach(function(cRole, i){
    let nIndex = nThis.roles.indexOf(cRole);
    if(nIndex === -1) nThis.roles.push(roles);
  });
  nThis.save(cb);
}

//Methods
UserSchema.methods.promise = function(){
  console.log(this.title);
}


let Users = connection.model('Users', UserSchema);
module.exports = Users;

