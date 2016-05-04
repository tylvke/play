"use strict";

var koa = require('koa');
var app = koa();
var xtpl=require('xtpl/lib/koa');
var router=require('koa-router');

var api = router();

api.get('/', function *(){
//    this.body = '就是爱玩a';
    yield this.render('article/index',{"title":"就是爱玩"});
});

app
    .use(api.routes())
    .use(api.allowedMethods());
xtpl(app,{
    views:'app/views',
    extname:"html"
});
app.listen(3000);