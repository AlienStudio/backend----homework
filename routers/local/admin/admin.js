const express = require("express");
const login = require("./login/login");
module.exports =express.Router().get("/", function (req,res) {
    res.status(404);
    res.end();
}).use("/login",login);