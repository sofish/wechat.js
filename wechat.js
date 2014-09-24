/*! CopyRight: sofish http://github.com/sofish/wechat.js, Licensed under: MIT */
;(function(global, doc) {

  var noop = function() {};

  // map 掉恶心的不统一的 api
  var Wechat = function() {
    this.calls = [];

    this.map = {
      events: {
        friend: 'menu:share:appmessage',
        timeline: 'menu:share:timeline',
        weibo: 'menu:share:weibo'
      },
      action: {
        friend: 'sendAppMessage',
        timeline: 'shareTimeline',
        weibo: 'shareWeibo'
      },
      direct: {
        network: 'getNetworkType',
        hideToolbar: 'hideToolbar',
        hideOptionMenu: 'hideOptionMenu'
      }
    };
  };

  // 有些 data 是延时获取的，这时候应该支持传入 callback
  Wechat.prototype._data = function(data) {
    for(var p in data) {
      if(!data.hasOwnProperty(p)) return;
      if(typeof data[p] === 'function') data[p] = data[p]();
    }

    // 接口命名统一
    data.app_id = data.app;
    data.img_url = data.img;

    delete data.app;
    delete data.img;

    return data;
  };

  // 处理数据接入
  Wechat.prototype._make = function _make(obj) {
    if(typeof WeixinJSBridge === 'undefined') {

      this.calls.push(obj);

      var make = function() {
        return _make(obj);
      };

      if(doc.addEventListener) return document.addEventListener('WeixinJSBridgeReady', make, false);

      // IE only
      doc.attachEvent('WeixinJSBridgeReady', make);
      doc.attachEvent('onWeixinJSBridgeReady', make);

      return;
    }

    // 直接获取的情况
    var direct = this.map.direct[obj.name];
    if(direct) {
      // 获取用户网络状态的返回值如下：
      // network_type:wifi wifi网络
      // network_type:edge 非wifi,包含3G/2G
      // network_type:fail 网络断开连接
      // network_type:wwan（2g或者3g）
      if(name === 'network') return WeixinJSBridge.invoke(direct, {}, callback);

      WeixinJSBridge.call(direct, callback);
    }

    // 分享到微博的接口不同
    if(name === 'weibo') {
      obj.content = obj.desc;
      obj.url = obj.link;

    // 朋友圈的 title 是不显示的，直接拼接
    } else if(name === 'timeline') {
      obj.title = obj.title + ': ' + obj.desc;

      // Android 下有时候会需要 desc (*U*)
      obj.desc = obj.title;
    }

    // 当 WeixinJSBridge 存在则直接绑定事件
    WeixinJSBridge.on(this.map.events[obj.name], function() {
      WeixinJSBridge.invoke(this.map.action[obj.name], obj, callback);
    });
  };

  // 添加监听
  Wechat.prototype.on = function(name, data, callback) {
    if(!name) return;
    if(typeof data === 'function') {
      callback = data;
      data = null;
    }

    this._make({
      name: name,
      data: data ? this._data(data) : {},
      callback: callback || noop
    });

    // 返回本身，支持链式
    return this;
  };

  // 对外只分享一个接口，不过会返回本身，可以有备用
  global.wechat = global.wechat || function() {
    var w = new Wechat();
    return w.on.apply(w, arguments);
  }

})(window, document);
