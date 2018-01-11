'use strict'

let mongoose = require('mongoose');
let paginate = require('mongoose-paginate');
let connection = require('../../../mongooseSetUp');
//let crud = require('ozmodelbase');
let crud = require('/home/kirsch/Repository/jsRepos/myNpmDependencies/ozModelBase');

let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;
/**
 * Module Dependencies
 */

const RoleSchema = Schema({
  name:{
    type: String,
    unique: true,
    required: true
  },
  permissions:[{
//   type:ObjectId,
//    ref:permissions
  }],
  //Mandatory attributes
  lastEdit:{
    date:{type: Number, default:0},
    editor:{}
  },
  collectionName:{ type: String, default:"Roles"},
  createdAt: {type:Number, default:0},
  isEnable:{type:Boolean, default:true}
});

//paginate
RoleSchema.plugin(paginate);
RoleSchema.plugin(crud);


let Roles = connection.model('Roles', RoleSchema);
module.exports = Roles;
