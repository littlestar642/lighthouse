const mongoose=require('mongoose');

let Schema=mongoose.Schema;

var profSchema = new Schema({
    name:String,
    data:Object  
  });

module.exports=mongoose.model('prof',profSchema);