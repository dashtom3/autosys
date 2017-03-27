<template>

  <div class="pro font-nor">
    <headerCmp></headerCmp>
    <div class="pro-fir">
      <label class="profir-a">所有项目</label>
    </div>
    <div class="pro-sec">
      <div class="prosec-block" v-for="dataInfo in ProList" v-on:click="pageProInfo(dataInfo.id)">
        <div class="prosec-info">
          <label>{{dataInfo.name}}</label>
          <label class="prosec-late font-suc" v-if="dataInfo.planCount > 0">已有规划</label>
          <label class="prosec-late font-dan" v-if="dataInfo.planCount == 0">暂无规划</label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import headerCmp from './Header.vue'
import axios from 'axios'
import CONFIG from 'global/config'
export default {
  name: 'project',
  components: {
    headerCmp
  },
  created: function () {
    this.getProList(self.args)
  },
  data () {
    return {
      ProList: []
    }
  },
  methods: {
    pageProInfo: function (value) {
      this.$router.push('/project/' + value)
    },
    getProList: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'project/getProjectList?token=' + CONFIG.getToken() + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.ProList = []
          self.ProList = Object.assign([], self.ProList, res.data.data)
          self.args.currentPage = res.data.currentPage
          self.args.totalPage = res.data.totalPage
        } else {
          alert('获取失败')
        }
      })
    },
    args: {
      name: null,
      totalPage: -1,
      numberPerPage: 10,
      currentPage: 1
    }
  }
}
</script>
<style scoped>
.pro-fir {
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.pro-fir label {
  margin-right: 8px;
  font-weight: bold;
}
.profir-a {
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  width: 190px;
  text-align: right;
  margin-right: 100px !important;
}
.pro-sec {
  margin: auto;
  width: 1024px;
}
.prosec-block {
  width: 272px;
  height: 136px;
  margin: 14px;
  text-align: left;
  display: inline-block;
  float:left;
  background-image: url('../assets/project.jpg');
  cursor: pointer;
  background-color: #74bbd8;
  transform: translate3d(0,0,0);
  transition: box-shadow ease-in-out 218ms,transform 218ms ease-in-out,-webkit-transform 218ms ease-in-out;
  border-radius: 4px;
  box-shadow: rgba(0,0,0,.0470588) 0 2px 3px 0;
}
.prosec-info {
  background-image: linear-gradient(to bottom,rgba(0,0,0,.3) 0,rgba(0,0,0,0) 100%);
  color:#fff;
  padding:10px 15px 50px;
  border-top-right-radius:4px;
  border-top-left-radius:4px;
}
.prosec-block:hover {
  transform: translate3d(0,-5px,0);
  box-shadow: 0 7px 21px rgba(0,0,0,.15);
}
.prosec-late {
  position:absolute;
  bottom: 10px;
  font-size: 12px;
  /*float: right;*/
  font-weight: bold;
  right: 5px;
}
</style>
