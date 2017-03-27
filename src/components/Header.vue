<template>
  <div class="header">
    <label class="header-logo">同济大学汽车学院</label>
    <div class="header-medium">
      <label v-for="headerItem in headerMedium.data"><router-link v-bind:to=headerItem[1]>{{headerItem[0]}}</router-link></label>
    </div>
    <label class="header-right" v-if="token == null">
      <router-link v-bind:to="'/login'">登录</router-link>
    </label>
    <label class="header-right" v-if="token != null">
      欢迎,<router-link v-bind:to="'/user'">{{this.user.userName}}&nbsp;{{this.user.name}}</router-link>&nbsp;|&nbsp;
      <router-link v-bind:to="'/login'">退出</router-link>
    </label>
  </div>
</template>
<script>
import CONFIG from 'global/config'
export default {
  name: 'header',
  created: function () {
    this.token = CONFIG.getToken()
    this.user = CONFIG.getUser()
  },
  data () {
    return {
      headerMedium: {selected: 0,
        data: [
          ['生涯规划', '/student'], ['我的项目', '/project'], ['资料下载', '/file'], ['个人资料', '/user']
        ]
      },
      token: null,
      user: null
    }
  }
}
</script>
<style scoped>
.header {
  top: 0;
  left: 0;
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 40px;
  background-color: rgba(105, 109, 111, 0.1);
}
.header label {
  display: block;
  line-height: 40px;
  font-family: "acumin-pro-wide", sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #696D6F;
  letter-spacing: -0.8px;
}
.header a {
  line-height: 40px;
  font-family: "acumin-pro-wide", sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: #696D6F;
  letter-spacing: -0.8px;
  text-decoration: none;
}
.header .header-logo {
  float: left;
  padding-left: 20px;
  box-sizing: border-box;
}
.header .header-right {
  float: right;
  padding-right: 20px;
  box-sizing: border-box;
}
.header .header-medium {
  float: left;
  margin-left: 200px;
  box-sizing: border-box;
}
.header .header-medium label {
  float: left;
  margin-right: 20px;
}

</style>
