# React 16.8 基础面试题

适用于 React 16.8 版本及以上，重点考察 Hooks 基础知识。

## 1️ 什么是 React Hooks？

React Hooks 是 React 16.8 引入的新特性，允许在 **函数组件中使用 state、生命周期等功能**，而无需编写类组件。

## 2️ React 常用的 Hooks 有哪些？请简单描述它们的作用。

- `useState`：在函数组件中声明 state 变量
- `useEffect`：处理副作用（如数据请求、订阅、DOM 操作）
- `useContext`：使用 React 上下文
- `useRef`：访问 DOM 节点或持久化保存数据
- `useMemo`：记忆化计算结果，防止不必要的重新计算
- `useCallback`：记忆化函数引用，防止不必要的重新创建函数

## 3️ useState 怎么用？请写一个计数器例子。

```js
import React, { useState } from 'react';
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>当前计数: {count}</p>
      <button onClick={() => setCount(count + 1)}>增加</button>
    </>
  );
}
```
## 4️ useEffect 有哪些使用场景？默认什么时候会执行？

常见场景：
- 页面加载完成时请求数据
- 订阅/取消订阅事件
- 操作 DOM

默认：
- **组件初次渲染后执行一次**
- **依赖项变化时再次执行**

## 5️ useEffect 如何模拟 componentDidMount、componentDidUpdate、componentWillUnmount？

```js
useEffect(() => {
  console.log('componentDidMount 和 componentDidUpdate');

  return () => {
    console.log('componentWillUnmount');
  };
}, []);
```

- 传空数组 `[]` → 类似 `componentDidMount`
- 不传依赖 → 类似 `componentDidMount + componentDidUpdate`
- 返回函数 → 类似 `componentWillUnmount`

## 6️ Hooks 有哪些使用限制？

✅ 只能在 **函数组件** 或 **自定义 Hook** 中调用  
✅ 只能在 **顶层作用域** 调用（不能写在 if、for、嵌套函数中）

原因：
> React 需要保证每次渲染的时候，useState、useEffect 这些 Hook 都是按照一样的顺序去调用的。
> 它内部是按顺序一个一个排着的，如果写在 if 里面或者普通函数里，有时候这行代码执行、有时候不执行，就会导致 React 对不上号，状态就乱了。
> 所以 React 要求只能写在函数组件最外面或者自定义 Hook 里，这样每次都会保证顺序一样，它才知道哪个 Hook 对应哪个状态。

## 7️ 为什么要用 Hooks？它解决了什么问题？

- 不用写类组件也能用 state、生命周期
- 更好地复用逻辑（通过自定义 Hook）
- 函数组件更简洁，易于测试
- 避免类组件中 `this` 的困惑

## 8️ 什么是自定义 Hook？怎么写？

自定义 Hook 是一个以 `use` 开头的函数，用来封装复用逻辑。
```js
function useTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

// 使用
function App() {
  useTitle('首页');
  return <div>首页内容</div>;
}
```
## 9️ useEffect 第二个参数（依赖数组）如果不写、写空、写值，区别是什么？

| 依赖数组        | 触发时机                          |
|----------------|---------------------------------|
| 不写            | 每次渲染后都触发                 |
| `[]` 空数组     | 只在第一次渲染后触发（相当于 `componentDidMount`） |
| `[x, y]` 有依赖 | 只有当 `x` 或 `y` 变化时触发     |

---

## 10 总结：实际工作中用过哪些 Hooks？用它们解决过什么问题？

在实际工作中，我用过 `useState` 来管理表单输入的数据，用户输入内容会直接更新到页面；
用 `useEffect` 做接口请求，比如页面加载的时候去后端拿数据；
用 `useRef` 获取 DOM 节点，比如让某个输入框自动聚焦，或者保存定时器的 ID 方便后面清除；
还用 `useCallback` 和 `useMemo` 优化过性能，避免一些函数或计算没必要的重新执行，减少页面卡顿；
也用 `useContext` 来共享登录用户信息，这样就不用一层一层传 `props`。这些 Hooks 让我用函数组件就能搞定状态管理、数据请求、性能优化、全局数据共享，写起来比类组件简单多了。

---

## 11 有哪些能力是类组件可以实现但是函数式组件不好实现的?
- 组件实例：类组件有实例，可以直接访问 `this`，函数组件没有实例。
- 生命周期方法：类组件有 `componentDidMount`、`componentDidUpdate` 等生命周期方法，函数组件需要用 `useEffect` 来模拟。
- 错误边界：类组件可以实现错误边界，函数组件不能直接实现。
- 访问 `this`：类组件可以直接访问 `this`，函数组件需要用 `useRef` 或闭包来保存状态。
- 性能优化：类组件可以使用 `shouldComponentUpdate` 来控制渲染，函数组件需要用 `React.memo` 和 `useCallback` 来优化性能。
 
 具体例子如下：

 实际工作中我发现，大多数功能用函数组件和 Hooks 都能实现，但有几个场景用类组件会更方便：

1️⃣ 错误边界：
我之前做后台管理系统时，有个页面从第三方插件动态加载报表，如果这个报表插件报错，会影响整个页面渲染。用类组件的 componentDidCatch 可以很简单地把这个错误兜住，只显示报错提示而不是整个白屏。但函数组件没办法直接实现错误边界，最后我们还是写了一个类组件 ErrorBoundary 来包一下。

2️⃣ DOM 更新前捕获状态（getSnapshotBeforeUpdate）：
在一个聊天窗口功能里，有个需求是：如果用户没有手动滚动聊天记录，就让它新消息时自动滚到底；如果用户手动往上滚了，就不要自动跳到底。这个滚动位置的判断需要在 DOM 更新前获取。类组件有 getSnapshotBeforeUpdate 很方便，但函数组件只能用 useLayoutEffect 搭配 ref 自己去记录上一个滚动值，实现起来绕一些。

3️⃣ 向父组件暴露方法：
在做一个上传组件时，父组件希望通过 ref 调用子组件内部的 reset 方法。类组件直接用 this 就可以暴露方法；但函数组件要用 forwardRef 搭配 useImperativeHandle 实现，写法比较繁琐，团队里有同事一开始还写错了。

除了这几个特殊场景，大部分业务逻辑我还是更喜欢用函数组件写，结构简单、逻辑更好拆分。


## 11 React 中 key 的作用是什么？为什么列表渲染要加 key？
- key 用来标识元素的唯一性，帮助 React 在 diff 算法中准确判断哪些元素发生了变化，避免不必要的 DOM 操作。
- 没有 key 或 key 重复，可能导致渲染异常，比如输入框丢失焦点。

## 12 受控组件和非受控组件的区别是什么？什么时候用？
- 受控组件：表单元素的值由 React 的 state 控制（value + onChange）。
- 非受控组件：直接通过 DOM 操作（ref）获取值。
- 复杂表单、需要实时验证时用受控组件；简单、一次性提交表单可以用非受控组件。


## 13 React 组件通信的方式有哪些？
- props 父传子
- 回调函数子传父
- context 跨层级传值
- redux / mobx 等全局状态管理
- event bus（极少数情况）

## 14 React 的 setState 是同步还是异步？为什么有时候拿不到最新值？
- 在 React 的合成事件、生命周期中是 **异步的**，为了批量更新优化性能。
- 在 `setTimeout`、原生事件中是同步的。
- 拿不到最新值时可以用函数式写法：`setState(prev => prev + 1)`


## 15 React 中什么是“单向数据流”？好处是什么？
- 数据从父组件 → 子组件单向流动。
- 子组件不能直接修改 props，只能通过回调通知父组件修改。
- 好处：数据流动方向清晰，方便调试、可维护性高。


## 16 什么情况下需要使用 shouldComponentUpdate / React.memo？
- 当组件接收大量 props，但只有部分 props 变化时，为了避免整个组件重复渲染。
- React.memo 用于函数组件，类似于类组件的 shouldComponentUpdate。


## 17 React 中如何阻止组件重新渲染？
- PureComponent / React.memo
- 在父组件中不传新 props
- shouldComponentUpdate 返回 false

## 18 React 中如何实现懒加载？
- 在 componentWillUnmount / useEffect 的返回函数里清理：
    - 取消定时器
    - 取消网络请求
    - 移除事件监听
- 例子：关闭 websocket 连接、清除 window resize 监听。

## 19 什么是高阶组件？举个使用场景。
- 高阶组件是一个函数，接收一个组件返回一个新组件。
- 作用：复用组件逻辑、增强功能。
- 场景：权限控制（未登录跳转登录页）、日志埋点、loading 管理。

## 20 在 React 项目中，如何处理跨页面的数据共享？

- 使用全局状态管理（redux、mobx、zustand、context）
- localStorage / sessionStorage
- url 参数（不推荐复杂数据）
- query string / 路由 state



---
# 性能优化
## 21 React 性能优化的常用方法有哪些？
React 16.8 中我能用的性能优化方法包括：React.memo、useCallback、useMemo、lazy + Suspense（用于组件懒加载）、虚拟滚动、拆分组件、减少不必要的 state 提升、保持 key 稳定等。因为 React 16.8 还不支持 useTransition，所以我主要通过 memoization 和减少渲染来优化性能。
React.memo 防止子组件重复渲染
```js
 const Child = React.memo(({ value }) => <div>{value}</div>);
```
useCallback 防止函数重复创建
```js
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);
```
useMemo 防止计算重复执行
```js
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
避免 props 传递匿名函数/对象

❌ 这样会导致子组件每次都认为 props 变化：

```<Child onClick={() => doSomething()} />```

✅ 用 useCallback：

```js
const handle = useCallback(() => doSomething(), []);
<Child onClick={handle} />
```

## 22 异步更新数据最小实现
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/data') // 假设接口是 /api/data
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>数据：{JSON.stringify(data)}</div>
  );
}

export default DataFetcher;

```
## 23  针对表单场景的简单实现
```jsx
import React, { useState, useEffect } from 'react';

function UserForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetch('/api/user/123') // 假设获取用户ID=123的数据
      .then(res => res.json())
      .then(data => {
        setFormData({
          name: data.name,
          email: data.email
        });
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交数据:', formData);
    // 这里可以调用 fetch 发送 post 请求
  };

  if (!formData.name && !formData.email) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        姓名: <input name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        邮箱: <input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <button type="submit">提交</button>
    </form>
  );
}

export default UserForm;

```
## 24 react中增删改查数据的最佳实践

1️⃣ 数据状态管理：用 useState（简单场景）或 Redux / Context（复杂场景）

- 对于单个页面的小数据：用 useState 管理
- 对于多个页面共享的数据：用 Redux / Context 管理
- 用不可变更新（immutable）操作数据，避免直接修改原数组
React 中增删改查操作数据时，要通过 setState 更新新数组，而不是直接改原数组。

```jsx
// 增
setList(prev => [...prev, newItem]);
// 删
setList(prev => prev.filter(item => item.id !== targetId));
// 改
setList(prev => prev.map(item => item.id === targetId ? {...item, name: '新名字'} : item));
```

2️⃣ 与后端交互：在 useEffect 中获取数据、在事件中发请求

- 查询（get）：在 useEffect 中初始化请求
- 增删改（post/put/delete）：在事件函数中调用 API → 请求成功后更新状态
```jsx
useEffect(() => {
  fetch('/api/list').then(res => res.json()).then(data => setList(data));
}, []);
```

综合实例（简单用户管理表）：
```jsx
import React, { useState, useEffect } from 'react';

function UserManager() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 查询
  useEffect(() => {
    setIsLoading(true);
    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setIsLoading(false));
  }, []);

  // 新增
  const addUser = (newUser) => {
    fetch('/api/users', { method: 'POST', body: JSON.stringify(newUser) })
      .then(res => res.json())
      .then(data => setUsers(prev => [...prev, data]));
  };

  // 删除
  const deleteUser = (id) => {
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(() => setUsers(prev => prev.filter(u => u.id !== id)));
  };

  // 更新
  const updateUser = (updatedUser) => {
    fetch(`/api/users/${updatedUser.id}`, { method: 'PUT', body: JSON.stringify(updatedUser) })
      .then(res => res.json())
      .then(data => setUsers(prev => prev.map(u => u.id === data.id ? data : u)));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>用户管理</h2>
      <ul>
        {users.map(u => (
          <li key={u.id}>
            {u.name} <button onClick={() => deleteUser(u.id)}>删除</button>
          </li>
        ))}
      </ul>
      <button onClick={() => addUser({ name: '新用户' })}>添加</button>
    </div>
  );
}

export default UserManager;
```
