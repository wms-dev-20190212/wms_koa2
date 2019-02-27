const service = require('../service/warehouseInorout');
const models = require('../models/warehouseInorout'); //引入数据模型，可自动生成对应数据库表 gyx.sync({force: true});
const Promise = require('promise');

const Sequelize = require('sequelize');
var sequelize = new Sequelize('wms', 'test', '123456', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

function GetUrlParam(url, paraName) {
  var arrObj = url.split("?");

  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split("&");
    var arr;

    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split("=");

      if (arr != null && arr[0] == paraName) {
        return arr[1];
      }
    }
    return "";
  } else {
    return "";
  }
}

module.exports = {
  'GET /api/warehouseInoroutList': async (ctx, next) => {
    await next();
    let sqlData
    sqlData = " select  distinct a.id,a.itemstring,a.receipt, a.orderDate, a.company, a.warehouse,  a.yewuyuan,a.type, b.name as companyName ,c.name as warehouseName,d.name as inoroutType,e.userName as userName, a.remark" +
      " from  warehouseInorout a , company b ,warehouse c ,inoroutType d,users e" +
      " where a.isDelete = 0 and a.company = b.id and a.warehouse = c.id and a.type = d.id and a.yewuyuan = e.id " +
      " ORDER BY a.id  ASC"
    var loadData = await sequelize.query(sqlData, {
      // replacements: [collectionListtotle.rows[getmax].createdAt, collectionListtotle.rows[getmix].createdAt], //按顺序传入需要替换？的值
      type: sequelize.QueryTypes.SELECT
    })

    var obj = {
      message: '加载成功',
      code: 200,
      success: true,
      data: {
        list: loadData,
        totle: loadData.length
      }

    }
    ctx.response.type = 'application/json';
    ctx.response.body = obj;
  },

  'POST /api/warehouseInoroutList': async (ctx, next) => {
    try {
      await next();
      var vilad = service.createProduct(ctx.request.body);
      var data = {
        message: '请求成功',
        code: 200,
        success: true,
        data: vilad
      }
      ctx.response.type = 'application/json';
      ctx.response.body = data;
    } catch (err) {
      console.log(err)
      ctx.response.code = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message
      };
    }
  },
  'PUT /api/warehouseInoroutList': async (ctx, next) => {
    try {
      await next();
      var vilad = service.upProduct(ctx.request.body);
      var data = {
        message: '更新成功',
        code: 200,
        success: true,
        data: vilad
      }
      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.response.code = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message
      };
    }
  },
  'DELETE /api/warehouseInoroutList/:id': async (ctx, next) => {
    try {
      await next();
      var vilad = service.delProduct(ctx.params.id);
      var data = {
        mes: '删除成功',
        code: 200,
        success: true,
        data: vilad
      }
      ctx.body = data;
    } catch (err) {
      console.log(err)
      ctx.response.code = err.statusCode || err.status || 500;
      ctx.response.body = {
        message: err.message
      };
    }

  },
};
