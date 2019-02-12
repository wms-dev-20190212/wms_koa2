const Sequelize = require('sequelize');
const config = require('./settings');
const uuid = require('node-uuid');

function generateId() {
    return uuid.v4();
}

var sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 30000
  }
});

const ID_TYPE = Sequelize.STRING(50);
var id = 0;

module.exports = function defineModel(name, attributes) {
  var attrs = {};
  for (let key in attributes) {
    let value = attributes[key];
    if (typeof value === 'object' && value['type']) {
      value.allowNull = value.allowNull || false;
      attrs[key] = value;
    } else {
      attrs[key] = {
        type: value,
        allowNull: false
      };
    }
  }
  attrs.id = {
    type: ID_TYPE,
    primaryKey: true
  };
  // attrs.id = {
  //      type: Sequelize.INTEGER,
  //      autoIncrement: true,
  //      primaryKey: true
  //  };
  attrs.isDelete = {
    type: Sequelize.BIGINT,
    allowNull: true
  };
  attrs.createdAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.updatedAt = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  attrs.version = {
    type: Sequelize.BIGINT,
    allowNull: false
  };
  var gyx = sequelize.define(name, attrs, {
    tableName: name,
    timestamps: false,
    hooks: {
      beforeValidate: function(obj) {
        let now = Date.now();
        if (obj.isNewRecord) {
          if (!obj.id) {
            obj.id = generateId();
          }
          obj.isDelete = 0;
          obj.createdAt = Date.now();
          obj.updatedAt = Date.now();
          obj.version = 0;
        } else {
          obj.updatedAt = Date.now();
          obj.version++;
        }
      }
    }
  });
  // gyx.sync({force: true});  //自动生成对应的表
  return gyx
}
