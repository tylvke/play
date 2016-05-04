"use strict"

exports.index=function *(){
    yield this.render('article/index',{
        "title":"首页"
    });
};
exports.remove=function *(){
    var articledId=this.params['articleId'];

    this.send(articledId,1,"删除成功");
};