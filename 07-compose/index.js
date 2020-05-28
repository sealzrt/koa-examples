const middleware = [];

middleware.push(async(context, next) => {
  context.time = Date.now();
  await next();
});

middleware.push(async(context, next) => {
  context.random = Math.random();
  await next();
  // await next();
});

const context = {};

const compose = (middleware) => {
  return (context, next) => {

    let lastIndex = -1;

    function dispatch(index) {
      if (index <= lastIndex) {
        throw new Error('next() called multiple times');
      }
      lastIndex = index;
      let fn = middleware[index] || next;
      if (!fn) {
        return Promise.resolve();
      }
      return Promise.resolve(fn(context, dispatch.bind(null, index + 1)));
    };

    return dispatch(0);
  };
};

compose(middleware)(context).then(() => {
  console.log('context', context);
});
