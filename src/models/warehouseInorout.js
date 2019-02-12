//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('warehouseInorout', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  date: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
  yewuyuan: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  type: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  company: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  warehouse: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  remark: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
