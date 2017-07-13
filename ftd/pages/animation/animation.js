Page({
  data: {
    dotAnData: {}
  },
  onShow: function () {
    var that = this
    var i = 0
    var dotAnData = wx.createAnimation({
      duration: 1000,
      transformOrigin: '200px 91px'
    })

    var dotAnFun = setInterval(function () {
      dotAnData.rotate(6 * (++i)).step()
      that.setData({
        dotAnData: dotAnData.export()
      })
    }.bind(that), 1000)
  }
})