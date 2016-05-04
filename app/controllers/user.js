exports.index=function *(){

};
exports.login=function *(){
    session=this.session;
    session.user={userId:123};
    this.send(session.user,1);
};