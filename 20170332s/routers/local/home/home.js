const express = require("express");
const getUserObject = require("../../../functions/checkSession");
module.exports =express.Router().get("/", function (req,res) {
    res.render("./local/home/home.ejs",getUserObject(req.session));
    res.end();
});