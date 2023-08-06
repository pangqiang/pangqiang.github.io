---
title: NodeJS简易上传接口
date: 2023-04-22 22:49:42
tags: NodeJS
---

``` JS
const express = require('express');
const multer = require('multer');
const app = express();
const cors = require('cors')

// 设置上传文件的存储位置和文件名
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

app.use(cors())
// 创建multer中间件
const upload = multer({storage: storage});

// 处理文件上传请求
app.post('/upload', upload.single('file'), function(req, res, next) {
  console.log(req)
  // 文件上传成功后，返回文件的URL地址
  // 该处没有判断文件夹是否存在的逻辑，因此上传之前需在项目根目录下创建一个uploads文件夹
  res.json({path: '/uploads/' + req.file.filename});
});
app.get('/', function(req, res, next) {
  res.send('<h1>服务运行中</h1>')
  next()
});

// 启动服务器
app.listen(3001, function() {
  console.log('Server is listening on port 3001');
});


// 配置静态文件目录
 app.use('/uploads', express.static(__dirname + '/uploads'));
```
