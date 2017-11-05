const express = require("express");
module.exports=express.Router().use(function (req,res) {
    req.session = null;
    res.redirect("../");
});