"use strict"

//var thunkify = require('thunkify-wrap');

var ArticleModel=require('../models/article');

exports.index=function *(){
    yield this.render('article/index',{
        "title":"首页"
    });
};

exports.list=function *(){
//    var articles=yield thunkify(ArticleModel.find,ArticleModel)();
    var article={
        title:"爱玩",
        content:"就是爱玩"
    };
    yield ArticleModel.create(article,function(){});
    var articles=yield ArticleModel.find({
       title:"爱玩"
    });
    this.send(articles,0);
};

exports.remove=function *(){
    var articledId=this.params['articleId'];

    this.send(articledId,1,"删除成功");
};