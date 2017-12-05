const Router = require('koa-router');
const router = Router();
const Section = require('../data/section');

router.get('/api/sections', (ctx, next) => {
  const mock = [{ "_id": "5a1e6703f6c03860bd8af7b2", "caption": "导航", "name": "navigation", "__v": 0, "update": "2017-11-29T07:51:31.846Z", "value": [{ "caption": "google", "link": "http://google.com" }, { "caption": "test1", "link": "t3" }], "isList": true, "fields": [{ "caption": "标题", "name": "caption", "type": "String", "value": "", "_id": "5a1e6703f6c03860bd8af7b4" }, { "caption": "链接", "name": "link", "type": "String", "value": "", "_id": "5a1e6703f6c03860bd8af7b3" }] }, { "_id": "5a1fb0d0074f5d55206d302f", "caption": "轮播图", "name": "slider", "__v": 0, "update": "2017-11-30T07:18:40.248Z", "value": [{ "src": "https://cdn.dribbble.com/users/11040/screenshots/718685/chatmicicon.png" }, { "src": "https://cdn.dribbble.com/users/485324/screenshots/1978611/_oncert_illustration.png" }, { "src": "https://cdn.dribbble.com/users/788099/screenshots/3547801/studio_recording_kit8-net.png" }], "isList": true, "fields": [{ "caption": "图片地址", "name": "src", "type": "String", "value": "", "_id": "5a1fb0d0074f5d55206d3030" }] }];
  return Section.find().then(docs => {
    console.info('section_docs', JSON.stringify(docs));
    return ctx.body = docs || mock;
  });
});
router.post('/api/sections', (ctx, next) => {
  const section = ctx.request.body;
  const { caption, name, isList, fields } = section;
  const new_section = Object.assign({}, { caption, name, isList, fields: [] });
  fields.length > 0 && fields.map((i) => {
    const field = {
      caption: section[`caption-${i}`],
      name: section[`name-${i}`],
      type: section[`type-${i}`],
      value: ''
    };
    new_section.fields.push(field);
  });

  return Section.create(new_section).then(section => {
    ctx.body = { message: 'ok' };
  });
});
router.patch('/api/section', (ctx, next) => {
  const section = ctx.request.body.section;
  return Section.findOneAndUpdate({ name: section.name }, { $set: { value: section.value } }).then(section => {
    return ctx.body = {};
  });
});
router.get('/dashboard/*', (ctx, next) => {
  return ctx.render('dashboard');
});
router.get('*', function (ctx, next) {
  return ctx.render('index');
});

module.exports = router;
