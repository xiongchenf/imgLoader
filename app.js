//app.js
const ImageLoader = require('./utils/ImageLoader.js');
const ImageSource = require('./imageSource.js');
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
                // 可以加载完毕动画
                const {
                    status,
                    sourceLoaded
                } = res;
                if (status) {
                    this.globalData.sourceLoaded = sourceLoaded;
                    this.sourceLoaded && this.sourceLoaded(sourceLoaded);
                }
            }
        });
    },
    globalData: {
        userInfo: null
    }
})