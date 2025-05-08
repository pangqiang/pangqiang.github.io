---
sidebar: false
hidden: true
title: 前端基础
# 首页部分元素定制
---
# 面试复盘
## 2025/05/28

### 1. 字符串为什么可以直接使用`length`属性？

在 JavaScript 里，字符串是原始值，正常来说，原始值是没办法挂在熟悉和方法的，因此`.length` 是无法直接使用的。
之所以能用，是因为JavaScript在使用字符串时，会自动将其转换为 `String` 对象，JavaScript 自动把原始值包装成对应的对象类型，这个过程叫做“[装箱](http://developer.mozilla.org/zh-CN/docs/Glossary/Primitive "装箱")”。

装箱是一个临时的过程，JavaScript 会在需要的时候自动进行这个转换。比如，当你访问字符串的属性或方法时，JavaScript 会创建一个临时的 String 对象，然后访问该对象的属性或方法，最后销毁这个临时对象。

---
具体步骤：

1. `str.length` 
2. `new String(str)`生成临时的 String 对象
3.  访问 `length` 属性
4.  删除临时对象

也就是说
```javascript
const str = 'hello';
console.log(str.length); // 5

实际进行的是
const str = 'hello';
const strObj = new String(str); // 创建临时的 String 对象
console.log(strObj.length); // 5
delete strObj; // 删除临时对象

```
