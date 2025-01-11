const router = require('koa-router')();
const multer = require('koa-multer');
// const { koaBody } = require('koa-body');
const fs = require('fs');
const { writeFileSync } = require('fs');
const path = require('path');
const { resolve } = require('path');
// router.prefix('/users')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, file.originalname.split('.')[0] + '.' + ext);
  },
});

const upload = multer({ storage: storage });

// 文件上传接口 (测试用)
router.post('/file', upload.single('file'), (ctx, next) => {
  try {
    let fileName = ctx.req.file.filename;
    let resData = {};
    resData.fileName = fileName;
    resData.filePath = '/uploads/' + fileName;
    resData.hostName = 'http://' + ctx.request.host;
    ctx.body = {
      code: 0,
      msg: '上传成功',
      data: resData,
    };
  } catch (e) {
    ctx.body = {
      code: 500,
      msg: '上传出错',
      data: e.toString(),
    };
  }
});

// base64 格式文件上传
router.post('/base64', upload.single('base64'), (ctx, next) => {
  const { file, ext, originalname } = ctx.request.body;
  console.log(123, originalname);
  const binaryData = Buffer.from(file, 'base64');
  try {
    writeFileSync(
      path.resolve(__dirname, `../public/uploads/${originalname}`),
      binaryData
    );

    ctx.body = {
      code: 0,
      filePath: 'http://' + ctx.request.host + '/uploads/' + originalname,
      msg: '上传成功',
    };
  } catch (err) {
    console.log(err);
  }
});

// 二进制上传

router.post('/binary', (ctx, next) => {
  const ext = ctx.req.headers['x-ext']; // 获取文件后缀名
  const fileName = ctx.req.headers['file-name'];
  // console.log(path.resolve(__dirname, `../public/uploads/${fileName}`));
  let params = [];
  ctx.req.on('data', (chunk) => {
    params.push(chunk);
  });
  ctx.req.on('end', (chunk) => {
    let buffer = Buffer.concat(params);
    fs.writeFileSync(
      path.resolve(__dirname, `../public/uploads/${fileName}`),
      buffer,
      'binary'
    );
  });
  ctx.body = {
    code: 200,
    data: {
      filePath: 'http://' + ctx.request.host + '/uploads/' + `${fileName}`,
    },
    msg: '上传成功',
  };
});

module.exports = router;
