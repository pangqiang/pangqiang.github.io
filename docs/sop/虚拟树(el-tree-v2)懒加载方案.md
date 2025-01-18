---
title: 虚拟树(el-tree-v2)懒加载demo
date: 2025-1-19 00:07:00
tags: ['el-tree-v2','性能']
---

## 虚拟树(el-tree-v2)懒加载demo

```vue
<template>
  <div>
  </div>
  <el-tree-v2
      ref="treeRef"
      :data="treeData"
      :props="props"
      show-checkbox
      @check="check"
      :check-strictly="true"
      @node-expand="nodeExpand"
      @node-collapse="nodCollapse"
      @check-change="checkChange"
      :height="600"
  >
    <template #default="{node, data}">
      {{node.label}}
    </template>
  </el-tree-v2>
</template>
<script setup>

const selected = ['node-1-node','node-2-node','node-3-node']

import {ref, unref, nextTick} from "vue";
const treeRef = ref(null)
const props = {
  value: 'id',
  label: 'name',
  children: 'children',
  disabled: 'disabled',
}
const treeData = ref([{
  id: '1',
  name: 'Node-1',
  children: true,
},{
  id: '2',
  name: 'Node-2',
  children: true,
}])

function creatChild(data){
  let id = 0
  return Array.from({length: 10000}).map(item => {
    ++id
    return {
      id: `${data.name}-${id.toString()}`,
      name: `${data.name}-${id.toString()}`
    }
  })
}
function getAllNode(node) {
  const ids = [];

  // 定义递归函数
  function traverse(node) {
    if (!node) return;
    if (node) ids.push(node); // 添加当前节点的 id
    if (node.children && Array.isArray(node.children) && node.expand) {
      node.children.forEach(child => traverse(child)); // 遍历子节点
    }
  }

  traverse(node); // 从目标节点开始
  return ids;
}

function check(data, info) {
  data.checked = !data.checked;
  const allNode = getAllNode(data)
  const ids = allNode.map(item => item.id);
  if (data.expand) {
    if (data.checked) {
      unref(treeRef).setCheckedKeys([...info.checkedKeys, ...ids]);
      [...allNode, ...info.checkedNodes].forEach(item => item.checked = true);
    } else {
      unref(treeRef).setCheckedKeys([...info.checkedKeys.filter(id => !ids.includes(id))]);
      [...allNode].forEach(item => item.checked = false);
    }
  }
}

function nodeExpand(data, node) {

  data.expand = true
  data.loading = true;
  const children = creatChild(data)
  const result = updateTreeNode([...treeData.value], data.id,children);
  treeData.value = result
  console.log('result', result);
}

function nodCollapse(data) {
  data.expand = false
  data.loading = false;
}

function checkChange(data, checked) {
  // data.checked = checked;
  nextTick(()=>{
    const node = unref(treeRef).getCheckedNodes();
    if(node.length > 10){
      console.log('too many')
    }
    unref(treeRef).setCheckedKeys(node.slice(0,10).map(item => item.id));
  })
}


// 初始化函数，用于创建初始索引映射
function initIndex(treeData) {
  const index = {};
  function buildIndexRecursively(node) {
    if (node.id !== undefined) {
      index[node.id] = node;
    }
    if (node.children && Array.isArray(node.children)) {
      for (let child of node.children) {
        buildIndexRecursively(child);
      }
    }
  }

  if (Array.isArray(treeData)) {
    for (let node of treeData) {
      buildIndexRecursively(node);
    }
  } else if (treeData && treeData.id !== undefined) {
    // 如果不是数组，则认为是单个根节点
    buildIndexRecursively(treeData);
  }

  return { tree: treeData, index };
}

const { index } = initIndex(treeData.value);

// 更新树节点的数据方法，返回更新后的整棵树
function updateTreeNode(treeData, nodeId, newData) {
  if (index[nodeId]) {
    if (newData) {
      index[nodeId].children = newData;
    }

    // 更新索引
    updateIndexMap(index,newData)

    // 返回更新后的整棵树
    return treeData;
  } else {
    throw new Error('Node not found');
  }
}

function updateIndexMap(index,newData) {
  newData.forEach(item => {
    index[item.id] = item;
  })
}

</script>

```
