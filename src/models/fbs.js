//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('fbs', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  receipt: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATE(0),
    allowNull: false
  },
  dispatchDate: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
  weight: {
    type: Sequelize.BIGINT(11),
    allowNull: true
  },
  yewuyuan: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  itemstring: {
    type: Sequelize.STRING(2100),
    allowNull: false
  },
  state: {
    type: Sequelize.BIGINT(11),
    allowNull: false
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
