const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const cors = require('koa2-cors');
// const { koaBody } = require('koa-body');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const static = require('koa-static');
const intercept = require('./middleware/checkLogin');
const path = require('path');
const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);
// 中间件检查是否登录
app.use(intercept);
app.use(cors());
// middlewares
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
);

app.use(json());
app.use(logger());
app.use(require('koa-static')(path.join(__dirname, '/public')));

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
);

// 设置跨域
// 跨域配置:
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Origin, x-ext');
  await next();
});

// app.use(
//   koaBody({
//     multipart: true,
//     formidable: {
//       //一般这里使用绝对路径
//       uploadDir: path.join(__dirname, '/public/uploads/'),
//       //是否保留文件扩展名
//       keepExtensions: true,
//     },
//   })
// );
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
