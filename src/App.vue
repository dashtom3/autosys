<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <headerCmp></headerCmp>
    <router-view></router-view>
    <!-- Footer -->
  </div>
</template>

<script>
import headerCmp from './components/Header.vue'
// import Footer from './Footer.vue'
export default {
  name: 'app',
  components: {
    headerCmp
  }
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
.border-nor {
  border: 1px solid #696D6F;
}
.border-suc {
  border: 1px solid #5cb85c;
}
.border-war {
  border: 1px solid #f0ad4e;
}
.border-dan {
  border: 1px solid #d9534f;
}
</style>
