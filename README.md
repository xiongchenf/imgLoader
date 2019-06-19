# imgLoader
微信小程序异步加载远程图片


使用步骤：

1、登录微信小程序管理后台配置`downloadFile 合法域名`。

2、在需要使用图片预加载的页面写入:
```javascript
const ImageLoader = require('path_to_file/ImageLoader.min.js'); // 加载器
const ImageSource = require('path_to_file/imageSource.js'); //资源文件
````

3、指定待加载资源路径

```javascript
// imageSource.js 示例
// BASE是图片的来源,https://example.com必须配置在downloadFile 合法域名中
module.exports = { 
    "BASE": "https://example.com/static_source/img/",  
    "single1": "ghost.4449aa4.png", // 资源可以支持数组，对象，及相互嵌套方便页面内直接使用
    "single2": "ghost.4449aa4.png",
    "single3": "ghost.4449aa4.png",
    "single4": "ghost.4449aa4.png",
    "pages": {
      "index": ["ghost.4449aa4.png", "ghost.4449aa4.png"],
      "user": ["ghost.4449aa4.png", "ghost.4449aa4.png"],
      "home": ["ghost.4449aa4.png", "ghost.4449aa4.png"],
      "login": ["ghost.4449aa4.png", "ghost.4449aa4.png"]
    },
    "imageList": [
      "ghost.4449aa4.png",
      "ghost.4449aa4.png",
      "ghost.4449aa4.png",
      "ghost.4449aa4.png",
      "ghost.4449aa4.png"
    ],
    "folders": {
      "page1": "ghost.4449aa4.png",
      "page2": "ghost.4449aa4.png",
      "inner": [
        "ghost.4449aa4.png",
        "ghost.4449aa4.png"
      ],
      "home": {
        "poster": "ghost.4449aa4.png"
      }
    }
}
```

4、创建加载器对象:
```javascript
new ImageLoader({
    base: ImageSource.BASE,
    source: ImageSource.home,
    loading: res => {
        // 可以做进度条
        console.log(res);
    },
    loaded: res => {
        // 可以加载完毕动画
        const {
            status,
            sourceLoaded
        } = res;
        if (status) {
            // 返回一个已加载的图片资源对象，结构与source结构一致。
            // 包含图片的加载状态与可直接引用地址
            this.sourceLoaded = sourceLoaded;
        }
    }
});
```

5、使用资源示例
wxml:

`<imgs src='{{sourceLoaded[0].home.poster.src}}' />`
