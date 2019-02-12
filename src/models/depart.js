//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('depart', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  name: Sequelize.STRING(255),
  des: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  major: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  phone: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
