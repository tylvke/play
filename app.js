"use strict";
var path = require('path');
var xtpl=require('xtpl/lib/koa');
var koa = require('koa');
var Router = require('koa-router');
var bodyParser = require('koa-bodyparser');
var render = require('koa-views');
var staticServer = require('koa-static');
var session = require('koa-generic-session');
var redisStore = require('koa-redis')({
    port:6379,
    host:"10.234.106.147",
    auth_pass:"xiaokeai"
});

var config=require('./config/config.js');
var frontendRoutes=require('./app/routes/frontend');
var backendRoutes=require('./app/routes/backend');
var response=require('./app/middlewares/response');
var db=require("./db/db");
let app=koa();

xtpl(app,{
    views:'app/views',
    extname:"html"
});

let backendRouter = Router({
    prefix:"/api"
});
let frontendRouter = new Router();

backendRoutes(backendRouter);
frontendRoutes(frontendRouter);

app.keys = ['keys', 'keykeys'];
app.use(session({
    store: redisStore
}));

app.use(staticServer(path.join(__dirname,'public')))
    .use(response())
    .use(bodyParser())
    .use(backendRouter.routes())
    .use(backendRouter.allowedMethods())
    .use(frontendRouter.routes())
    .use(frontendRouter.allowedMethods());
app.listen(config.PORT);