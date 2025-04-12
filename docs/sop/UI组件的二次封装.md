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
```js
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
```js
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
还是以el-input为例，在组件使用时，我们也需要通过`#prepend`，`#prefix`等来传递插槽内容，如下代码：
组件主要代码
```js
<script setup>
import { ElInput } from 'element-plus' 
</script>
<template>
  <ElInput>
    <template #prepend>
      <slot name="prepend" />
    </template>
    <template #prefix>
      <slot name="prefix" />
    </template>
    ...
  </ElInput>
</template>
```

上述代码功能没有问题，但是我们需要在每个插槽中都写一遍`<slot name="xxx" />`，这样会导致代码的重复。我们可以动态生成插槽。
```js
<script setup>
import { ElInput } from 'element-plus'
import { useSlots } from 'vue'
const slots = useSlots()
</script>
<template>
  <ElInput v-bind="$attrs">
    <template v-for="(slot, name) in slots" :key="name" v-slot:[name]="slot">
      <slot :name="name" v-bind="slot" />
    </template>
  </ElInput>
</template>
```
在上面的代码中，我们使用`useSlots`来获取父组件传递的插槽，然后使用`v-for`来遍历插槽，最后使用`v-slot:[name]="slot"`来透传插槽。这样就可以避免代码的重复。

## 如何透传ref
遗憾的是，Vue3并没有提供直接透传ref的方法。我们使用如下办法
ref + expose 透传组件实例

```js
<script setup>
import { ElInput } from 'element-plus'
import { ref } from 'vue'
const innerRef = ref()
// 暴露 Element Plus 原组件实例（比如 ElInput）给父组件
defineExpose({
  focus: () => innerRef.value?.focus(),
  blur: () => innerRef.value?.blur(),
  // 如果想更直接，可以暴露整个实例
  ...innerRef
})
</script>

<template>
  <ElInput ref="innerRef"/>
</template>
```

在父组件中使用
```js
<template>
  <my-input ref="myInput" />
</template>
<script setup>
import { ref } from 'vue'
const myInput = ref()
const focus = () => {
  myInput.value.focus()
}
const blur = () => {
  myInput.value.blur()
}
</script>
```

## 总结
在本文中，我们介绍了如何对UI组件进行二次封装。
我们主要介绍了如何透传属性和事件、透传插槽、透传ref。
