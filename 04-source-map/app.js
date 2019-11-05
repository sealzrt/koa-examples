const Koa = require('koa');
const path = require('path');
const fs = require('fs');

const resolve = file => path.resolve(__dirname, file);

const sourceMap = require('source-map');

const app = module.exports = new Koa();
const port = process.env.PORT || 3100;

app.use(async(ctx, next) => {
  ctx.status = 200;
  await next();
});

const resolveError = (fileName, line, columnNo) => {
  // const mapFile = `eleven.8e29a4de.chunk.js.map`;
  let smc = new sourceMap.SourceMapConsumer(fs.readFileSync(resolve('./' + fileName), 'utf8')); // 返回一个promise对象
  smc.then(function(result) {
    // 解析原始报错数据
    let data = result.originalPositionFor({
      line, // 压缩后的行号
      column: columnNo // 压缩后的列号
    });

    console.log(data);
  });
};

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}

app.use(async(ctx, next) => {
  if (ctx.url === '/user') {
    await delay(1000);
    // ctx.status = 404;

    // ctx.body = 'not found...';

    // ctx.type = 'json';

    // 解决问题
    // resolveError('eleven.8e29a4de.chunk.js.map', 1, 75609);

    ctx.body = {
      code: 'OK',
      name: 'admin'
    };

    // return;
  }
  await next();
});

// resolveError('main.7aafa554.chunk.js.map', 186, 32);
// resolveError('runtime.fd09ba02.js.map', 186, 32);
// resolveError('vendor.b306e50d.chunk.js.map', 186, 32);

if (!module.parent) {
  app.listen(port, function() {
    console.log(`项目已启动: http://localhost:${port}`);
  });
}
