const express = require("express");
const getUserObject = require("../../../../functions/checkSession");
const query = require("../../../../query");
module.exports= express.Router().get("/", function (req,res) {
    if(getUserObject(req.session).Authorization!=="admin"){
        res.redirect("../../../");
    }else{
        res.render("./local/vote/add/add.ejs");
        res.end();
    }
}).post("/",function (req,res) {
    query.insert("votes","object",req.body);
    res.redirect("../");
});