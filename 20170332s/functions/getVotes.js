const query = require("../query");
const getUserObject = require("../functions/checkSession");
async function getVotes() {
    let data = await query.search("votes");
    let result = {};
    for(let i =0;i<data.length;i++){
        result[JSON.parse(data[i].dataValues.id)]=JSON.parse(data[i].dataValues.object).Name;
    }
    return result;
}
async function getUserVotes(session) {
    let id = getUserObject(session).ID;
    let data = await query.search("user","id",id);
    let data_c = data[0].dataValues.votes;
    let result = await getVotes();
    if(data_c==="{}"){
        return result;
    }else{
        let objData = JSON.parse(data_c);
        for(let i in objData){
            delete result[i];
        }
        return result;
    }

}
module.exports = {
    getVotes:getVotes,
    getUserVotes:getUserVotes
};