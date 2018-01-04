let mongoose = require('mongoose');
//mongoose.Promise = global.Promise; 

let connection = mongoose.createConnection('mongodb://localhost:27017/cursomean',(err, res)=>{
  if(err) console.log(err);
  else console.log('mongoose conected');
  return;  
});

module.exports = {
  connection
}
