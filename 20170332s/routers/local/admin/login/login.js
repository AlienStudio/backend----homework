const express = require("express");
const query = require("../../../../query");
const sha=require("../../../../functions/sha_256");
module.exports= express.Router().get("/", function (req,res) {
    res.render("./local/admin/login.ejs");
    res.end();
}).post("/",function (req,res) {
    (async ()=>{
        let data = await query.search("admin","name",req.body.username);
        if(data===null||data===undefined||data.length===0||data[0].dataValues.password!==sha(req.body.username,req.body.password||data[0].dataValues.password!==sha(req.body.username,req.body.password).toString())){
            res.send("用户名或密码错误");
            res.end();
        }else{
            req.session.user={
                ID:data[0].dataValues.ID,
                Username:data[0].dataValues.name,
                Authorization:"admin"
            };
            res.redirect("../../")
        }
    })();
});