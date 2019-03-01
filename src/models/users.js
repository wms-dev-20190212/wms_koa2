//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('users', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  code: {
    type: Sequelize.BIGINT(11),
    allowNull: true
  },
  userName: Sequelize.STRING(255),
  password: Sequelize.STRING(255),
  address: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  iphoneNum: {
    type: Sequelize.BIGINT(11),
    allowNull: true
  },
  shopName: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  depart: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  sessionID: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  logErrorNum: {
    type: Sequelize.BIGINT(11),
    allowNull: true
  },
  lastLogErrorTime: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
  passwordUpdateDate: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
