<template>
  <div class="login">
    <headerCmp></headerCmp>
    <!-- <div class="log-fir"><h1>项目生涯规划系统</h1> -->
    <!-- </div> -->
    <div class="log-sec"><h3>个人资料</h3>
      <div class="log-btn">
        <button v-on:click="changePass">修改密码</button>
        <button v-on:click="changeUser">修改资料</button>
      </div>
    </div>
    <div>
      <div class="log-inp">
        <!-- <input type="text" class="font-nor" placeholder="请输入工号/学号" v-model="user.userName"> -->
        <h4>学号：{{user.userName}}</h4>
      </div>
      <div class="log-inp">
        <h4>姓名：{{user.name}}</h4>
        <!-- <input type="text" class="font-nor" placeholder="请输入姓名" v-model="user.name"> -->
      </div>
      <div class="log-inp">
        <!-- <select v-model="user.schoolYear">
          <option value="null">请选择年级</option>
          <option v-for="n in 20">{{n + 2016 - 10}}</option>
        </select> -->
        <h4>年级：{{user.schoolYear}}</h4>
      </div>
      <div class="log-inp" v-if="state == true">
        <h4>邮箱：{{user.email}}</h4>
      </div>
      <div class="log-inp" v-if="state == false">
        邮箱：<input type="text" class="font-nor" placeholder="请输入邮箱(重要!有学期规划提醒)" v-model="user.email">
      </div>
      <!-- <div class="line"></div> -->
      <div class="log-reg" v-if="state == false">
        <label><a href="javascript:void(0)" v-on:click="changeCertain">确定</a></label>&nbsp;&nbsp;&nbsp;&nbsp;
        <label><a href="javascript:void(0)" v-on:click="changeState">取消</a></label>
      </div>
      <div v-if="passState == false">
        <div class="log-inp">
          <input type="password" class="font-nor" placeholder="请输入原密码" v-model="password.oldPassword">
        </div>
        <div class="log-inp">
          <input type="password" class="font-nor" placeholder="请输入新密码" v-model="password.newPassword">
        </div>
        <div class="log-inp">
          <input type="password" class="font-nor" placeholder="请再次输入新密码" v-model="password.rePassword">
        </div>
        <div class="log-reg">
          <label><a href="javascript:void(0)" v-on:click="changePassCertain">确定</a></label>&nbsp;&nbsp;&nbsp;&nbsp;
          <label><a href="javascript:void(0)" v-on:click="changePass">取消</a></label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import headerCmp from './Header.vue'
import CONFIG from 'global/config'
export default {
  name: 'user',
  components: {
    headerCmp
  },
  created: function () {
    if (CONFIG.getUser() != null) {
      this.user = CONFIG.getUser()
    }
  },
  data () {
    return {
      state: true,
      passState: true,
      password: {
        oldPassword: null,
        newPassword: null,
        rePassword: null
      },
      user: {
        userName: null,
        password: null,
        name: null,
        email: null,
        schoolYear: null
      }
    }
  },
  methods: {
    changeUser: function () {
      this.state = !this.state
    },
    changeState: function () {
      if (CONFIG.getUser() != null) {
        this.user = CONFIG.getUser()
      }
      this.changeUser()
    },
    changePass: function () {
      this.passState = !this.passState
    },
    changePassCertain: function () {
      this.changePassword()
    },
    changeCertain: function () {
      this.changeUserInfo()
    },
    changeUserInfo: function () {
      var self = this
      axios.post(CONFIG.baseURL + 'user/update',
        CONFIG.postHttpDataWithToken(self.user)
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.state = !self.state
        } else {
          alert('修改失败')
        }
      })
    },
    changePassword: function () {
      if (this.password.rePassword !== this.password.newPassword) {
        alert('重复密码不正确')
      } else {
        var self = this
        axios.post(CONFIG.baseURL + 'user/changePwd',
          CONFIG.postHttpDataWithToken(self.password)
        ).then(function (res) {
          if (res.data.callStatus === 'SUCCEED') {
            self.passState = !self.passState
            alert('修改成功')
          } else {
            alert('密码错误')
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  width: 500px;
  margin: 100px auto 0 auto;
  text-align: left;
}
.log-inp input {
  width: 250px;
  margin-bottom: 25px;
  padding: 12px;
  font-size: 16px;
  line-height: 20px;
  height: 16px;
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
.log-sec h3 {
  display: inline-block;
}
.log-btn {
  display: inline-block;
  float: right;
}
.log-btn button {
  width: 100px;
  padding: 5px;
  float: right;
  margin-right: 10px;
  font-size: 16px;
  line-height: 14px;
  height: 32px;
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
.log-reg label {
  color:#A6A6A6;
}
.log-reg a {
  text-decoration: none;
  color:#03a9f4;
}
</style>
