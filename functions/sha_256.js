const crypto = require("crypto");
const seedrandom = require("seedrandom");
module.exports=function  (user_name,password) {
    let obj = crypto.createHash("sha256");
    obj.update(password);
    let rand = seedrandom(user_name);
    return obj.update(password+rand.int32().toString()).digest("hex");
};