const Sequelize = require('sequelize');

const config = require('./dbconfig');

var sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});

var User = sequelize.define('user', {
    Name: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    Vote0: Sequelize.BOOLEAN,
    Vote1: Sequelize.BOOLEAN,
    Vote2: Sequelize.BOOLEAN,
    Vote3: Sequelize.BOOLEAN,
    Vote4: Sequelize.BOOLEAN,
    Vote5: Sequelize.BOOLEAN,
}, {
    timestamps: false
});

var now = Date.now();
User.sync();
function create (name,boolarr,success,fail) {
    User.create({
        Name: name,
        Vote0: boolarr[0],
        Vote1: boolarr[1],
        Vote2: boolarr[2],
        Vote3: boolarr[3],
        Vote4: boolarr[4],
        Vote5: boolarr[5]
    }).then(function (p) {
        console.log('created.' + JSON.stringify(p));
        success();
    }).catch(function (err) {
        console.log('failed: ' + err);
        fail(err);
    })
};
function search (name,success) {
    (async () => {
        var users = await User.findAll({
            where: {
                name: name
            }
        });
        success(users[0]);
    })();
};
function update (name,boolarr,success,fail) {
    (async () => {
        var users = await User.findAll({
            where: {
                name: name
            }
        });
        p=users[0];
        p.Vote0= boolarr[0];
        p.Vote1= boolarr[1];
        p.Vote2= boolarr[2];
        p.Vote3= boolarr[3];
        p.Vote4= boolarr[4];
        p.Vote5= boolarr[5];
        p.updatedAt = Date.now();
        await p.save();
    })();
};
module.exports = {Get:create,Post:create,Put:search};