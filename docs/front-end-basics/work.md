---
sidebar: false
hidden: true
title: 前端基础
# 首页部分元素定制
---
# 面试复盘
## 2025/05/08

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

## 2025/05/12
记录答的不太好的题目（基础八股文系列）

### 1. 事件冒泡和事件捕获的区别
dom事件的传播有两个阶段：事件捕获和事件冒泡。
1. **捕获阶段**：
从 `window` → `document` → 外层元素 → 一直到目标元素的父元素，逐层向下传播。
2. **目标阶段**：
事件到达 目标元素，即实际触发事件的那个元素。
3. **冒泡阶段**：
从目标元素 → 目标元素的父元素 → 一直到 `window`，逐层向上传播。


在 JavaScript 中使用 addEventListener 时的第三个参数控制事件触发阶段：

>  `capture` 一个布尔值，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
详见：
 https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener#options

```
element.addEventListener('click', handler, true);  // 捕获阶段触发
element.addEventListener('click', handler, false); // 冒泡阶段触发（默认）

```
#### 如何阻止事件冒泡？
在事件处理函数中调用 `event.stopPropagation()` 方法可以阻止事件继续向上冒泡。
```javascript
element.addEventListener('click', function(event) {
  event.stopPropagation(); // 阻止事件冒泡
});
```
