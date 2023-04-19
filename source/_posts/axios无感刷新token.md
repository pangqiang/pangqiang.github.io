## app.vue
```
<script setup>
import instance from './api/service.js'
import { onMounted, onBeforeMount, getCurrentInstance,ref } from 'vue';
const app = getCurrentInstance()



const txt = ref('')


const getData = () => {
  instance({
    method: 'post',
    url: 'http://localhost:3000/api/data',
  })
    .then(function (response) {
      txt.value = response.data.age
    });
}

</script>

<template>
  <div>
    <h1> {{ txt }}</h1>
    <el-button @click="getData()"> 请求数据 </el-button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>

```
##  axios service.js
```
import axios from 'axios';
const instance = axios.create({
  // 配置 axios 实例
});

const getToken = () => {
  return new Promise(resolve => {
    instance({
      method: 'post',
      url: 'http://localhost:3000/api/token',
    })
      .then(function (response) {
        resolve(response)
      });
  })
}

let csrfToken = null;
let isRefreshing = false;
let failedRequests = [];

instance.interceptors.request.use((config) => {
  // 在请求头中添加 CSRF token
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 如果响应状态码为 403，表示 CSRF token 失效了
    if (error.response && error.response.status === 403) {
      // 如果正在刷新 CSRF token，就将请求缓存起来
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        }).then((token) => {
          error.config.headers['X-CSRF-TOKEN'] = token;
          return instance(error.config);
        }).catch((err) => {
          return Promise.reject(err);
        });
      }

      isRefreshing = true;

      // 发起新的请求获取新的 CSRF token
      return new Promise((resolve, reject) => {
        instance.get('http://localhost:3000/api/token')
          .then((response) => {
            csrfToken = response.data.csrfToken;
            isRefreshing = false;
            // 重新发起之前缓存的请求
            failedRequests.forEach((request) => {
              request.resolve(csrfToken);
            });
            failedRequests = [];
            // 在请求头中添加新的 CSRF token，并重新发起请求
            error.config.headers['X-CSRF-TOKEN'] = csrfToken;
            resolve(instance(error.config));
          })
          .catch((err) => {
            isRefreshing = false;
            // 清空请求缓存
            failedRequests.forEach((request) => {
              request.reject(err);
            });
            failedRequests = [];
            reject(err);
          });
      });
    }
    return Promise.reject(error);
  }
);

export default instance;
```
## service.js
```

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
var cors = require('cors')
app.use(bodyParser.json());
app.use(cors())
let count = 0;

app.get('/api/token', (req, res) => {
  const data = {
    csrfToken: new Date().getTime()
  };
  setTimeout(()=>{
    res.json(data);
  },3000)
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function getRandomData(jsonFilePath) {
  const jsonData = JSON.parse(fs.readFileSync(jsonFilePath));
  const randomIndex = getRandomInt(0,jsonData.length);
  return jsonData[randomIndex];
}

// 示例用法

app.post('/api/data', (req, res) => {
  const randomData = getRandomData('data.json');
  count++

  if (count % 2 === 0 || count % 3 === 0) {
    res.sendStatus(403);
  } else {
    
    res.json(randomData || {'default':'true'}) ;
  }

});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```
