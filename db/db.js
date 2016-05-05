"use strict"

let mongoose=require('mongoose');
let config=require('../config/config');
let options={
    server:{
        auto_reconnect:true,
        poolSize:10
    }
};

var db=mongoose.connect("mongodb://"+config.MongoDB.HOST+":"+config.MongoDB.PORT+"/"+config.MongoDB.NAME,options,function(err,res){
    if(err){
        console.log('[mongoose log] Error connecting to:'+err);
    }
    else{
        console.log('[mongoose log] Successfully connecting');
    }
});
module.exports=db;