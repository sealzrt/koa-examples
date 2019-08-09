const Koa = require('koa');
const cors = require('@koa/cors');

const app = module.exports = new Koa();

const port = process.env.PORT || 3100;

app.use(cors({
  credentials: true,
  allowHeaders: ['x-user-token', 'x-wechat-token']
}));

app.use(async(ctx, next) => {
  ctx.status = 200;
  await next();
});

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

app.use(async(ctx, next) => {
  if (ctx.url === '/user') {
    await delay(8000);
    ctx.status = 404;
    ctx.body = 'not found...';
    // ctx.type = 'json';
    // ctx.body = {
    //   id: 123,
    //   name: 'admin'
    // };
    // return;
  }
  await next();
});

if (!module.parent) {
  app.listen(port, function() {
    console.log(`项目已启动: http://localhost:${port}`);
  });
}
