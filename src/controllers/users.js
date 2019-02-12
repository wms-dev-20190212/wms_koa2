const service = require('../service/users');
var Promise = require('promise');

const Sequelize = require('sequelize');
var sequelize = new Sequelize('wms', 'test', '123456', {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});
const jwt = require('jsonwebtoken');

const models = require('../models/users'); //引入数据模型，可自动生成对应数据库表 gyx.sync({force: true});
module.exports = {
  'GET /api/user/userList': async (ctx, next) => {
    await next();
    let sqlData
    sqlData = " select  distinct  a.id, a.userName, a.password" +
      " from  users a  " +
      " where a.isDelete = 0  " +
      " ORDER BY a.id  ASC limit 0,10000"
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
  'POST /api/user/add': async (ctx, next) => {
    await next();
    var userMsgData = ctx.request.body;
    console.log(userMsgData)
    var vilad = await models.findAndCountAll({
      where: {
        userName: userMsgData.userName
      }
    });
    console.log(vilad.count)
    if (vilad.count == 0) {
      userMsgData.isDelete = 0;
      userMsgData.sessionID = 0;
      userMsgData.logErrorNum = 0;
      userMsgData.lastLogErrorTime = Date.now();
      userMsgData.passwordUpdateDate = Date.now();
      userMsgData.timestamp = Date.now();
      mes = service.createProduct(userMsgData);
    } else {
      var mes = '用户名已存在！'
    }
    var users_sss = {
      mes: mes,
      code: 10000,
    }
    ctx.response.type = 'application/json';
    ctx.response.body = users_sss;
  },
  'POST /api/user/login': async (ctx, next) => {
    await next();
    var vilad = await models.findAndCountAll({
      where: {
        userName: ctx.request.body.userName
      },
      limit: 1
    });

    var mes, success, userdata,code
    if (vilad.count == 0) {
      mes = '未注册该用户！',
        success = false,
        code = 400
    } else {
      var vilad2 = await models.findAndCountAll({
        where: {
          '$and': [{
              userName: ctx.request.body.userName
            },
            {
              password: ctx.request.body.password
            }
          ]
        },
        limit: 1
      });
      // console.log(JSON.stringify(vilad2))
      if (vilad2.count >= 1) {
        const token = jwt.sign({
          name: ctx.request.body.userName,
          _id: ctx.request.body.password
        }, 'my_token', {
          expiresIn: '2h'
        });

        mes = '登录成功';
        success = true;
        userdata = vilad2;
        userdata['token'] = token;
        code = 200;
      } else {
        mes = '密码不正确，请重新输入！',
          success = false,
          code = 400
      }
    }
    var users_sss = {
      data: userdata,
      message: mes,
      code: code,
      success: success,
    }
    ctx.response.type = 'application/json';
    ctx.response.body = users_sss;
  },
  'PUT /api/user/edit': async (ctx, next) => {
    await next();
    // console.log(JSON.stringify('1'+JSON.stringify(ctx.params)))
    // console.log(JSON.stringify('2'+JSON.stringify(ctx.request.body)))
    let obj = {}
    obj.id = ctx.request.body.id
    obj.userName = ctx.request.body.userName
    obj.password = ctx.request.body.newPassword
    console.log(JSON.stringify(obj))
    // obj.userName = 'gyx'
    var vilad = await models.findAndCountAll({
      where: {
        '$and': [{
            id: ctx.request.body.id
          },
          {
            password: ctx.request.body.password
          }
        ]
      },
      limit: 1
    });
    console.log(vilad.count)
    var mes, success
    if (vilad.count >= 1) {
      await models.update(obj, {
        where: {
          id: ctx.request.body.id
        }
      });
      mes = '修改成功！'
      success = true
    } else {
      mes = '密码输入错误！'
      success = false
    }

    var dataObj = {
      message: mes,
      code: 200,
      success: success
    }
    ctx.body = dataObj;

  },

  'DELETE /api/user/:id': async (ctx, next) => {
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
