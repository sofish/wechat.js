# 重要提示：

> 目前微信暂停了旧版 JS API 的使用，如果你的 APP 受到影响，可以尝试下面的方式来让这个库正常运行：[申请 JS API 使用](https://github.com/sofish/wechat.js/issues/15#issuecomment-68430034)。如果有更新，我会删掉这个提示的。


# wechat.js

微信打开 DEMO 地址：[http://sofish.github.io/wechat.js](http://sofish.github.io/wechat.js/)，或者扫一扫下面的二维码进行分享：

![sofish/wechat.js](http://ww4.sinaimg.cn/large/61b90cbegw1eknqgwosn6j203p03pglk.jpg)

### 安装

使用 bower 管理 `wechat.js` 的依赖：
```bash
$ bower install wechat.js --save
```
更新 `wechat.js` 依赖版本：
```bash
$ bower update
```

> 下面是 API 详解，使用可参考上面 DEMO 的源代码。微信的 API 是有点恶心的，也不断在变，如果发现问题请给提 issue 或者 pull-request 吧。

### 1、使用指南

**一、唯一接口：`wechat`，有「分享」+ 「操作」两种类型**

```js
// 分享
wechat('friend', data, callback);           // 朋友
wechat('timeline', data, callback);         // 朋友圈
wechat('weibo', data, callback);            // 微博
wechat('email', data, callback);            // 邮件分享

// 操作
wechat('hideToolbar', callback);            // 隐藏底部菜单
wechat('hideOptionMenu', callback);         // 隐藏右上角分享按钮
wechat('showOptionMenu', callback);         // 显示右上角分享按钮
wechat('closeWebView');                     // 关闭webview
wechat('scanQRCode');                       // 跳转到扫描二维码页面
wechat('imagePreview', imgData, callback);  // 图片预览/查看大图
// imgData = {
//   current: 'picture1.jpg',               // 要预览的当前张url
//   urls: ['picture1.jpg', 'picture2.jpg'] // 所有图片的url列表
// }

wechat('network', callback);                // 查看用户当前网络
// 1. wifi
// 2. edge 非 wifi,包含 3G/2G
// 3. fail 网络断开连接
// 4. wwan 2g/3g
```

**二、`data` 「属性」支持函数**

因为有些数据是需要拼接，或者在点击分享按钮的时候可能才存在的，但是又不想写很麻烦时机判断，这里 `data` 中支持传入函数，比如：

```js
// 一般的数据
var data = {
  'app': 'APP ID',    // 选填，默认为空
  'img': '图片 URL',   // 选填，默认为空或者当前页面第一张图片
  'link': '链接',
  'desc': '描述',
  'title': '标题'
};

// 假设我们在一个单页应用，title 可能是 js 在数据载入后才有的，那么可以这样来：
var getTitile = function() {
  return document.title;
};

// 这个数据 ，最终 wechat.js 会自动转换
var data = {
  // 这里需要特别说明的是，建议不要用新浪微博的图片地址，要么你试试，哈哈
  'img': '图片 URL',
  
  'link': '链接',
  'desc': '描述',
  'title': getTitle()
};

// 发送邮件
var data = {
    title: "邮件标题",
    content: "邮件内容"
};
```

**三、回调**

```js
var callback = function() {
  // 返回的数据并不统一，接口已经尽量统一，我觉得微信公司现在缺 js 程序员
  // 也有一些是很恶心的
  console && console.log(argument);
};

wechat('timeline', data, callback);
```

### 2、授权

[MIT License](license.txt)
