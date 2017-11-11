const express = require("express");
const getUserObject = require("../../../../functions/checkSession");
const query = require("../../../../query");
const getVotes = require("../../../../functions/getVotes");
module.exports= express.Router().get("*", async function (req,res) {
    let url = req.url;
    if(getUserObject(req.session).Authorization==="admin"){
        res.redirect("../../../");
    }else if(url==="/"){
        res.redirect("../../");
    }else if(url.substring(1,url.length).indexOf("/")===-1){
        let requestUrl = url.substring(1,url.length);
        let data = await query.search("votes","id",Number(requestUrl));
        if(data.length===0){
            res.render("./local/vote/join/show_zero_vote.ejs");
            res.end();
        }else {
            let rend = JSON.parse(data[0].dataValues.object);
            rend ["id"]= data[0].dataValues.id;
            res.render("./local/vote/join/voteRender.ejs",rend);
            res.end();
        }
    }else{
        res.write("404");
        res.end();
    }

}).post("/",async function (req,res) {
    console.log(req.body);
    if(req.body!==null&&req.body!==undefined){
        let data = await query.search("user","id",getUserObject(req.session).ID);
        if(data.length===0){
        }else{
            let votes = req.body;
            let id = votes.voteID;
            delete votes["voteID"];
            let obj_c = JSON.parse(data[0].votes);
            delete obj_c[id];
            obj_c[id]=votes;
            data[0].votes = JSON.stringify(obj_c);
            await data[0].save();
        }
        res.redirect("../");
    }

});