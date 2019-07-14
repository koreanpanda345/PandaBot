const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password',{
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: "database.sqlite",
});

sequelize.import('models/updates/Update');
sequelize.import('models/Lang/Lang');
sequelize.import('models/User/User');

const force = process.argv.includes('--force') || process.argv.includes('-f');

sequelize.sync({force}).then(async() =>{
    console.log('Database synced');
    sequelize.close();
}).catch(console.error);