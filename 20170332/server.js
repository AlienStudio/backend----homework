var express = require("express");
var bodyParser = require("body-parser");
var server = express();
server.listen(80);
server.use(bodyParser.urlencoded({extended: false}));
console.log("Started");

server.get('/vote', function (req, res) {
    console.log("/vote:get");
    res.end('Get');
})

server.put('/vote', function (req, res) {
    console.log("/vote:put");
    res.end('Put');
    JSON.parse()
})

server.post('/vote', function (req, res) {
    console.log("/vote:post");
    res.end('Post');
})

server.get('/vote/status', function (req, res) {
    console.log("/vote/status:get");
    res.end('Get')
})