const models = require('../models/depart');
//const superagent = require('superagent')
/*function Product(x) {
    this.data = x;
}*/


const Sequelize = require('sequelize');
var sequelize = new Sequelize('wms', 'test', '123456', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

module.exports = {
  //查询
  async searchById() {
    try {
      let sqlDataById, childDepartList
      sqlDataById = " select  distinct  a.id,a.dtype, a.parent_id, a.name, a.des, a.major, a.phone" +
        " from  depart a  " +
        " where a.isDelete = 0 and a.parent_id = '0' " +
        " ORDER BY a.id  ASC"
      var departMapList = await sequelize.query(sqlDataById, {
        // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
        type: sequelize.QueryTypes.SELECT
      })

      for (let x of departMapList) {
        childDepartList =  await this.searchByPid(x.id);
        x.children = childDepartList
      }
      return departMapList
    } catch (err) {
      console.log(err);
    }
  },

  //递归查询
  async searchByPid(id) {
    try {
      let sqlData, childDepartList
      sqlData = " select  distinct  a.id, a.dtype,a.parent_id, a.name, a.des, a.major, a.phone" +
        " from  depart a  " +
        " where a.isDelete = 0  and a.parent_id ='" + id + "' ORDER BY a.id  ASC"
      var departMapList = await sequelize.query(sqlData, {
        // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
        type: sequelize.QueryTypes.SELECT
      })
      for (let x of departMapList) {
        childDepartList = await this.searchByPid(x.id);
        x.children = childDepartList
      }
      return departMapList
    } catch (err) {
      console.log(err);
    }
  },
  //查询全部
  async searchAllId() {
    try {
      let sqlDataById, childDepartList
      sqlDataById = " select  distinct  a.id,a.dtype, a.parent_id, a.name, a.des, a.major, a.phone" +
        " from  depart a  " +
        " where a.isDelete = 0 " +
        " ORDER BY a.id  ASC"
      var departMapList = await sequelize.query(sqlDataById, {
        // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
        type: sequelize.QueryTypes.SELECT
      })

      return departMapList
    } catch (err) {
      console.log(err);
    }
  },
  createProduct(x) { //新增
    var p = x;
    console.log(p)
    async function getData() {
      await models.create(p); //写入数据库
    }
    getData();
    return p;
  },
  upProduct: (ids) => { //更新修改
    async function upData(obj) {
      var userName = obj;
      userName.updatedAt = Date.now();
      userName.version++;
      await models.update(userName, {
        where: {
          id: userName.id
        }
      });
    }
    upData(ids);
  },
  delProduct: (ids) => {
    async function delData(ids) {
      await models.destroy({
        where: {
          id: ids
        }
      });
    }
    delData(ids);
  }
};
