const router = require('koa-router')();

const text = `
  <h1>两只老虎爱跳舞</h1>

  <p>小兔子乖乖拔萝卜</p>

  <p>我和小鸭子学走路</p>

  <p>童年时最美的礼物;</p>
`;

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
  });
});

// 测试接口 (HTTP响应学习)
router.get('/sourc/file.txt', async (ctx, next) => {
  ctx.set('Content-Type', 'text/plain;charset=utf-8');
  ctx.body = text;
});

router.get('/sourc/file.html', async (ctx, next) => {
  ctx.set('Content-Type', 'text/html;charset=utf-8');
  ctx.body = text;
});

router.get('/sourc/file.png', async (ctx, next) => {
  ctx.set('Content-Type', 'image/png');
  ctx.body = text;
});

// 触发浏览器下载行为
router.get('/d/file.txt', async (ctx, next) => {
  ctx.set('Content-Type', 'text/plain;charset=utf-8');
  // 这是一个附件,触发下载行为
  ctx.set('Content-Disposition', 'attachment; filename="file.txt"');
  ctx.body = text;
});

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json',
  };
});

module.exports = router;
