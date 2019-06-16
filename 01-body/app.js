const Koa = require('koa');

const app = module.exports = new Koa();

const port = process.env.PORT || 3000;

app.use(async(ctx, next) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    ctx.set('Content-Type', 'text/html;charset=utf8');
    // ctx.type = 'text/html;charset=utf8';
    ctx.body = (
      `
      <form method="post" action="/user">
        <input type="text" name="username" />
        <input type="submit" />
      </form>
      `
    );
    return;
  }
  await next();
});

app.use(async(ctx, next) => {
  if (ctx.url === '/user' && ctx.method === 'POST') {
    await new Promise((resolve) => {
      let buffers = [];
      ctx.req.on('data', function(data) {
        buffers.push(data);
      });
      ctx.req.on('end', function() {
        let result = Buffer.concat(buffers);
        console.log(result.toString());
        ctx.body = result.toString();
        // 更改promise状态
        resolve();
      });
    });

    return;
  }
  await next();
});

if (!module.parent) {
  app.listen(port, function() {
    console.log(`项目已启动: http://localhost:${port}`);
  });
}
