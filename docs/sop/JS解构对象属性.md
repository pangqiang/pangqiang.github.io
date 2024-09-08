---
title: JS解构对象属性
date: 2024-09-08 18:42:20
tags: ['JS技巧']
---
### JS解构对象属性

我们有一个```formData```对象传递给后台,但是后端不需要```email```字段
```
const formData = {
  name: 'cool',
  age: '18'
  email: 'xxx@xx.com'
}
```
通过我们会重新定义个一个变量，从```formDate```取值，比如
```
const query = {
  name: formDate.name,
  age: formDate.age
  email: formDate.email
}
```
使用**解构属性**和**剩余参数**，将email之外的其他参数用data接收
```
const { email, ...data } = formData
```
或者
```
const { ...data } = formData
delete data.email
```
