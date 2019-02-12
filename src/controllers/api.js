//调用第三方接口
const fs = require('fs');
const path = require('path');
var Promise = require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise);
var baseUrl = 'http://77g1mh.com1.z0.glb.clouddn.com/';
//七牛云
const qiniu = require('qiniu')
const crypto = require('crypto')
//const APIError = require('../rest').APIError;
//// mock假数据
// let mockdata = require('./mockdata.json')
// let restaurants = require('./restaurants.json')
// let hot = require('./hot.json')
// let group = require('./group.json')


// const products = require('../service/index'); //引入服务层
module.exports = {
  'GET /api/user': async (ctx, next) => {
    // await next();
    // var userName = await pets.findAll({
    //     where: {
    //         userName: ''
    //     }
    // });
    var users_sss = {
      mes: '111',
      code: 1,
      data: 'userName'
    }
    ctx.response.type = 'application/json';
    ctx.response.body = users_sss;
  },
  'POST /api/file/upload': async (ctx, next) => {
    await next();
    // 上传多个文件
    const files = ctx.request.files.file; // 获取上传文件
    // for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(files.path);
    // 获取上传文件扩展名
    let filePath = path.join(process.cwd(), '../pic/') + `${files.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // }ctx.req
    var users_sss = {
      message: ctx.response.message,
      code: ctx.response.status,
      data: {
        fileName: files.name,
        savePath: 'pic/'+files.name
      }

    }
    ctx.response.type = 'application/json';
    ctx.response.body = users_sss;

  },
  // 'POST /api/addtoo': async (ctx, next) => {
  //   await next();
  //   var p = products.createProduct(ctx.request.body);
  //   var users_sss = {
  //     mes: '111',
  //     code: 1,
  //     data: p
  //   }
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = users_sss;
  // },
  // 'PUT /api/user/:id': async (ctx, next) => {
  //   products.upProduct(ctx.params.id);
  //   var users_sss = {
  //     mes: '更新成功'
  //   }
  //   ctx.body = users_sss;
  //
  // },
  // 'DELETE /api/user/:id': async (ctx, next) => {
  //   products.delProduct(ctx.params.id);
  //   var users_sss = {
  //     mes: '删除成功',
  //     code: 10000
  //   }
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = users_sss;
  // },
  // 'GET /api/friends': async (ctx, next) => {
  //   await next();
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = mockdata.friend;
  // },
  //
  // 'GET /api/self': async (ctx, next) => {
  //   await next();
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = mockdata.self;
  // },
  //
  // 'GET /api/weather': async (ctx, next) => {
  //   await next();
  //   let city = '北京';
  //   var obj = {
  //     city: city
  //   }
  //   var weatherData = await agent.get('http://www.sojson.com/open/api/weather/json.shtml', obj)
  //     .end()
  //     .then(function(res) {
  //       return new Promise(function(resolve, reject) {
  //         return resolve(res.body);
  //       });
  //     })
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = weatherData;
  //
  // },

  // 'GET /api/restaurants': async (ctx, next) => {
  //   await next();
  //   ctx.response.type = 'application/json';
  //   ctx.response.body = restaurants;
  // },
  //
  // 'GET /api/cities': async (ctx, next) => {
  //   await next();
  //   console.log(ctx.query)
  //   ctx.response.type = 'application/json';
  //   if (ctx.query.type == 'hot') {
  //     ctx.response.body = hot;
  //   } else {
  //     ctx.response.body = group;
  //
  //   }
  // },

  'GET /api/robotapi': async (ctx, next) => {
    await next();
    let response = ctx.response
    let info = ctx.request.query.message
    let userid = ctx.request.query.id
    let key = 'f0ed6a928cc04b8db7335a7a412d1a2a'
    var obj = {
      info,
      userid,
      key
    }
    var robotapi = await agent.post('http://www.tuling123.com/openapi/api', obj)
      .end()
      .then(function(res) {
        return new Promise(function(resolve, reject) {
          return resolve(res.text);
        });
      })
    var robotData = {
      data: robotapi,
    }
    response.type = 'application/json';
    response.body = robotData;

  }
};
