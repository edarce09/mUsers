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

const PermissionSchema = Schema({
  name:{
    type: String,
    unique: true,
    required: true
  },
  //Mandatory attributes
  lastEdit:{
    date:{type: Number, default:0},
    editor:{}
  },
  collectionName:{ type: String, default:"Permission"},
  createdAt: {type:Number, default:0},
  isEnable:{type:Boolean, default:true}
});

//plugins
RoleSchema.plugin(paginate);
RoleSchema.plugin(crud);

let Permisions = connection.model('Permissions', PermissionSchema);
module.exports = Permissions;
