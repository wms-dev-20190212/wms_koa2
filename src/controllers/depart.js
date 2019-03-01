const service = require('../service/depart');
const models = require('../models/depart'); //引入数据模型，可自动生成对应数据库表 gyx.sync({force: true});
const Promise = require('promise');


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

// function objToStrMap(obj) {
//   let strMap = new Map();
//   for (let k of Object.keys(obj)) {
//     strMap.set(k, obj[k]);
//   }
//     // console.log(JSON.stringify(strMap.get('id')));
//   return strMap;
// }

module.exports = {
  'GET /api/departAllList': async (ctx, next) => {
    await next();
    let loadData = await service.searchAllId();
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
  'GET /api/departList': async (ctx, next) => {
    await next();
    let loadData = await service.searchById();

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

  'POST /api/departList': async (ctx, next) => {
    try {
      await next();
      var vilad = service.createProduct(ctx.request.body);
      var data = {
        message: '添加成功',
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
  'PUT /api/departList': async (ctx, next) => {
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
  'DELETE /api/departList/:id': async (ctx, next) => {
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
