const Sequelize = require('sequelize');

const dbConfig = {
    host: 'localhost',
    username: 'root',
    password: 'hoang1901',
    database: 'web_programming',
    dialect: 'mysql',
    pool:{
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
}


const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  });



module.exports = sequelize;