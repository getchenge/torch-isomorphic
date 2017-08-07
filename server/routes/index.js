const Router = require('koa-router');
const router = Router();
router.get('/', function (ctx, next) {
  // return ctx.body = 'Hello World';
  return ctx.render('index');
});
module.exports = router;
