const Koa = require('koa')
const koajwt = require('koa-jwt');
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
// const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body');
const logger = require('koa-logger')
var cors = require('koa-cors');
var debug = require('debug')('demo:server');
var http = require('http');
const serve = require('koa-static');
const path = require('path')
app.use(serve(__dirname + '/upload/'));
// app.use(require('koa-static')(__dirname + '/webapps/vue'))
/*const index = require('./routes/index')*/
// 导入controller middleware:
const controller = require('./controller');
const response_formatter = require('./rest');
// 使用middleware:
app.use(controller()); //自动扫描利用koa-router 循环API

//添加格式化处理响应结果的中间件，在添加路由之前调用
//仅对/api开头的url进行格式化处理
app.use(response_formatter('^/api'));

app.use(cors({
  origin: function(ctx) {
    if (ctx.url === '/api') {
      return "*"; // 允许来自所有域名请求
    }
    return 'http://localhost:9998'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}))

//middlewares

app.use(koaBody({
  multipart: true, // 支持文件上传
  encoding: 'utf-8',
  strict: false,
  formidable: {
    uploadDir: path.join(process.cwd(), '../pic/'), // 设置文件上传目录
    keepExtensions: true, // 保持文件的后缀
    maxFieldsSize: 2 * 1024 * 1024, // 文件上传大小
    onFileBegin: (name, file) => { // 文件上传前的设置
      console.log(`name: ${name}`);
      console.log(file);
    },
  }
}));


app.use(json())
app.use(logger())
/**
 * 错误捕捉中间件
 */
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      //   // ctx.status = 401;
      //   // ctx.body = 'Protected resource, use Authorization header to get access\n';
      console.log(err)
      ctx.throw(err.status, '无权限');

      // var obj = {
      //   message: err.message,
      //   code: err.status,
      //   success: false,
      // }
      // ctx.response.body = obj;
      // ctx.app.emit('error',err, ctx);

    } else {
      throw err;
    }

    // // 手动释放 error 事件
  }
});

// 继续触发error事件
// app.on('error',(err, ctx) => {
//     console.error('server error', err.message);
//     console.error(err);
// });
// app.use(koajwt({
//   secret: 'my_token'
// }).unless({
//   path: [/\/api\/user\/register/, /\/api\/user\/login/]
// }));





//app.use(views(__dirname + '/views', {
//  extension: 'pug'
//}))

// logger
/*app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
*/

// routes
/*app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())*/

/*app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} ${ctx.request.url}`); // 打印URL
    await next(); // 调用下一个middleware
});
*/


/*app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms}ms`); // 打印耗费时间
});
*/
/*app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});

*/


var port = normalizePort(process.env.PORT || '1433');
// app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */
console.log('端口号：' + port)
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ?
    'Pipe ' + port :
    'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ?
    'pipe ' + addr :
    'port ' + addr.port;
  debug('Listening on ' + bind);
}
