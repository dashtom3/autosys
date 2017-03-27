<template>
  <div class="fil font-nor">
  <headerCmp></headerCmp>
  <div class="fil-fil">
    <div class="filfil-fir">
      <div class="filfil-lbl">资料文件</div>
    </div>
    <div class="line"></div>
    <div class="filfil-tab">
      <table>
        <tr>
          <th>编号</th>
          <th>文件名</th>
          <th>描述</th>
          <th>上传日期</th>
        </tr>
        <tr v-for="(fileInfo,index) in fileList">
          <td>{{fileInfo.file.id}}</td>
          <td><a v-bind:href="fileInfo.file.url" target="_blank">{{fileInfo.file.title}}</a></td>
          <td>{{fileInfo.file.content}}</td>
          <td>{{fileInfo.file.date | dateAll}}</td>
        </tr>
      </table>
    </div>
    <div class="filfil-las">
      <button v-if="args.currentPage != args.totalPage" class="font-nor" v-on:click="loadMore">加载更多</button>
      <label v-if="args.currentPage == args.totalPage">没有更多内容了</label>
    </div>
  </div>
</div>
</template>
<script>
import headerCmp from './Header.vue'
// import page from './Page.vue'
import axios from 'axios'
import CONFIG from 'global/config'
export default {
  name: 'project',
  components: {
    headerCmp
  },
  created: function () {
    this.getFileList(this.args)
  },
  methods: {
    navChange: function (value) {
      this.filNav.sel = value
    },
    loadMore: function () {
      this.args.currentPage++
      this.getFileList(this.args)
    },
    getFileList: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'material/getMaterialList?token=' + CONFIG.token + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.fileList = self.fileList.concat(res.data.data)
          // self.fileList = Object.assign([], self.fileList, res.data.data)
          self.args.currentPage = res.data.currentPage
          self.args.totalPage = res.data.totalPage
        } else {
          alert('获取失败')
        }
      })
    }
  },
  data () {
    return {
      fileList: [],
      args: {
        totalPage: -1,
        numberPerPage: 15,
        currentPage: 1
      }
    }
  }
}
</script>
<style scoped>
.filfil-las {
  height: 44px;
}
.filfil-las button {
  margin: auto;
  width: 200px;
  height: 34px;
  border-radius: 3px;
  background-color: #3da8f5;
  border: none;
  color:white;
  font-size: 14px;
}
.fil-fil {
  width: 1024px;
  background-color: white;
  border-radius: 3px;
  margin: auto;
}
.filfil-fir {
  padding: 18px 20px;
  height: 28px;
}
.filfil-lbl {
  float: left;
  font-size: 18px;
}
.filfil-rig {
  float: right;
}
.filfil-tab {
  padding: 18px 20px;
}
.filfil-tab table {
  width: 100%;
  text-align: left;
  border-collapse:collapse;
}
.filfil-tab table tr {
  height: 50px;
  border-bottom: 1px solid #D9D9D9;
}
.filfil-tab table tr:hover {
  background-color: #f5f5f5;
}
.fil-fir {
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.fil-fir label {
  margin-right: 8px;
  font-weight: bold;
}

.fil-nav {
  height:50px;
  border-bottom: 1px solid #D9D9D9;
}
.fil-nav li {
  list-style: none;
  float: left;
  padding:0 20px;

}
.fil-nav li a:hover,
.fil-nav li a.active{
  border-bottom-color:#3da8f5;
}
.fil-nav li a {
  padding:12px 0;
  display: inline-block;
  color:#383838;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.filfir-a {
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  width: 190px;
  text-align: right;
  margin-right: 100px !important;
}
.fil-header {
  float: left;
  width: 400px;
}
.fil-sec {
  width: 1200px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.filsec-left {
  width: 200px;
  text-align: right;
  margin-right: 40px;
  display:inline-block;
  vertical-align: top;
}
.filsec-left label {
  font-family: "bodoni-urw", serif;
  font-weight: 800;
  font-size: 62px;
  letter-spacing: -3px;
}
.fil-footer {
  float: right;
}
.filsec-right {
  width: 250px;
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  padding: 5px;
  margin-bottom: 10px;
}
.filsec-block {
  background-color : white;
  display: inline-block;
  min-height: 400px;
  width: 900px;
  border-radius: 8px;
  padding: 20px;

}
.filsec-top {
  /*min-height: 70px;*/
  display: inline-block;
  width: 150px;
}
.filsec-monday {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  vertical-align: top;
}
.filsec-monday label {
  font-size: 10px;
}
.filsec-mon {
  font-size: 14px;
  height: 14px;
}
.filsec-com {
  margin-right: 2px;
  padding-left: 10px;
  margin-top:10px;
  margin-bottom: 10px;
}
.filsec-btn1 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #5cb85c;
  color:white;
  border-radius: 4px;
}
.filsec-btn2 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #d9534f;
  color:white;
  border-radius: 4px;
}
.filsec-ans {
  float: right;
  font-size: 10px;
  /*background-color: rgba(200, 200, 200, 0.5);*/
  padding: 3px;
  border-radius: 3px;
}
.filsec-com2 {
  font-size: 10px;
  float: right;
}
.filsec-day {
  font-size: 32px;
  height: 32px;
}
.filsec-title {
  font-weight: bold;
}
.filsec-content {
  font-size: 10px;
  display: inline-block;
}
.filsec-bottom {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.filsec-btm2 {
  font-size: 10px;
  float: right;
}
</style>
