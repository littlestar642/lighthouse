const mongoose=require('mongoose');

let Schema=mongoose.Schema;

var nitSchema = new Schema({
    name:String,
    professors:[{
        name:String,
        interests:Array,
        link:String,
        email:String
    }]  
  });

module.exports=mongoose.model('iit',nitSchema,'IIT');