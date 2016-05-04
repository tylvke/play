"use strict"

var util=require('util');

/**
 * 定制报文格式
 * @returns {*}
 */

module.exports=function(){
  return function *(next){
      this.send=function(res,code,msg){
          var result={
              statusCode:code
          };
          if(res){
              result=util._extend(result,{result:res});
          }
          if(code!==0 && msg){
              result=util._extend(result,{
                  statusDesc:msg
              });
          }
          this.body=JSON.stringify(result);
      };
      yield next;
  }
};