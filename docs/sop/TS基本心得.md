---
title: 'TS心得之谈：类型声明'
tags: ['tpescript']
---
很多 JS 开发者一开始学 TS 都会被“要不要写类型声明”、“在哪写”给搞懵，本文就来聊聊以上两个问题

## 🔍 哪些地方应该声明类型？

###  类型声明的本质作用：
- 更明确地表达代码的“输入”和“输出”
- 获得 IDE 自动提示 + 类型检查
- 提前发现错误（比如传错类型、拼错属性）
- 给代码“加注释”一样的说明

### 但也不是每个地方都需要写类型声明。
##  一般在哪些地方该写类型？

1. 函数的参数和返回值
> 因为这是“边界”，很重要，不能靠推断

```ts
function sum(a: number, b: number): number {
  return a + b;
}
```

2. 函数的返回类型（建议写）
> 尽管可以推断，但写出来更安全，特别是公共函数

```ts
function getUser(): { name: string, age: number } {
  return { name: 'Tom', age: 20 };
}
```
3. 对象结构 / 数据模型
> 建议使用 interface 或 type，增强语义性

```ts
interface User {
  id: number;
  name: string;
  isAdmin?: boolean;
}
```
4. 外部数据（API 响应、表单数据、配置项等）

```ts
type ApiResponse = {
  success: boolean;
  data: User[];
}
```
这类数据源头不受你控制，更需要类型保障你“用对了”。

5. 泛型函数 / 工具函数
```ts
function identity<T>(value: T): T {
  return value; 
}
```

## ❌ 哪些地方可以不声明类型？
TS 的类型推导很强，在这些地方可以省略：
1. 赋值时直接推导出来的变量：
```ts
const name = 'Tom'; // 自动推断为 string
```

2. 赋值时直接推导出来的变量：
```ts
const count = items.length;
```

## 总结

### 你只需要在“模块边界”（参数、返回值、暴露的对象）声明类型，内部的逻辑 TS 能自己推导。

## 一个例子

  ``` ts
  interface TodoItem {
    id: number;
    text: string;
    completed: boolean;
  }
  function toggleTodo(item: TodoItem): TodoItem {
    return { ...item, completed: !item.completed };
  }
   ``` 

- TodoItem 明确了数据结构
- 函数参数和返回值都声明清楚
- 内部实现完全依赖类型推导
