'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schemaa;

let UserSchema = new Schema({
  title:String,
  id:Number,
  url:String
});

module.exports = mongoose.model('Users',UserSchema);
