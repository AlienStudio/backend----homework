const express = require("express");
const getUserObject = require("../../../../functions/checkSession");
const query = require("../../../../query");
const getVotes = require("../../../../functions/getVotes");
module.exports= express.Router().get("*", async function (req,res) {
    let url = req.url;
    if(getUserObject(req.session).Authorization!=="admin"){
        res.redirect("../../../");
    }else if(url==="/"){
            let data = await getVotes.getVotes();
            res.render("./local/vote/patch/patch.ejs",{"data":data});
            res.end();
    }else if(url.substring(1,url.length).indexOf("/")===-1){
        let requestUrl = url.substring(1,url.length);
        let data = await query.search("votes","id",requestUrl);
        if(data.length===0){
            res.render("./local/vote/patch/show_zero_patch.ejs");
            res.end();
        }else {
            for (let i = 0; i < data.length; i++) {
                if(data[i].dataValues.id==requestUrl){
                    res.render("./local/vote/patch/show_single_patch.ejs",data[i].dataValues);
                    res.end();
                    return;
                }
            }
                res.render("./local/vote/patch/show_zero_patch.ejs");
                res.end();
        }
    }else{
        res.write("404");
        res.end();
    }

}).post("/",async function (req,res) {
    if(req.body.value!==null&&req.body.value!==undefined){
        let data = await query.search("votes","id",req.body.value);
        if(data.length===0){

        }else{
            data[0].object=req.body.object;
            data[0].save();
        }
        res.redirect("../");
    }

});