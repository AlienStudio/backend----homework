/*const express = require("express");
const getUserObject = require("../../../../functions/checkSession");
const getVotes = require("../../../../functions/getVotes");
module.exports= express.Router().get("/",async function (req,res) {
    if(getUserObject(req.session).Authorization==="admin"){
        res.redirect("../../../");
    }else{
        let data = await getVotes.getUserVotes(req.session);
        res.render("./local/vote/list/list.ejs",{"data":data});
        res.end();
    }
}).post("/",function (req,res) {
    if(req.body.value!==undefined&&req.body.value!==null){
        res.redirect("./join"+req.body.value);
    }
});*/