<template>

  <div class="pro font-nor">
    <headerCmp></headerCmp>
    <div class="pro-panel" v-if="userPageActive">
      <div class="prouser-hea">
        <div class="prouser-tit">项目成员</div>
        <a class="font-nor" href="javascript:void(0)" v-on:click="showUserPage()">X</a>
      </div>
      <div class="prouser-sea">
          <input placeholder="搜索成员,输入Enter键进行搜索" v-model="search.searchKey" @change="searchChanged">
          <!-- <button class="font-nor">添加</button> -->
          <div class="prouser-sel" v-if="seaUserList.length > 0">
            <div v-for="userInfo in seaUserList" v-on:click="selectUser(userInfo)">{{userInfo.userName}}&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.name}}&nbsp;&nbsp;&nbsp;&nbsp;{{userInfo.mail}}</a></div>
          </div>
      </div>
      <div class="prouser-tab">
        <div class="prouser-lin" v-for="(userInfo,index) in userList">
          <div class="protab-fir">
            <label>{{userInfo.userName}}</label>
            <label>{{userInfo.name}}</label>
            <div class="protab-sec">
              <label v-if="userInfo.mail != null">{{userInfo.mail}}</label>
              <label v-if="userInfo.mail == null">暂无邮箱</label>
            </div>
          </div>
          <div class="protab-las">
            <a href="javascript:void(0)" v-on:click="delUser(index)" class="font-nor">X</a>
          </div>
      </div>
    </div>
  </div>
    <div class="pro-fir">
      <nav class="pro-nav">
          <div class="pro-header">
              <span class="pro-name" v-if="proInfo != null">{{proInfo.name}}</span>
          </div>
          <ul>
            <!-- <li v-bind:class="{ active: proNav.sel == proNavInfo }" v-for="proNavInfo in proNav.list"><a v-on:click="navChange(proNavInfo)">{{proNavInfo}}</a></li> -->
            <li v-for="proNavInfo in proNav.list"><a v-bind:class="{ active: proNavInfo == proNav.sel }" v-on:click="navChange(proNavInfo)">{{proNavInfo}}</a></li>
          </ul>
          <div class="pro-footer">
            <a href="javascript:void(0)" v-on:click="showUserPage()" class="font-blu">用户&nbsp;|&nbsp;&nbsp;{{userList.length}}</a>
          </div>
      </nav>
    </div>
    <div class="pro-task" v-if="proNav.sel == proNav.list[0]">
    <div v-if="proCareer != null">
    <div class="pro-sec" v-for="dataInfo in proCareer.projectPlanForYear">
      <div class="prosec-left">
        <label>{{dataInfo.year}}</label>
      </div>
      <div class="prosec-block">
      <div class="prosec-right" v-for="datayearInfo in dataInfo.projectPlan">
        <div class="prosec-ans" v-stateWatch=datayearInfo.state>
          <label>{{datayearInfo.state | stateFil}}</label>
        </div>
        <div class="prosec-monday font-dan">
          <div class="prosec-mon">{{datayearInfo.plandate | dateMM}}</div>
          <div class="prosec-day">{{datayearInfo.plandate | dateDay}}</div>
          <div><label>(截止)</label></div>
        </div>
          <div class="prosec-top">
          <div class="prosec-title">{{datayearInfo.title}}
          </div>
          <div class="prosec-content">
            &nbsp;&nbsp;&nbsp;&nbsp;{{datayearInfo.content}}
          </div>
          </div>

          <div class="line"></div>
          <div class="prosec-com">
          <div v-if="datayearInfo.state < 0">
            <!-- <button class="prosec-btn1" v-if="datayearInfo.state == -1">点击上传</button> -->
            <div class="prosec-inp1" v-if="datayearInfo.state == -1">
              <a href="javascript:;">
                <input type="file" name="" id="" @change="uploadPlanFile($event,datayearInfo)">点击上传
              </a>
            </div>
            <div class="prosec-inp2" v-if="datayearInfo.state == -2">
              <a href="javascript:;">
                <input type="file" name="" id="" @change="uploadPlanFile($event,datayearInfo)">请尽快上传
              </a>
            </div>
            <!-- <button class="prosec-btn2" v-if="datayearInfo.state == -2">请尽快上传</button> -->
          </div>
          <div v-if="datayearInfo.state >= 0">
            <a v-bind:href="datayearInfo.file.url" target=_blank class="prosec-com1">{{datayearInfo.file.title}}</a>
            <label class="prosec-com2">{{datayearInfo.comdate | dateAll}}</label>
          </div>
          </div>
          <div v-if="datayearInfo.state == 2">
            <div class="line"></div>
            <div class="prosec-bottom">
            <label class="prosec-btm1 font-dan">反馈信息：{{datayearInfo.response}}</label>
            <label class="prosec-btm2">{{datayearInfo.resdate | dateAll}}</label>
            </div>
          </div>
      </div>
    </div>
    </div>
  </div>
  </div>
  <div class="pro-fil" v-if="proNav.sel == proNav.list[1]">
    <div class="profil-fir">
      <div class="profil-lbl">文件库</div>
      <div class="profil-rig">
        <a href="javascript:;">
          <input type="file" name="" id="" @change="uploadFile">点击这里上传文件
        </a>
      </div>
    </div>
    <div class="line"></div>
    <div class="profil-tab">
      <table>
        <tr>
          <th style="width:60%">名称</th>
          <th>创建者</th>
          <th>上传时间</th>
          <th></th>
        </tr>
        <tr v-for="(fileDataInfo, index) in fileList">
          <td><a v-bind:href="fileDataInfo.file.url" target=_blank class="font-nor">{{fileDataInfo.file.title}}</a></td>
          <td>{{fileDataInfo.file.owner}}</td>
          <td>{{fileDataInfo.file.date | dateAll}}</td>
          <td><a href="javascript:void(0)" v-on:click="fileDel(index)" class="font-dan">删除</a></td>
        </tr>
      </table>
    </div>
    <!-- <div class="profil-las">
      <button v-if="fileArgs.curPage != fileData.totalPage" class="font-nor">加载更多</button>
      <label v-if="fileData.curPage == fileData.totalPage">没有更多内容了</label>
    </div> -->
    <div>
      <page v-on:page="changePage" v-bind:args="fileArgs"></page>
    </div>
  </div>
</div>
</template>
<script>
import headerCmp from './Header.vue'
import axios from 'axios'
import CONFIG from 'global/config'
import page from './Page.vue'
export default {
  name: 'projectInfo',
  components: {
    headerCmp,
    page
  },
  methods: {
    navChange: function (value) {
      this.proNav.sel = value
    },
    showUserPage: function () {
      this.userPageActive = !this.userPageActive
    },
    changePage: function (value) {
      this.fileArgs.currentPage = value
      this.getFileList(this.fileArgs)
    },
    searchChanged: function () {
      // console.log(this.search.timer)
      // this.search.timer = setTimeout(, 2000)
      this.getSeaUserList()
    },
    selectUser: function (userInfo) {
      var self = this
      axios.post(CONFIG.baseURL + 'project/addMember', CONFIG.postHttpDataWithToken({projectId: self.proInfo.id, userId: userInfo.id})).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.search.searchKey = null
          self.seaUserList = []
          self.getProUserList(self.proInfo.id)
        } else {
          alert('添加失败')
        }
      })
    },
    getProInfo: function (projectId) {
      var self = this
      axios.get(CONFIG.baseURL + 'project/getById?token=' + CONFIG.getToken() + '&projectId=' + projectId).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.proInfo = Object.assign({}, self.proInfo, res.data.data)
        } else {
          alert('获取失败')
        }
      })
    },
    getProCareer: function (projectId) {
      var self = this
      axios.get(CONFIG.baseURL + 'projectPlan/getProjectPlanList?token=' + CONFIG.getToken() + '&projectId=' + projectId + '&order=0').then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.proCareer = []
          self.proCareer = Object.assign([], self.proCareer, res.data.data)
        } else {
          alert('获取失败')
        }
      })
    },
    getProUserList: function (projectId) {
      var self = this
      axios.get(CONFIG.baseURL + 'project/getMemberList?token=' + CONFIG.getToken() + '&projectId=' + projectId).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.userList = []
          self.userList = Object.assign([], self.userList, res.data.data)
        } else {
          alert('获取失败')
        }
      })
    },
    getSeaUserList: function () {
      var self = this
      axios.get(CONFIG.baseURL + 'user/getUserList?token=' + CONFIG.getToken() + '&keywords=' + self.search.searchKey).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.seaUserList = []
          self.seaUserList = Object.assign([], self.seaUserList, res.data.data)
        } else {
          alert('获取失败')
        }
      })
    },
    getProFileList: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'project/getProjectFileList?token=' + CONFIG.getToken() + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.fileList = []
          self.fileList = Object.assign([], self.fileList, res.data.data)
          self.fileArgs.currentPage = res.data.currentPage
          self.fileArgs.totalPage = res.data.totalPage
        } else {
          alert('获取失败')
        }
      })
    },
    fileDel: function (index) {
      var self = this
      axios.post(CONFIG.baseURL + 'project/deleteProjectFile', CONFIG.postHttpDataWithToken({projectFileId: self.fileList[index].id})).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          alert('删除成功')
          self.fileList.splice(index, 1)
        } else {
          alert('删除失败')
        }
      })
    },
    delUser: function (index) {
      var self = this
      axios.post(CONFIG.baseURL + 'project/removeMember', CONFIG.postHttpDataWithToken({projectId: self.proInfo.id, userId: self.userList[index].id})).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.userList.splice(index, 1)
        } else {
          alert('删除失败')
        }
      })
    },
    uploadPlanFile: function ($event, info) {
      var self = this
      self.file = $event.target.files[0]
      axios.post(CONFIG.baseURL + 'projectPlan/commit',
        CONFIG.postHttpData({token: CONFIG.getToken(), file: self.file, projectPlanId: info.id})
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.getProCareer(self.proInfo.id)
        } else {
          alert('获取失败')
        }
      })
    },
    uploadFile: function ($event) {
      var self = this
      self.file = $event.target.files[0]
      axios.post(CONFIG.baseURL + 'project/uploadProjectFile',
        CONFIG.postHttpData({token: CONFIG.getToken(), file: self.file, projectId: self.proInfo.id})
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.fileArgs.totalPage = -1
          self.fileArgs.currentPage = 1
          self.getProFileList(self.fileArgs)
        } else {
          alert('获取失败')
        }
      })
    }
  },
  created: function () {
    var id = this.$route.params.id
    this.getProInfo(id)
    this.getProCareer(id)
    this.getProUserList(id)
    this.fileArgs.projectId = id
    this.getProFileList(this.fileArgs)
    this.userPageActive = false
  },
  data () {
    return {
      userPageActive: false,
      proInfo: null,
      proNav: {sel: '项目任务', list: ['项目任务', '共享文件']},
      userList: [],
      search: {searchKey: null, timer: null},
      seaUserList: [],
      fileArgs: {
        totalPage: -1,
        numberPerPage: 15,
        currentPage: 1,
        projectId: null
      },
      fileList: [],
      proCareer: null
    }
  }
}
</script>
<style scoped>
.profil-rig a {
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
    /**zoom: 1;*/
    text-decoration: none;
    z-index: 1;
}
.profil-rig  input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    box-shadow: none;
    outline: 0;
    height: 30px;
}
.profil-rig a:hover {
    color: #444;
    background: #eee;
    border-color: #ccc;
    text-decoration: none
}
.profil-rig {
  float: right;
}
.prosec-inp1 a {
    padding: 4px 10px;
    /*line-height: 20px;*/
    position: relative;
    color: white;
    overflow: hidden;
    display: block;
    text-decoration: none;
    height: 28px;
    border: none;
    background-color: #5cb85c;
    border-radius: 4px;
    text-align: center;
}
.prosec-inp1 input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    box-shadow: none;
    outline: 0;
    height: 100%;
}
.prosec-inp1 a:hover {
    color: white;
    background: #50b050;
    text-decoration: none
}
.prosec-inp2 a {
    padding: 4px 10px;
    /*line-height: 20px;*/
    position: relative;
    color: white;
    overflow: hidden;
    display: block;
    text-decoration: none;
    height: 28px;
    border: none;
    background-color: #d9534f;
    border-radius: 4px;
    text-align: center;
}
.prosec-inp2 input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
    width: 100%;
    box-shadow: none;
    outline: 0;
    height: 100%;
}
.prosec-inp2 a:hover {
    color: white;
    background: #d05040;
    text-decoration: none
}
.pro-panel {
  position:fixed;
  width: 350px;
  top:98px;
  right: 0;
  bottom: 0;
  background: #F7F7F7;
  box-shadow: -3px 0 3px rgba(0,0,0,.1);
  padding: 15px 15px;
  z-index: 2;
}
.prouser-lin {
  height: 40px;
  text-align: left;
  padding-top: 10px;
}
.prosec-com1 {
  width: 100%;
  display: block;
  word-wrap:break-word;
}
.prouser-lin:hover {
  background-color: #EEE;
  cursor: pointer;
}
.protab-fir {
  display: inline-block;
  text-align: left;
  font-size: 14px;
  color: black;
}
.protab-sec {
  font-size: 12px;
  color: #A6A6A6;
}
.protab-las {
  padding-top: 5px;
  display: inline-block;
  float: right;
}
.protab-las a {
  text-decoration: none;
  margin-right: 10px;
}
.protab-las a:hover {
  box-shadow: none;
  outline: 0;
  color:#3da8f5;
}
.prouser-sea input {
  width: 100%;
  height: 40px;
  border: 1px solid #D9D9D9;
  font-size: 16px;
  border-radius: 3px;
}
.prouser-sea button {
  border-radius: 3px;
  border:none;
  background-color:#3da8f5;
  height: 36px;
  width: 50px;
  color: white;
}
.prouser-sea button:focus{
  box-shadow: none;
  outline: 0;
}
.prouser-sea input:focus {
  border-color: #A6A6A6;
  box-shadow: none;
  outline: 0;
}
.prouser-sel {
  background-color: white;
  border-radius: 3px;
  border: 1px solid white;
  height: 250px;
  overflow-y: scroll;
  position: absolute;
  width: 352px;
}
.prouser-sel div{
  height: 24px;
  border-bottom: 1px solid #f5f5f5;
  text-align: left;
  padding: 10px;
  cursor: pointer;
}
.prouser-sel div:hover{
  background-color: #eeeeee;
}

.prouser-tit {
  display: inline-block;
}
.prouser-hea {
  height: 50px;
  text-align: center;
  color: #383838;
}
.prouser-hea a {
  float: right;
  text-decoration: none;
}
.prouser-hea a:hover {
  color: #3da8f5;
}
.profil-las {
  height: 44px;
}
.profil-las button {
  margin: auto;
  width: 200px;
  height: 34px;
  border-radius: 3px;
  background-color: #3da8f5;
  border: none;
  color:white;
  font-size: 14px;
}
.pro-footer {
  font-size: 12px;
}
.pro-footer a:hover {
  font-weight: bold;
}
.pro-footer a {
  text-decoration: none;
}
.pro-fil {
  width: 1024px;
  background-color: white;
  border-radius: 3px;
  margin: auto;
}
.profil-fir {
  padding: 18px 20px;
  height: 28px;
}
.profil-lbl {
  float: left;
  font-size: 18px;
}
.profil-rig {
  float: right;
}
.profil-tab {
  padding: 18px 20px;
}
.profil-tab table {
  width: 100%;
  text-align: left;
  border-collapse:collapse;
}
.profil-tab table tr {
  height: 50px;
  border-bottom: 1px solid #D9D9D9;
}
.profil-tab table tr:hover {
  background-color: #f5f5f5;
}
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

.pro-nav {
  height:50px;
  border-bottom: 1px solid #D9D9D9;
}
.pro-nav li {
  list-style: none;
  float: left;
  padding:0 20px;

}
.pro-nav li a:hover,
.pro-nav li a.active{
  border-bottom-color:#3da8f5;
}
.pro-nav li a {
  padding:12px 0;
  display: inline-block;
  color:#383838;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.profir-a {
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  width: 190px;
  text-align: right;
  margin-right: 100px !important;
}
.pro-header {
  float: left;
  width: 400px;
}
.pro-sec {
  width: 1200px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.prosec-left {
  width: 200px;
  text-align: right;
  margin-right: 40px;
  display:inline-block;
  vertical-align: top;
}
.prosec-left label {
  font-family: "bodoni-urw", serif;
  font-weight: 800;
  font-size: 62px;
  letter-spacing: -3px;
}
.pro-footer {
  float: right;
}
.prosec-right {
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
.prosec-block {
  background-color : white;
  display: inline-block;
  min-height: 400px;
  width: 830px;
  border-radius: 8px;
  padding: 20px;

}
.prosec-top {
  /*min-height: 70px;*/
  min-height: 100px;
  display: inline-block;
  width: 150px;
}
.prosec-monday {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  vertical-align: top;
}
.prosec-monday label {
  font-size: 10px;
}
.prosec-mon {
  font-size: 14px;
  height: 14px;
}
.prosec-com {
  margin-right: 2px;
  padding-left: 10px;
  margin-top:10px;
  margin-bottom: 10px;
}
.prosec-ans {
  float: right;
  font-size: 10px;
  /*background-color: rgba(200, 200, 200, 0.5);*/
  padding: 3px;
  border-radius: 3px;
}
.prosec-com2 {
  font-size: 10px;
  float: right;
}
.prosec-day {
  font-size: 32px;
  height: 32px;
}
.prosec-title {
  font-weight: bold;
  word-wrap: break-word;
}
.prosec-content {
  font-size: 10px;
  /*display: inline-block;*/
  word-wrap: break-word;
}
.prosec-bottom {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.prosec-btm2 {
  font-size: 10px;
  float: right;
}
</style>
