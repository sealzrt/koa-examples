const Koa = require('koa');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const path = require('path');

const app = module.exports = new Koa();

const port = process.env.PORT || 3100;

app.use(cors({
  credentials: true,
  allowHeaders: ['x-user-token', 'x-wechat-token']
}));

//
/**
 * 配置静态资源
 * http://localhost:3100/audio/001.mp3
 * http://localhost:3100/audio/002.mp3
 * http://localhost:3100/audio/003.mp3
 * http://localhost:3100/111.jpg
 *
 * @type {string}
 */
const staticPath = './static';
app.use(koaStatic(
  path.join(__dirname, staticPath)
));

console.log(process.cwd());

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
    await delay(5000);
    // ctx.status = 404;

    // ctx.body = 'not found...';

    // ctx.type = 'json';
    // ctx.body = {
    //   code: 'OK',
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
