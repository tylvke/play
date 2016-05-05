"use strict"

var mongoose=require('mongoose');

var ArticleSchema=require('../../db/schemas/article');

module.exports=mongoose.model("Article",ArticleSchema);