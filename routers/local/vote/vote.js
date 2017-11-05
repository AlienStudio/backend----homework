const express = require("express");
const add = require("./add/add");
const remove = require("./delete/delete");
const patch = require("./patch/patch");
const list = require("./list/list");
const join = require("./join/join");
const query = require("../../../query");
module.exports = express.Router().get("/", function (req,res) {
    res.send("404");
    res.end();
}).post("/",function (req,res) {

}).use("/add",add).use("/delete",remove).use("/list",list).use("/patch",patch).use("/join",join);
/*module.exports = express.Router().get("/", function (req,res) {
    res.render("./voteRender.ejs",{Name:"2017-10-20投票调试",
        GlobalAttribute:false,
        Questions:[{
            Attribute:"radio",
            Description:"你是不是高中生？",
            Options:["是","不是"]
        },{
            Attribute:"checkbox",
            Description:"你喜欢吃什么",
            Options:["土豆","洋芋","马铃薯"]
        },{
            Attribute:"checkbox",
            Description:"喜欢的科目",
            Options:["语文","数学","英语","物理","化学","生物","政治","历史","地理"]
        }]});
    res.end();
});*/