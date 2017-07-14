Page({
  data: {
      x:0,
      y:0,
      z:0,
      last_x:0,//记录上次位置
      last_y:0,
      last_z:0,
      SHAKE_THRESHOLD : 250, //判断摇动幅度  
      last_update : 0,//上次要摇动时间
      speedflag:false ,//摇动标志位
      animation:'',
      checkRotate:false

  },
  onReady: function () {

    this.animation = wx.createAnimation({

      duration: 50,

      timingFunction: 'linear',

      delay: 0,

      transformOrigin: 'left,center right',
      success: function (res) {
        console.log(res)
      }
    })
  },
  
  onLoad: function () {
 
  this.startAccelerometer(this)

  },
  
  //开启监听
  startAccelerometer:function (that){
    wx.startAccelerometer() //开起加速度计事件监听
    wx.onAccelerometerChange(function (res) { //监听事件 
      that.changeSpeed(res)//判断函数

    })
  },
  
  //判断函数
  changeSpeed: function (e) {
    var that = this
    var data = this.data
    var speedflag = false
    var dotAnFun =''
   
    var curTime = new Date().getTime();
    if ((curTime - data.last_update) > 100) { //判断的时间间隔 现在是100毫秒


      var diffTime = curTime - data.last_update; 
      var speed = Math.abs(e.x + e.y + e.z - data.last_x - data.last_y - data.last_z) / diffTime * 10000;//这个计算还不太懂
      
      // console.log(speed)
      // console.log(data.SHAKE_THRESHOLD)
      
      if (speed * 10 > data.SHAKE_THRESHOLD) { //这个还需要调一下
        
        // console.log("speedchange")
        // console.log(speed)
        // console.log(data.SHAKE_THRESHOLD)
          that.rotate()


          wx.stopAccelerometer({

            success: function (res) {
              wx.vibrateLong();

              that.setData({
                speedflag: true
              })


            }
          }) //改变之后 停止监听
       
      }
    
      }
    that.setData({
      last_x : e.x, //更新上次位置
      last_y : e.y,
      last_z : e.z,
      speedflag: speedflag,
      last_update: curTime//更新上次时间
    })
},

  /**
* 旋转
*/
  rotate: function () {
    this.animation.rotate(20).step().rotate(-20).step().rotate(20).step().rotate(-20).step().rotate(20).step().rotate(-20).step().rotate(20).step().rotate(-20).step().rotate(20).step().rotate(-20).step().rotate(0).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })


  },
  //强制归0
  rotate0:function(){
    this.animation.rotate(0).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  },

    bindViewTap: function () { //跳转函数
    wx.navigateTo({
      url: '../animation/animation'
    })
  },
      bindnew: function () { //跳转函数
      wx.navigateTo({
        url: '../animation2/animation'
      })
    }
})