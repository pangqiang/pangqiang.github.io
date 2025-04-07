---
title: "Promise 执行顺序"
date: 2025-03-29 23:31:23
tags: ['Promise']
---
# Promise 执行顺序
以下代码的输出顺序?
```javascript
async function async1() {
  console.log('async1')
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start')
setTimeout(() => {
  console.log('setTimeOut')
}, 0)
async1()
new Promise((resolve) => {
  console.log('promise')
  resolve()
}).then(() => {
  console.log('promise2')
})
console.log('script end')
```
### 先给出答案

```javascript
script start
async1
async2
promise
script end
async1 end
promise2
setTimeOut
```

## 执行步骤

1. 全局同步代码进入执行  
`console.log('script start')` 同步代码，立即执行，输出：
```javascript
script start
```
2. 遇到 `setTimeout  
setTimeout(() => { console.log('setTimeOut') }, 0)`，异步任务，进入宏任务（Macrotask）队列，不会立即执行


3. 执行 `async1()`，调用`async1()`
```javascript
async function async1() {
  console.log('async1')
  await async2()
  console.log('async1 end')
}
```
`console.log('async1')` 立即执行，输出： 
```javascript
async1
```

4. 遇到 `await async2()`，进入 `async2()`

```javascript
async function async2() {
  console.log('async2')
}
```
`console.log('async2')`同步执行，输出：
```javascript
async2
```
`await` 会让 `async1` 暂停，其后代码 `console.log('async1 end'))` 进入 微任务（Microtask）队列。

5. 执行 `new Promise(...)  
new Promise((resolve) => { console.log('promise'); resolve(); })`
`console.log('promise')` 立即执行，输出
```javascript
promise
``` 
6. 执行 `console.log('script end')`

```console.log('script end')``` 立即执行，输出
```javascript
script end
```
## 事件循环处理微任务

此时 微任务队列 里有：
1. `console.log('async1 end`（来自 `await`之后的代码）
2. `console.log('promise2`（来自 `Promise.then()`）

按照 先进先出（FIFO） 规则执行：
1. 执行 `console.log('async1 end') `，输出：
```javascript
async1 end
```
2. `执行 console.log('promise2')`，输出：
```javascript
promise2
```
## 事件循环处理宏任务
此时 宏任务队列里有：
`setTimeout(() => { console.log('setTimeOut') }, 0)`
执行 `setTimeout`，输出：
```javascript
setTimeOut
```
## 最终输出
```javascript
script start
async1
async2
promise
script end
async1 end
promise2
setTimeOut
```

## 总结
1. 同步代码 先执行。
2. `async` 函数内的 `await` 会暂停，等待微任务执行后才恢复。
3. `Promise` 的 `then` 也是微任务，会在同步代码执行完后立即执行。
4. 宏任务（`setTimeout`）最后执行，因为它在 下一次事件循环 才执行。

## 参考
- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/EventLoop)
- [阮一峰的网络日志](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [JavaScript Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)
- [Promise.then()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
