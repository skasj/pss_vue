<template>
  <div class="login-wrap">
    <img src="../../static/image/logo.png">
    <h3>登录</h3>
    <p v-show="showTiShi">{{tiShi}}</p>
    <input type="text" placeholder="请输入手机号" v-model="mobile">
    <input type="password" placeholder="请输入密码" v-model="password">
    <button v-on:click="login">登录</button>
  </div>
</template>

<script>
import {setCookie, getCookie} from '../utils/cookie'
import global_ from '../config/Global'

export default {
  data () {
    return {
      mobile: '',
      password: '',
      username: '',
      token: '',
      showTiShi: false,
      tiShi: ''
    }
  },
  mounted () {
    /* 页面挂载获取保存的cookie值，渲染到页面上 */
    let uname = getCookie('username')
    this.username = uname
    if (!uname) {
      this.$router.push('/login')
    }
  },
  methods: {
    login () {
      if (this.mobile === '' || this.password === '') {
        this.tiShi = '请输入手机号和密码'
        this.showTiShi = true
      } else {
        var data = new URLSearchParams()
        data.append('mobile', this.mobile)
        data.append('password', this.password)
        var url = global_.getPreUrl() + '/login'
        this.$ajax.post(url, data)
          .then((res) => {
            console.log(res)
            var returnValue = res.data
            console.log(returnValue)
            if (returnValue.ret === -1) {
              this.showTiShi = true
              this.tiShi = '密码或账号输入错误'
            } else if (returnValue.ret === 0) {
              this.showTiShi = true
              this.tiShi = '登录成功'
              setCookie('username', this.mobile, 1000 * 60)
              setCookie('token', returnValue.data)
              setTimeout(function () {
                this.$router.push('/index')
              }.bind(this), 1000)
            }
          })
      }
    }
  }
}
</script>

<style>
  .login-wrap {
    margin-top: 60px;
    text-align: center;
  }

  h3{
    font-size: 24px;
    margin-bottom: 15px;
  }

  p {
    color: red;
    margin-bottom: 10px
  }

  input {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: 0 auto;
    margin-bottom: 10px;
    outline: none;
    border: 1px solid #888;
    padding: 10px;
    box-sizing: border-box;
  }

  button {
    display: block;
    width: 250px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    border: none;
    background-color: #41b883;
    color: #fff;
    font-size: 16px;
    margin-bottom: 5px;
  }
</style>
