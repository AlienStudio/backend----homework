const express = require("express");
const getUserObject = require("../../../../functions/checkSession");
const query = require("../../../../query");
async function getVotes() {
    let data = await query.search("votes");
    let result = {};
    for(let i =0;i<data.length;i++){
        result[JSON.parse(data[i].dataValues.id)]=JSON.parse(data[i].dataValues.object).Name;
    }
    return result;
}
module.exports= express.Router().get("/",async function (req,res) {
    if(getUserObject(req.session).Authorization!=="admin"){
        res.redirect("../../../");
    }else{
        let data = await getVotes();
        res.render("./local/vote/delete/delete.ejs",{"data":data});
        res.end();
    }
}).post("*",async function (req,res) {
    if(req.body.value!==undefined&&req.body.value!==null){
        await query.delete("votes","id",req.body.value);
        let data = await query.search("user");
        for(let i of data){
            let votes = JSON.parse(i.votes);
            delete votes[req.body.value];
            let votes_str = JSON.stringify(votes);
            i.votes=votes_str;
            await i.save();
        }
    }
    res.redirect("../");
});