
<script>
import {get} from './util'
import qcloud from 'wafer2-client-sdk'
import config from './config'
export default {
  async created () {
    // 设置登录地址
    qcloud.setLoginUrl(config.loginUrl)
    qcloud.login({
      success: res => {
        // this.setData({ userInfo: res, logged: true })
        console.log('登录成功')
      },
      fail: err => {
        console.error(err)
        // util.showModel('登录错误', err.message)
      }
    })
    const res = await get('/weapp/demo')
    console.log('小程序启动了')
  }
}
</script>

<style>
</style>
