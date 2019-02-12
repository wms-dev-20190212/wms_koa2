//var databaseJson = require('./petsData');
const Sequelize = require('sequelize');
const dbConfig = require('../config/db');
var dbForm = dbConfig('goods', {
  id: {
    type: Sequelize.STRING(50),
    primaryKey: true
  },
  isDelete: Sequelize.BIGINT(11),
  maintype: Sequelize.STRING(20),
  subtype: Sequelize.STRING(20),
  name: Sequelize.STRING(20),
  encode: Sequelize.STRING(20),
  barcode: Sequelize.STRING(20),
  size: Sequelize.STRING(20),
  unit: Sequelize.STRING(20),
  upperlimit: Sequelize.BIGINT(4),
  lowerlimit: Sequelize.BIGINT(4),
  inprice: Sequelize.BIGINT(4),
  outprice: Sequelize.BIGINT(4),
  pic: Sequelize.STRING(200),
  content: Sequelize.STRING(200),
  timestamp: {
    type: Sequelize.DATE(0),
    allowNull: true
  },
});

module.exports = dbForm;
