var app = require("./app");
function init() {
    return {
        ok:false,
        msg:"",
        data:{}
    };
}
function doPost(obj1) {
    var obj = init();
    app.create(obj1.name,obj1.boolarr,function () {
        obj.ok=true;
    },function (err) {
        obj.msg="投票失败"+err;
    });
    return  obj;
}
function doGet(obj1) {
    var obj = init();
    app.create(obj1.name,obj1.boolarr,function () {
        obj.ok=true;
    },function () {
        obj.msg="投票失败";
    });
    return  obj;
}
function doPut(obj1) {
    var obj = init();
    app.search(obj1.name,function (object) {
        obj[data]=object;
    });
    return  obj;
}
module.exports = {doGet:doGet,doPost:doPost,doPut:doPut};