const express = require("express");
module.exports = express.Router().use("/",function(req,res,next){
        if(!req.session.user&&req.url!=="/login"&&req.url!=="/admin/login"&&req.url!=="/"&&req.url!=="/logout"){
            if(req.url.substring(0, 6)==="/admin"){
                res.redirect("/admin/login");
            }else{
                res.redirect("/login");
            }
        }else{
            next();
        }
    });