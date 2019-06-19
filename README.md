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
// 示例在app.js内使用
App({
    onLaunch: function() {
        new ImageLoader({
            base: ImageSource.BASE,
            source: ImageSource.home,
            loading: res => {
                // 可以做进度条
                console.log(res);
            },
            loaded: res => {
		// res是加载器执行完毕的回调，返回结果如下：
		//  {
                //	status: true, // 全部加载完成
                //	timecost: 100, // 整个加载过程耗时
                //	success: 9, // 加载成功的数量
                //	fail: 1, // 加载失败的数量
                //	totalcount: 10, // 总共触发加载的图片数量
                //	sourceLoaded: { // 加载成功后的结果对象，可直接在其他页面内使用
		//	    home: {
		//		status: true, // 此图片的加载状态
		//		src: "https://example.com/pathtofile/example.png"
		//	    },
		// 	    pages: [{src: false, status: "/example.jpee"}]
		//		...
		//	} 
            	//  }
                // 可以加载完毕动画
                const {
                    status,
                    sourceLoaded
                } = res;             
		// 把图片加载器返回的sourceLoaded挂载到app对象上，则可以在全局任何页面内引用。
                this.globalData.sourceLoaded = sourceLoaded;
		// 比如示例是在首页渲染时需要使用sourceLoaded对象，可以这样写：
		// 在首页的onLoad内写(因为首页的onload可能先于加载器回调)
		// app.sourceLoaded = (sourceLoaded) => {
		//    this.setData({ 
		//        sourceLoaded: sourceLoaded 
		//    })
		// }
                this.sourceLoaded && this.sourceLoaded(sourceLoaded);               
            }
        });
    },
    // appjs的global对象
    globalData: {
        userInfo: null
    }
})
```

5、使用资源示例
wxml:

`<imgs src='{{sourceLoaded[0].home.poster.src}}' />`
