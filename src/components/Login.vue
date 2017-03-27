<template>
  <div class="login">
    <div class="log-fir"><h1>项目生涯规划系统</h1>
    </div>
    <div class="log-sec"><h3>同济大学汽车学院</h3>
    </div>
    <div v-if="state == true">
      <div class="log-inp">
        <input type="text" class="font-nor" placeholder="请输入工号/学号" v-model="login.userName">
      </div>
      <div class="log-inp">
        <input type="password" class="font-nor" placeholder="请输入密码" v-model="login.password">
      </div>
      <div class="log-btn">
        <button v-on:click="loginUser">登&nbsp;&nbsp;录</button>
      </div>
      <div class="line"></div>
      <div class="log-reg">
        <label>没有账号？<a href="javascript:void(0)" v-on:click="changeState">注册新账号</a></label>
      </div>
    </div>
    <div v-if="state == false">
      <div class="log-inp">
        <input type="text" class="font-nor" placeholder="请输入工号/学号" v-model="register.userName">
      </div>
      <div class="log-inp">
        <input type="password" class="font-nor" placeholder="请输入密码" v-model="register.password">
      </div>
      <div class="log-inp">
        <input type="password" class="font-nor" placeholder="请再次输入密码" v-model="repassword">
      </div>
      <div class="log-inp">
        <input type="text" class="font-nor" placeholder="请输入姓名" v-model="register.name">
      </div>
      <div class="log-inp">
        <select v-model="register.schoolYear">
          <option value="null">请选择年级</option>
          <option v-for="n in 20">{{n + 2016 - 10}}</option>
        </select>
      </div>
      <div class="log-inp">
        <input type="text" class="font-nor" placeholder="请输入邮箱(重要!有学期规划提醒)" v-model="register.email">
      </div>
      <div class="log-btn">
        <button v-on:click="registerUser">注&nbsp;&nbsp;册</button>
      </div>
      <div class="line"></div>
      <div class="log-reg">
        <label>已有账号？<a href="javascript:void(0)" v-on:click="changeState">登录</a></label>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import CONFIG from 'global/config'
export default {
  name: 'login',
  data () {
    return {
      state: true,
      login: {
        userName: null,
        password: null
      },
      register: {
        userName: null,
        password: null,
        name: null,
        email: null,
        schoolYear: null
      },
      repassword: null
    }
  },
  methods: {
    changeState: function () {
      this.state = !this.state
    },
    registerUser: function () {
      var self = this
      if (!CONFIG.judgeHttpData() && self.repassword !== self.register.password) {
        alert('注册不能为空或者重复密码错误！')
      } else {
        axios.post(CONFIG.baseURL + 'user/register',
          CONFIG.postHttpData(self.register)
        ).then(function (res) {
          if (res.data.callStatus === 'SUCCEED') {
            CONFIG.setToken(res.data.token)
            self.state = !self.state
            alert('注册成功')
          } else {
            alert('注册失败')
          }
        })
      }
    },
    loginUser: function () {
      var self = this
      axios.post(CONFIG.baseURL + 'user/login',
        CONFIG.postHttpData(self.login)
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          CONFIG.setToken(res.data.token)
          CONFIG.setUser(res.data.data)
          self.$router.push('/student')
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
.log-inp select {
  height: 36px;
  width: 100%;
  margin-bottom: 25px;
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
