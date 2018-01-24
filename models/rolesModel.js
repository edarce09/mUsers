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
  /*permissions:[{
    type:ObjectId,
    ref:'Permissions'
  }],*/
  //Mandatory attributes
  lastEdit:{
    date:{type: Number, default:0},
    editor:{}
  },
  collectionName:{ type: String, default:"Roles"},
  createdAt: {type:Number, default:0},
  isEnable:{type:Boolean, default:true}
});

//plugins
RoleSchema.plugin(paginate);
RoleSchema.plugin(crud);

RoleSchema.methods.addPermissions = function(permissions, cb){
  permissions.forEach(function(cPermission, i){
    let nIndex = this.roles.indexOf(cPermission);
    if(nIndex === -1) this.permissions.push(cPermission);
  });
  this.save(cb);
}

let Roles = connection.model('Roles', RoleSchema);
module.exports = Roles;
