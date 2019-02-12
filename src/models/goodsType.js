//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('goodsType', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  name: Sequelize.STRING(255),
  lowerclass: {
    type: Sequelize.STRING(50),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
