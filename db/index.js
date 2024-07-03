const { Sequelize } = require('sequelize');
const config = require('./config/config');

let sequelize;
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(`postgres://${config.production.username}:${config.production.password}@${config.production.host}:${config.production.port}/${config.production.database}`, {
    dialectModule: require('pg')
  });
} else {
  sequelize = new Sequelize(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`, {
    dialectModule: require('pg'),
    logging: false,
  });
}

const connection = sequelize;

module.exports = connection; 