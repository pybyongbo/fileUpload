// 中间件检查是否登录

async function intercept(ctx, next) {
  let { res, req } = ctx;
  // const blacklist = [
  //   '127.0.0.1',
  //   '192.168.1.2'
  // ]
  const token = getToken();
  // console.log(666, !token);
  if (!token) {
    ctx.body = '您无权限访问';
    // 如果不执行next，就无法进入到下一个中间件
  } else {
    await next();
  }
}

// 获取当前IP
function getToken() {
  let token = '123';
  console.log('当前token是', token);
  return token;
}

module.exports = intercept;
