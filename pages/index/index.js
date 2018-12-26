//index.js
//获取应用实例
const app = getApp();
const imgSource = require('../../imageSource.js');
Page({
  data: {
    base: imgSource.BASE,
    src: '',
    src1: imgSource.BASE + imgSource.single1
  },
  onLoad: function () {
    setTimeout(() => {
      this.setData({
        src: this.data.base + imgSource.single2
      })
    }, 1000)
  }
})
