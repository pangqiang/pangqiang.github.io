---
title: JS自定义事件
date: 2022-11-26 13:21:38
tags: JS
---
### JS 发布订阅模式实现
```
// add an appropriate event listener
obj.addEventListener("cat", function(e) { e.detail });

// create and dispatch the event
var event = new CustomEvent("cat", {
  detail: {
    hazcheeseburger: true
  }
});
obj.dispatchEvent(event);

```

