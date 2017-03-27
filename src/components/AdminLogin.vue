<template>
  <div class="login">
    <div class="log-fir"><h1>项目生涯规划系统</h1>
    </div>
    <div class="log-sec"><h3>同济大学汽车学院</h3>
    </div>
      <div class="log-inp">
        <input type="text" class="font-nor" placeholder="请输入管理员账号密码" v-model=user>
      </div>
      <div class="log-inp">
        <input type="password" class="font-nor" placeholder="请输入密码" v-model=pass>
      </div>
      <div class="log-btn">
        <button v-on:click = "loginUser">登&nbsp;&nbsp;录</button>
      </div>
  </div>
</template>

<script>
import CONFIG from 'global/config'
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      state: true,
      user: null,
      pass: null
    }
  },
  methods: {
    loginUser: function () {
      var self = this
      axios.post('http://123.56.220.72:8080/Car/api/user/login',
        CONFIG.postHttpData({userName: self.user, password: self.pass})
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          CONFIG.setToken(res.data.token)
          CONFIG.setUser(res.data.data)
          self.$router.push('/adUser')
        } else {
          alert('密码错误')
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 280px;
  margin: 150px auto 0 auto;
}
.log-inp input {
  width: 250px;
  margin-bottom: 25px;
  padding: 12px;
  font-size: 16px;
  line-height: 20px;
  height: auto;
  border: 1px solid #d9d9d9;
  border-radius: 3px;
  background-color: #fff;
}
.log-inp input:focus {
  box-shadow: none;
  outline: 0;
  border-color: #a6a6a6;
}
.log-btn button {
  width: 280px;
  margin-bottom: 25px;
  padding: 12px;
  font-size: 16px;
  line-height: 20px;
  height: auto;
  border: 1px solid #3DA8F5;
  border-radius: 3px;
  background-color: #3DA8F5;
  color:white;
  cursor: pointer;
}
.log-btn button:focus {
  box-shadow: none;
  outline: 0;
  border-color: #a6a6a6;
}
.log-reg {
  margin-top: 25px;
}
.log-reg label {
  color:#A6A6A6;
}
.log-reg a {
  text-decoration: none;
  color:#03a9f4;
}
</style>
