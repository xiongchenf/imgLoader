//index.js
//获取应用实例
const app = getApp();
Page({
    data: {
        src: "",
        source: []
    },
    onLoad: function() {
        app.sourceLoaded = source => {
            console.log(source);
            this.setData({
                source: source
            })
        };
    }
})