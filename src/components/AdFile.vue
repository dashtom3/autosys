<template>
  <div class="adf font-nor">
  <sidebar></sidebar>
  <div class="adf-adf">
    <div class="adfadf-fir">
      <div class="adfadf-lbl">共享资料</div>
      <div class="adfadf-rig">
        <a href="javascript:;">
          <input type="file" name="" id="" @change="uploadFile">点击这里上传文件
        </a>
      </div>
    </div>
    <div class="line"></div>
    <div class="adfadf-tab">
      <table>
        <tr>
          <th>编号</th>
          <th>文件名</th>
          <th>描述</th>
          <th>上传日期</th>
          <th></th>
        </tr>
        <tr v-for="(fileInfo,index) in fileList">
          <td>{{fileInfo.file.id}}</td>
          <td><a v-bind:href="fileInfo.file.url" target="_blank">{{fileInfo.file.title}}</a></td>
          <td>{{fileInfo.file.content}}</td>
          <td>{{fileInfo.file.date | dateAll}}</td>
          <td><a href="javascript:void(0)" v-on:click="adfeDel(index)" class="font-nor">删除</a></td>
        </tr>
      </table>
    </div>
    <div>
      <page v-on:page="changePage" v-bind:args="args"></page>
    </div>
  </div>
</div>
</template>
<script>
import sidebar from './Sidebar.vue'
import page from './Page.vue'
import axios from 'axios'
import CONFIG from 'global/config'
export default {
  name: 'adfser',
  components: {
    sidebar,
    page
  },
  created: function () {
    // self.args.today = new Date().getFullYear()
    this.getFileList(this.args)
  },
  methods: {
    getFileList: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'material/getMaterialList?token=' + CONFIG.getToken() + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.fileList = []
          self.fileList = Object.assign([], self.fileList, res.data.data)
          self.args.currentPage = res.data.currentPage
          self.args.totalPage = res.data.totalPage
        } else {
          alert('获取失败')
        }
      })
    },
    changePage: function (value) {
      this.args.currentPage = value
      this.getFileList(this.args)
    },
    adfeDel: function (value) {
      var self = this
      axios.get(CONFIG.baseURL + 'material/delete?id=' + self.fileList[value].id + '&token=' + CONFIG.getToken()).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          alert('删除成功')
          self.fileList.splice(value, 1)
          console.log(self.fileList)
        } else {
          alert('删除失败')
        }
      })
    },
    uploadFile: function ($event) {
      var self = this
      self.file = $event.target.files[0]
      axios.post(CONFIG.baseURL + 'material/upload',
        CONFIG.postHttpData({token: CONFIG.getToken(), file: self.file})
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.args.totalPage = -1
          self.args.currentPage = 1
          self.getFileList(self.args)
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
.adfadf-rig a {
    padding: 4px 10px;
    height: 20px;
    line-height: 20px;
    position: relative;
    cursor: pointer;
    color: #888;
    background: #fafafa;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    text-decoration: none;
}
.adfadf-rig  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;;
    box-shadow: none;
    outline: 0;
    height: 30px;
}
.adfadf-rig a:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}
.adfadf-rig {
  float: right;
}
.adf {
  margin-top: -50px;
}
.adfadf-las {
  height: 44px;
}
.adfadf-las button {
  margin: auto;
  width: 200px;
  height: 34px;
  border-radius: 3px;
  background-color: #3da8f5;
  border: none;
  color:white;
  font-size: 14px;
}
.adf-mid{
  text-align: left;
  padding: 10px 20px;
}
.adfmid-sel {
  display: inline-block;
}
.adfmid-sel select {
  height: 36px;
}
.adfmid-sea {
  display: inline-block;
  float: right;
}
.adfmid-sea input {
  height: 36px;
  width: 150px;
  border-radius: 3px;
  border: 1px solid #eeeeee;
  font-size: 14px;
}
.adfmid-sea input:focus {
  box-shadow: none;
  outline: 0;
}
.adfmid-sea button {
  height: 36px;
  width: 60px;
  border: 1px solid #eeeeee;
  background-color: transparent;
  border-radius: 3px;
}
.adfmid-sea button:focus {
  box-shadow: none;
  outline: 0;
}

.adf-adf {
  width: 1024px;
  background-color: white;
  border-radius: 3px;
  margin: auto;
  margin-left: 200px;
}
.adfadf-fir {
  padding: 18px 20px;
  height: 28px;
}
.adfadf-lbl {
  float: left;
  font-size: 18px;
}
.adfadf-tab {
  padding: 18px 20px;
}
.adfadf-tab table {
  width: 100%;
  text-align: left;
  border-collapse:collapse;
}
.adfadf-tab table tr {
  height: 50px;
  border-bottom: 1px solid #D9D9D9;
}
.adfadf-tab table tr:hover {
  background-color: #f5f5f5;
}
.adf-fir {
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.adf-fir label {
  margin-right: 8px;
  font-weight: bold;
}

.adf-nav {
  height:50px;
  border-bottom: 1px solid #D9D9D9;
}
.adf-nav li {
  list-style: none;
  float: left;
  padding:0 20px;

}
.adf-nav li a:hover,
.adf-nav li a.active{
  border-bottom-color:#3da8f5;
}
.adf-nav li a {
  padding:12px 0;
  display: inline-block;
  color:#383838;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.adffir-a {
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  width: 190px;
  text-align: right;
  margin-right: 100px !important;
}
.adf-header {
  float: left;
  width: 400px;
}
.adf-sec {
  width: 1200px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.adfsec-left {
  width: 200px;
  text-align: right;
  margin-right: 40px;
  display:inline-block;
  vertical-align: top;
}
.adfsec-left label {
  font-family: "bodoni-urw", serif;
  font-weight: 800;
  font-size: 62px;
  letter-spacing: -3px;
}
.adf-footer {
  float: right;
}
.adfsec-right {
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
.adfsec-block {
  background-color : white;
  display: inline-block;
  min-height: 400px;
  width: 900px;
  border-radius: 8px;
  padding: 20px;

}
.adfsec-top {
  /*min-height: 70px;*/
  display: inline-block;
  width: 150px;
}
.adfsec-monday {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  vertical-align: top;
}
.adfsec-monday label {
  font-size: 10px;
}
.adfsec-mon {
  font-size: 14px;
  height: 14px;
}
.adfsec-com {
  margin-right: 2px;
  padding-left: 10px;
  margin-top:10px;
  margin-bottom: 10px;
}
.adfsec-btn1 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #5cb85c;
  color:white;
  border-radius: 4px;
}
.adfsec-btn2 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #d9534f;
  color:white;
  border-radius: 4px;
}
.adfsec-ans {
  float: right;
  font-size: 10px;
  /*background-color: rgba(200, 200, 200, 0.5);*/
  padding: 3px;
  border-radius: 3px;
}
.adfsec-com2 {
  font-size: 10px;
  float: right;
}
.adfsec-day {
  font-size: 32px;
  height: 32px;
}
.adfsec-title {
  font-weight: bold;
}
.adfsec-content {
  font-size: 10px;
  display: inline-block;
}
.adfsec-bottom {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.adfsec-btm2 {
  font-size: 10px;
  float: right;
}
</style>
