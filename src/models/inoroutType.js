//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('inoroutType', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  name: Sequelize.STRING(255),
  fuzeren: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  type: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  isCost: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
