const path = require('path');
const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let subscribers = {};

router.get('/subscribe', async (ctx, next) => {
  ctx.req.on('close', () => {
    delete subscribers[id];
  });

  const id = Math.random();
  const message = await new Promise((resolve) => {
    subscribers[id] = resolve;
  });

  ctx.response.body = message;
});

const publishBodyValidation = (ctx, next) => {
  if (!ctx.request.body.message) {
    ctx.response.status = 400;
    ctx.response.body = 'message field is required';
  } else {
    next();
  }
};

router.post('/publish', publishBodyValidation, async (ctx, next) => {
  const {message} = ctx.request.body;

  Object.values(subscribers).forEach((resolveSubscriber) => {
    resolveSubscriber(message);
  });

  subscribers = {};
  ctx.response.status = 201;
});

app.use(router.routes());

module.exports = app;
