<template> 
  <div> 
    列表
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin">获取用户信息</button> 
  </div> 
</template>

<script>
  export default {
    created () {
      console.log(111)
    }
  }
</script>

<style>

</style>