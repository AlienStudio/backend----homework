var express = require("express");
var bodyParser = require("body-parser");
var server = express();
var dbEditor = require("./dbEditor");

server.listen(80);
server.use(bodyParser.urlencoded({extended: false}));
var path = "/vote"
server.get(path,function (req,res) {
    var obj = dbEditor.doGet(rebuild(req.query));

    res.send(obj);
    res.end();
});
server.put(path,function (req,res) {
    var data = dbEditor.doPut(req.body);
    res.send(data);
    res.end();
});
server.post(path,function (req,res) {
    var obj = dbEditor.doPost(rebuild(req.body));
    res.send(obj);
    res.end();
});
server.use("/",function (req,res) {
    res.sendStatus(200);
    res.end();
});
function rebuild (obj1){
    var obj={
        name:"",
        boolarr:new Array()
    }
    obj.name=obj1.name;
    obj.boolarr[0]=obj1.Vote0;
    obj.boolarr[1]=obj1.Vote1;
    obj.boolarr[2]=obj1.Vote2;
    obj.boolarr[3]=obj1.Vote3;
    obj.boolarr[4]=obj1.Vote4;
    obj.boolarr[5]=obj1.Vote5;
}

