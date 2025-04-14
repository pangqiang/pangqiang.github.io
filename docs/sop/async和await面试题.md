---
title: async和await面试题
tags: ['JavaScript', 'async', 'await']
---
# async和await面试题

## 先贴代码
```js
async function asy1() {
  console.log(1);
  await asy2();
  console.log(2);
}

const asy2 = async () => {
  await setTimeout(() => {
    Promise.resolve().then(() => {
      console.log(3);
    });
    console.log(4);
  }, 0);
};

const asy3 = async () => {
  Promise.resolve().then(() => {
    console.log(6);
  });
};

asy1();
console.log(7);
asy3();

```

## 重点前提
1. setTimeout 是宏任务，执行在下一轮事件循环中。
2. await 后面如果不是真正的 Promise，也会被包裹成 Promise.resolve(...)。
3. await 会 暂停当前 async 函数的继续执行部分（即后面的代码），将它们放进微任务队列，等 await 的值 resolve 后执行。
4. JS 是 单线程，所以我们需要明确当前队列：同步 → 微任务 → 宏任务。

## 分步分析（按事件循环时序）
### 第一步：执行 `asy1()`
```js
console.log(1);
await asy2();
console.log(2); // 暂停在这儿
```
 🖨️ 输出：1

接下来我们要关注 `await asy2()`。

### 第二步：进入 `asy2()`

```js
await setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
}, 0);

```

- `setTimeout(..., 0)` 是同步执行的，注册了一个宏任务。
- `setTimeout(...)` 返回一个数字`（timeout ID）`，不是 Promise
-` await setTimeout(...)` 实际等价于 `await 1`，它会立即“resolve”掉，并不会等待定时器完成
- 所以 `asy2()` 返回的 Promise 立即 resolve，不会等 setTimeout 里的代码。

但注意：`await asy2()` 会暂停 `asy1()` 的后续代码，即 `console.log(2)` 被挂起，等到 `asy2() resolve` 后放入微任务队列中再执行。

### 第三步：继续执行主线程同步代码
```js
console.log(7);
asy3();
```
🖨️ 输出：7

### 第四步：执行`asy3()`
```js
Promise.resolve().then(() => {
  console.log(6);
});
```
加入微任务：`console.log(6)`

### 执行微任务队列（当前阶段）
当前微任务有两个：
- `console.log(6)` from `asy3`
- `console.log(2)` from `asy1`（挂起处）

按顺序执行：
  🖨️ 输出：6
  🖨️ 输出：2

### 第六步：执行宏任务队列（下一轮事件循环）
宏任务是：
```js
setTimeout(() => {
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
}, 0);
```
执行这个 `setTimeout` 回调：
  - 执行 `console.log(4)` → 输出：4
  - 然后注册微任务：`console.log(3)`

### 第七步：再次执行微任务队列
- 执行 `console.log(3)` → ✅ 输出：3

## 最终输出顺序
| 阶段           | 输出 | 原因                                   |
| ---------------- | ------ | ---------------------------------------- |
| 同步           | 1    | `asy1()`中的第一句                 |
| 同步           | 7    | 全局同步代码                           |
| 微任务         | 6    | `asy3()`中的`Promise.then`     |
| 微任务         | 2    | `asy1()`中`await asy2()`之后   |
| 宏任务         | 4    | `setTimeout`中的普通 log           |
| 微任务（延后） | 3    | `setTimeout`中的`Promise.then` |

