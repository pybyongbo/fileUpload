const express = require('express');

const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split('.').pop();
    cb(null, Date.now() + '.' + ext);
  },
});

const upload = multer({ storage: storage });

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, x-ext');
  next();
});

// 普通文件上传 (form-data) 单文件上传  (multipart/form-data)
app.post('/file', upload.single('file'), (req, res) => {
  if (req.file) {
    res.send('ok');
  } else {
    res.send('error');
  }
});

// application => app
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
