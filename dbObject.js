const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const Updates = sequelize.import('models/updates/Update');
const Lang = sequelize.import('models/Lang/Lang');
const Users = sequelize.import('models/User/User');

Updates.prototype.addUpdate = async function(current, desc, date){
    const update = await Updates.findOne({
        where:{
            date: current,
        },
    })
    if(updates) return;
    return Updates.create({date: current, desc: desc, update_date: date});
}

Lang.prototype.setLang = async function(user, lang){
    return Lang.create({user_id: user.id, lang: lang});
}

Lang.prototype.getLang = async function(user){
    const lang = await Lang.findOne({
        where:{
            user_id: user.id,
        },
    });
    if(!lang) return;
    return lang.lang;
}

Users.prototype.setLang = async function(user, status){
    const lang = await Users.update({lang: status}, {where:{user_id: user.id}});
    return lang;
}

Users.prototype.getLang = async function(user){
    const lang = await Users.findOne({where:{user_id: user.id}});
    return lang.lang;
}




module.exports = {Updates, Lang, Users};