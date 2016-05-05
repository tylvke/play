"use strict"

let mongoose=require('mongoose');

var ArticleSchema=new mongoose.Schema({
   title:{type:String},
   content:{type:String}
});
ArticleSchema.static.fetch=function(cb){
  return this.find({},cb)
};
module.exports=ArticleSchema;