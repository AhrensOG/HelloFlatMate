const { Sequelize } = require('sequelize');
const config = require('./config/config');

const poolConfig = {
  max: 20,
  min: 2,
  acquire: 60000,
  idle: 10000,
};

let sequelize;
if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(`postgres://${config.production.username}:${config.production.password}@${config.production.host}:${config.production.port}/${config.production.database}`, {
    dialectModule: require('pg'),
    pool: poolConfig,
  });
} else {
  sequelize = new Sequelize(`postgres://${config.development.username}:${config.development.password}@${config.development.host}:${config.development.port}/${config.development.database}`, {
    dialectModule: require('pg'),
    logging: false,
    pool: poolConfig,
  });
}

const connection = sequelize;

module.exports = connection; 