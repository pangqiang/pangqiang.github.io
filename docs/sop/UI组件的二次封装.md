---
title: UI组件的二次封装
tags: ['Vue3', 'UI组件', '二次封装']
---

# UI组件的二次封装
---
日常开发中，我们经常会对UI框架的组件进行二次封装，以便于在项目中使用。
我们可以通过封装组件来实现一些通用的功能，比如：统一的样式、统一的事件处理、统一的状态管理等。这样可以提高代码的复用性和可维护性。

本文以elment plus的el-input组件为例，来说明何对UI组件进行更好二次封装。
首先我们自定义一个组件`myInput`，他的内部对elment plus的el-input进行了二次封装。
```ts
<script setup>
import { ElInput } from 'element-plus'
const input = ref('')
</script>

<template>
  <ElInput v-model="input" />
</template>
```
封装过程中我们会遇到一些问题，主要是以下三个问题：
1. 如何透传属性和事件
2. 如何透传插槽
3. 如何透传ref

通常我们对二次组件进行封装，并不是要完全改变个功能，而是要在原有的基础上进行一些扩展和修改。
所以我们需要对组件的属性、事件、插槽等进行透传。
## 透传属性和事件
透传属性和事件是指将父组件的属性和事件传递给子组件。
在Vue3中，我们可以使用`v-on="$attrs"`来透传事件。
```ts
<script setup>
import { ElInput } from 'element-plus'
import { useAttrs } from 'vue'
const input = ref('')
const attrs = useAttrs()
</script>
<template>
  <ElInput v-model="input" v-bind="attrs" />
</template>
```
在上面的代码中，我们使用`useAttrs`来获取父组件传递的属性，然后使用`v-bind="attrs"`来透传属性。

## 如何透传插槽


