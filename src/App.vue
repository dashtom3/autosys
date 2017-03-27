<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
    <!-- Footer -->
  </div>
</template>

<script>
// import Footer from './Footer.vue'
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #f5f5f5;
}
table {
  table-layout: fixed;
}
table td {
  word-wrap: break-word;
}
a {
  text-decoration: none;
}
#alertMsg {
            display: none;
            width: 400px;
            border: 1px solid #ddd;
            border-radius: 5px;
            box-shadow: 1px 1px 10px black;
            padding: 10px;
            font-size: 12px;
            position: absolute;
            text-align: center;
            background: #fff;
            z-index: 100000;
}
#alertMsg_info {
    padding: 2px 15px;
    line-height: 1.6em;
    text-align: left;
}
.line {
  width: 100%;
  height: 1px;
  background-color: #cccccc;
}
.screen-out {
  background-color: rgba(40, 40, 40, 0.5);
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  text-align: center;
}
.font-nor {
  color:#696D6F;
}
.font-suc {
  color:#5cb85c;
}
.font-war {
  color:#f0ad4e;
}
.font-dan {
  color:#d9534f;
}
.font-blu {
  color:#3da8f5;
}
.border-nor {
  border-top: 3px solid #696D6F;
}
.border-suc {
  border-top: 3px solid #5cb85c;
}
.border-war {
  border-top: 3px solid #f0ad4e;
}
.border-dan {
  border-top: 3px solid #d9534f;
}
</style>
