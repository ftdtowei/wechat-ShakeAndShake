Page({
  data: {
    text: "Page animation",
    animation: '',
    speedflag:false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 50,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      timingFunction: 'linear',
      // 延迟多长时间开始
      delay: 0,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'left,center right',
      success: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 旋转
   */
  rotate: function () {
    //顺时针旋转10度
    //
    this.animation.rotate(20).step().rotate(-20).step().rotate(20).step().rotate(-20).step().rotate(20).step().rotate(-20).step().rotate(0).step()
    this.setData({
      //输出动画
      animation: this.animation.export(),
      // speedflag:true
    })
  },
  /**
 * 旋转
 */
  rotate2: function () {
    //两个动画组 一定要以step()结尾
    /**
     * 动画顺序 顺时针旋转150度>x,y 放大二倍>x，y平移10px>x,y顺时针倾斜>改变样式和设置宽度宽度
     */
    this.animation.rotate(150).step().scale(2).step().translate(10).step().skew(10).step().opacity(0.5).width(10).step({ ducation: 8000 })
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },

  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})