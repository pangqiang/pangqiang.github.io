---
title: NodeJS截取视频第一帧
date: 2025-01-16 00:07:00
tags: ['JS']
---
# NodeJS截取视频第一帧

```js
const express = require('express');
const app = express();
const multer = require('multer');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

// 设置ffmpeg的路径
ffmpeg.setFfmpegPath(ffmpegPath);

// 设置上传文件的存储位置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // 上传的文件存储在 uploads 目录中
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // 给上传的文件命名
  }
});

// 创建上传中间件
const upload = multer({ storage });

// 定义接口，使用upload中间件解析上传的文件
app.post('/upload', upload.single('video'), (req, res) => {
  // 获取上传的视频文件的路径
  const videoPath = req.file.path;

  // 调用FFmpeg的ffprobe命令获取视频信息
  ffmpeg.ffprobe(videoPath, (err, metadata) => {
    if (err) {
      console.error(err);
      return;
    }

    // 获取视频的第一帧
    const screenshotPath = './uploads/screenshot.jpg';
    ffmpeg(videoPath)
      .screenshots({
        count: 1,
        folder: './uploads',
        filename: 'screenshot-%i.jpg',
        size: metadata.streams[0].resolution,
      })
      .on('end', () => {
        console.log('截取第一帧成功');

        // 将视频文件路径和封面图路径返回给前端
        res.json({
          videoPath,
          screenshotPath
        });
      })
      .on('error', (err) => {
        console.error('截取第一帧失败：', err);
        res.status(500).json({
          message: '截取第一帧失败'
        });
      });
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('服务器已启动');
});

```
