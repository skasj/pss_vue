<template>
  <header id="header" class="header">
    <h1>制药企业进销存管理系统</h1>
    <p>{{username}}&nbsp;&nbsp;[注销]</p>
  </header>
</template>

<script>
import {getCookie} from '../utils/cookie'

export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    /* 页面挂载获取保存的cookie值，渲染到页面上 */
    let uname = getCookie('username')
    this.username = uname
    if (!uname) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  /*.header {*/
    /*margin-top: 0px;*/
    /*border: 0;*/
    /*background: #58B7FF;line-height: 2;color: #ffffff*/
  /*}*/
  h1{
    font-size: 28px;
  }
p{text-align: right;margin-right: 10px}
</style>
