const express = require("express");
const express_static = require("express-static");
const body_parser = require("body-parser");
const cookie_session = require("cookie-session");
const consolidate = require("consolidate");
const db = require("./query");
const server = express();
server.listen(8888);
//获取请求数据
/*var route_vote = express.Router().get("/", function (req,res) {
    res.render("./local/vote/voteRender.ejs",{"Name":"2017-10-20投票调试",
        "GlobalAttribute":false,
        "Questions":[{
            "Attribute":"radio",
            "Description":"你是不是高中生？",
            "Options":["是","不是"]
        },{
            "Attribute":"checkbox",
            "Description":"你喜欢吃什么",
            "Options":["土豆","洋芋","马铃薯"]
        },{
            "Attribute":"checkbox",
            "Description":"喜欢的科目",
            "Options":["语文","数学","英语","物理","化学","生物","政治","历史","地理"]
        }]});
    res.end();
});*/
server.set('trust proxy', 1);
server.use(body_parser.urlencoded({
    extended: true
}));
(function (){
    let keys=[];
    for(let i=0;i<10000;i++){
        keys[i]=Math.random().toString();
    }
    server.use(cookie_session({
        name: 'session',
        keys: keys,
        maxAge: 20*60*1000,  //20min
        saveUninitialized:false
    }));
})();
function create_router() {
    let l_admin = require("./routers/local/admin/admin");
    let l_control = require("./routers/local/control/control");
    let l_index = require("./routers/local/index");
    let l_login = require("./routers/local/login/login");
    let l_logout = require("./routers/local/logout/logout");
    let index = require("./routers/local/index");
    let l_vote = require("./routers/local/vote/vote");
    let l_home = require("./routers/local/home/home");
    return express.Router().use("/",l_control).use("/",index).use("/admin",l_admin).use("/index",l_index).use("/login",l_login).use("/logout",l_logout).use("/vote",l_vote).use("/home",l_home);
}
//模板
server.engine("html",consolidate.ejs);
server.set("views","./template");
server.set("view_engine","html");
//routers
server.use("/",create_router());
//default static
server.use(express_static("./static/"));