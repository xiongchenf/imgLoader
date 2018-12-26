//app.js
const ImageLoader = require('./utils/ImageLoader.js');
const ImageSource = require('./imageSource.js');
App({
  onLaunch: function () {
    new ImageLoader({
      base: ImageSource.BASE,
      source: [ImageSource.single1],
      loading: res => {
        // 可以做进度条
        console.log(res);
      },
      loaded: res => {
        // 可以加载完毕动画
        console.log(res);
      }
    });
  },
  globalData: {
    userInfo: null
  }
})