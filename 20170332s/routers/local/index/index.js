const getUserObject = require("../../../functions/checkSession");
const express = require("express");
module.exports = express.Router().get("/", function (req,res) {
        res.render("./local/index.ejs",getUserObject(req.session));
        res.end();
    });