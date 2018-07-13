<template>
  <div class="container">
    <div class="userinfo" @click='login'>
      <img :src="userinfo.avatarUrl" alt="">
      <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button> 
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>

    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
  </div>
</template>

<script>
  import {showSuccess, post, showModal} from '@/util'
  import qcloud from 'wafer2-client-sdk'
  import config from '@/config'
  import YearProgress from '@/components/YearProgress'
  export default {
    components: {
      YearProgress
    },
    data () {
      return {
        userinfo: {
          avatarUrl: '../../../static/img/unlogin.png',
          nickName: '点击登录'
        }
      }
    },
    methods: {
      async addBook (isbn) {
        const res = await post('/weapp/addBook', {
          isbn,
          openid: this.userinfo.openId
        })
        showModal('添加成功', `${res.title}添加成功`)
      },
      scanBook () {
        // 允许从相机和相册扫码
        wx.scanCode({ success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        } })
      },
      login () {
        // 设置登录地址
        let user = wx.getStorageSync('userInfo')
        if (!user) {
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.login({
            success: res => {
              wx.setStorageSync('userInfo', res)
              showSuccess('登录成功')
              this.userinfo = res
            },
            fail: err => {
              console.error(err)
            }
          })
        }
      }
    },
    onShow () {
      let userinfo = wx.getStorageSync('userInfo')
      if (userinfo) {
        this.userinfo = userinfo
      }
    }
  }
</script>

<style lang='scss'>
.container{
  padding:0 30rpx;

}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
  img{
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}
</style>
