//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('inoroutRecord', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  item: {
    type: Sequelize.STRING(4),
    allowNull: true
  },
  num: {
    type: Sequelize.STRING(4),
    allowNull: true
  },
  price: {
    type: Sequelize.FLOAT(8),
    allowNull: true
  },
  receipt: {
    type: Sequelize.STRING(8),
    allowNull: true
  },
  type: {
    type: Sequelize.STRING(4),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
