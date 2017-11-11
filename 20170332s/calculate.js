const sha = require("./functions/sha_256");
const Sequelize = require("sequelize");
const sequelize = new Sequelize('data', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        maxConnections: 500,
        minConnections: 100,
        maxIdleTime:10000
    }});
const refresh = true;
function ObjTOStr(obj) {
    if(typeof obj ==="string")
        return obj;
    else
        return JSON.stringify(obj);
}
function user_init () {
    return sequelize.define(
        'user',
        {
            'id': {
                'type': Sequelize.INTEGER,
                'allowNull': false,

                'autoIncrement':true,
                'primaryKey':true
            },
            'name': {
                'type': Sequelize.CHAR(16),
                'unique': true,
                'allowNull': false
            },
            'password': {
                'type': Sequelize.CHAR(64),
                'allowNull': false,
            },
            'votes':{
                'type': Sequelize.STRING,
                'allowNull':false,
                'defaultValue':'{}'
            }
        },{freezeTableName: true,timestamps: false}
    ).sync({force:refresh});
}
function admin_init () {
    return sequelize.define('admin',
        {
            'id': {
                'type': Sequelize.INTEGER,
                'allowNull': false,

                'autoIncrement':true,
                'primaryKey':true
            },
            'name': {
                'type': Sequelize.CHAR(16),
                'unique': true,
                'allowNull': false
            },
            'password': {
                'type': Sequelize.CHAR(64),
                'allowNull': false
            }
        },{freezeTableName: true,timestamps: false}
    ).sync({force:refresh});
    //init(admin);
}
function votes_init () {
    return sequelize.define('votes',
        {
            'id': {
                'type': Sequelize.INTEGER,
                'allowNull': false,
                'autoIncrement':true,
                'primaryKey':true
            },
            'object': {
                'type': Sequelize.TEXT,
                'unique': false,
                'allowNull': false
            }
        },{freezeTableName: true,timestamps: false}
    ).sync({force:refresh});
}
async function getUserModel() {
    await user_init();
    return await sequelize.model("user");
}
async function getAdminModel() {
    await admin_init();
    return await sequelize.model("admin");
}
async function getVotesModel() {
    await votes_init();
    return await sequelize.model("votes");
}
const obj = {
    username:["cjj","zjl","xyl","yzy","wzk"],
    password:["123456","123456","456789","789456","456123"]
};
async function Run() {
    let User = await getUserModel();
    let Admin = await getAdminModel();
    let Votes = await getVotesModel();
    for (let i=0;i<obj.username.length;i++){
        Admin.create({
            'name': obj.username[i],
            'password': sha(obj.username[i], obj.password[i])
        });
    }
    await User.create({
        'name': "cjj",
        'password': sha("cjj", "123456"),
        'votes':"{\"1\":{}}"
    });
    await Votes.create({
        "object":"{\"Name\":\"2017-10-20投票调试\",\"GlobalAttribute\":false,\"Questions\":[{\"Attribute\":\"radio\",\"Description\":\"你是不是高中生？\",\"Options\":[\"是\",\"不是\"]},{\"Attribute\":\"checkbox\",\"Description\":\"你喜欢吃什么\",\"Options\":[\"土豆\",\"洋芋\",\"马铃薯\"]},{\"Attribute\":\"checkbox\",\"Description\":\"喜欢的科目\",\"Options\":[\"语文\",\"数学\",\"英语\",\"物理\",\"化学\",\"生物\",\"政治\",\"历史\",\"地理\"]}]}\n"
    });
    await Votes.create({
        "object":"{\"Name\":\"2017-11-20投票调试\",\"GlobalAttribute\":false,\"Questions\":[{\"Attribute\":\"radio\",\"Description\":\"你是不是高中生？\",\"Options\":[\"是\",\"不是\"]},{\"Attribute\":\"checkbox\",\"Description\":\"你喜欢吃什么\",\"Options\":[\"土豆\",\"洋芋\",\"马铃薯\"]},{\"Attribute\":\"checkbox\",\"Description\":\"喜欢的科目\",\"Options\":[\"语文\",\"数学\",\"英语\",\"物理\",\"化学\",\"生物\",\"政治\",\"历史\",\"地理\"]}]}\n"
    });
    let data = await sequelize.model("votes").findAll({
        "where":{
            "id":"1"
        }
    });
    console.log(data);
}
Run();
