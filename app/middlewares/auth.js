"use strict"

var util = require('util');

/**
 * 校验会话
 * @returns {*}
 */

module.exports=function(){
  return function *(next) {
      if(!this.session || !this.session.user){
          this.send(null,999,"回话失效");
          return;
      }
      yield next;
  }
};