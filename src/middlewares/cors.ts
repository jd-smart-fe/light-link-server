export default () => async (ctx, next) => {
  ctx.set({
    'Access-Control-Allow-Origin': ctx.request.header.origin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
  });
  await next();
};
