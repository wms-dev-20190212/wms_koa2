//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('company', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  name: Sequelize.STRING(255),
  type: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING(10),
    allowNull: true
  },
  fax: {
    type: Sequelize.STRING(12),
    allowNull: true
  },
  email: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  bank: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  bankaccount: {
    type: Sequelize.STRING(20),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
