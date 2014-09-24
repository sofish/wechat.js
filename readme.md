# Wechat.js

URL DEMO: [http://sofish.github.io/wechat.js](http://sofish.github.io/wechat.js/)

或者扫一扫下面的二维码进行分享：

![sofish/wechat.js](http://ww4.sinaimg.cn/large/61b90cbegw1eknqgwosn6j203p03pglk.jpg)


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
wechat('hideToolbar', callback);      // 隐藏底部菜单
wechat('hideOptionMenu', callback);   // 隐藏右上角分享按钮

wechat('network', callback);          // 查看用户当前网络
// 1. wifi
// 2. edge 非 wifi,包含 3G/2G
// 3. fail 网络断开连接
// 4. wwan 2g/3g
```

### 2、授权

[MIT License](license.txt)
