# Wechat.js

### 1、使用指南

```js
// 导入的数据
var data = {
  'app': 'APP ID',    // 选填，默认为空
  'img': '图片 URL',   // 选填，默认为空或者当前页面第一张图片
  'link': '链接',
  'desc': '描述',
  'title': '标题'
};

var callback = function() {
  console && console.log(argument);
};

// 分享
wechat('friend', data, callback);     // 朋友
wechat('timeline', data, callback);   // 朋友圈
wechat('weibo', data, callback);      // 微博

// 操作
wechat('network', callback);          // 查看用户当前网络
wechat('hideToolbar', callback);      // 隐藏底部菜单
wechat('hideOptionMenu', callback);   // 隐藏右上角分享按钮
```

### 2、授权

[MIT License](license.txt)
