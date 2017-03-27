<template>
  <div class="sidebar">
    <label class="sidebar-logo"><router-link v-bind:to="'/student'">同济大学汽车学院</router-link></label>
    <div class="sidebar-medium">
      <div class="sidebar-content" v-for="headerItem in headerMedium.data"><router-link v-bind:to=headerItem[1] class="font-nor">{{headerItem[0]}}</router-link></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'header',
  data () {
    return {
      headerMedium: {selected: 0,
        data: [
          ['学生规划管理', '/adUser'], ['学生规划审核', '/adPlan'], ['项目规划管理', '/adProject'], ['项目规划审核', '/adProplan'], ['共享资料', '/adFile']
        ]
      }
    }
  }
}
</script>
<style scoped>
.sidebar {
  top: 0;
  left: 0;
  position: fixed;
  width: 200px;
  height: 100%;
  background-color: #2f4050;
  padding-top: 50px;
  color: white;
}
.sidebar-logo a {
  line-height: 40px;
  font-family: "acumin-pro-wide", sans-serif;
  font-weight: 800;
  font-size: 16px;
  color: white;
  letter-spacing: -0.8px;
  /*text-decoration: none;*/
}
.sidebar-logo {
  padding-left: 20px;
  box-sizing: border-box;
  margin: 20px 20px;
}
.header .header-right {
  float: right;
  padding-right: 20px;
  box-sizing: border-box;
}
.sidebar-medium {
  margin-top: 50px;
  box-sizing: border-box;
  text-align: left;
}
.sidebar-content {
  width: 180px;
  padding: 10px 0px 10px 20px;
}
.sidebar-content:hover {
  background-color: #293846;
}
.sidebar-medium a:hover {
  color: white;
}
.sidebar-medium a{
  text-decoration: none;
  height: 46px;
  width: 220px;
  color: #a7b1c2;
}
</style>
