const service = require('../service/goods');
const models = require('../models/goods'); //引入数据模型，可自动生成对应数据库表 gyx.sync({force: true});
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
  'GET /api/goodsList': async (ctx, next) => {
    await next();
    let sqlData
    let offset = GetUrlParam(ctx.url, "offset") || 0;
    let limit = GetUrlParam(ctx.url, "limit") || 20;
    let tabId
    // if(GetUrlParam(ctx.url, "tabId")){
    //    tabId = " and a.tabId = '" + GetUrlParam(ctx.url, "tabId").toString()+ "'  and a.tabId = b.id";
    // }else{
    //    tabId = ' and a.tabId = b.id';
    // }

    sqlData = " select  distinct  a.id, a.maintype, a.subtype, a.name, a.encode, a.barcode, a.size, a.unit, a.upperlimit, a.lowerlimit, a.inprice, a.outprice, a.pic, a.content,b.name as goodsType,b.lowerclass as lowerclass" +
      " from  goods a , goodsType b" +
      " where a.isDelete = 0 "+
      " ORDER BY a.id  ASC limit "+offset+","+limit
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

  'POST /api/goodsList': async (ctx, next) => {
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
  'PUT /api/goodsList': async (ctx, next) => {
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

  'PUT /api/addStar': async (ctx, next) => {
    try {
      await next();
      let mes
      ctx.request.body.star == 1 ? mes = '推荐成功' :  mes = '取消推荐'
      var vilad = service.upProduct(ctx.request.body);
      var data = {
        message: mes,
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
  'DELETE /api/goodsList/:id': async (ctx, next) => {
    try {
      await next();
      var vilad = service.delProduct(ctx.params.id);
      var data = {
        message: '删除成功',
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
