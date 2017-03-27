<template>
  <div class="adu font-nor">
  <sidebar></sidebar>
  <div class="adu-adu">
    <div class="aduadu-fir">
      <div class="aduadu-lbl">规划列表</div>
    </div>
    <div class="line"></div>
    <div class="adu-mid">
      <div class="adumid-sel">
        <label>项目规划状态&nbsp;</label>
        <select v-model="args.state" v-on:change="selectState">
          <option value="-2">已逾期</option>
          <option value="-1">未提交</option>
          <option value="0">待审核</option>
          <option value="1">已完成</option>
          <option value="2">已退回</option>
        </select>
      </div>
      <!-- <div class="adumid-sea">
        <input type = "text" placeholder="搜索学号" v-model="args.userId">
        <button v-on:click="selectSearch">搜索</button>
      </div> -->
    </div>
    <div class="line"></div>
    <div class="aduadu-tab">
      <table>
        <tbody>
        <tr>
          <th width="10%">标题</th>
          <th width="10%">内容</th>
          <th width="8%">状态</th>
          <th width="10%">文件</th>
          <th width="15%">计划提交日期</th>
          <th width="15%">提交日期</th>
          <th width="15%">反馈日期</th>
          <th width="10%">反馈信息</th>
          <th></th>
        </tr>
      </tbody>
        <tbody v-for="userYearCareerInfo in userCareer.projectPlanForYear">
          <tr v-for="userCareerInfo in userYearCareerInfo.projectPlan">
            <td width="10%">{{userCareerInfo.title}}</td>
            <td width="10%">{{userCareerInfo.content}}</td>
            <td width="8%" class="font-dan">{{userCareerInfo.state | stateFil}}</td>
            <td width="10%" ><a v-bind:href="userCareerInfo.file.url" target=_blank>{{userCareerInfo.file.title}}</a></td>
            <td width="15%" v-if="userCareerInfo.plandate != null">{{userCareerInfo.plandate | dateAll}}</td>
            <td width="15%" v-if="userCareerInfo.plandate == null">暂无</td>
            <td width="15%" v-if="userCareerInfo.comdate != null">{{userCareerInfo.comdate | dateAll}}</td>
            <td width="15%" v-if="userCareerInfo.comdate == null">暂无</td>
            <td width="15%" v-if="userCareerInfo.resdate != null">{{userCareerInfo.resdate | dateAll}}</td>
            <td width="15%" v-if="userCareerInfo.resdate == null">暂无</td>
            <td width="10%" v-if="userCareerInfo.response != null">{{userCareerInfo.response}}</td>
            <td width="10%" v-if="userCareerInfo.response == null">暂无</td>
            <td width="10%" class="adp-opr"><a href="javascript:void(0)" v-on:click="passUserCareer(userCareerInfo)" class="font-suc" v-if="userCareerInfo.state == 0">通过</a>
            <a href="javascript:void(0)" v-on:click="backUserCareer(userCareerInfo)" class="font-dan" v-if="userCareerInfo.state == 0">退回</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="screen-out" v-if="showBackPage == true">
      <div class="backdiv">
      <div>
        <label>退回信息</label>
      </div>
      <div class="line"></div>
      <div>
        <textarea placeholder="请输入退回原因" v-model="verify.response"></textarea>
      </div>
      <div>
        <label>设置重新提交规划信息</label>
      </div>
      <div class="line"></div>
      <div>
        <input type="text" placeholder="规划标题" v-model="userCareerAdd.title">
        <input type="text" placeholder="规划内容" v-model="userCareerAdd.content">
        <el-date-picker type="date" placeholder="Pick a day" v-model="userCareerAdd.plandateStr" class="backdate"></el-date-picker>
      </div>
      <div style="text-align:right">
        <button v-on:click="clickCertain">确定</button>
        <button v-on:click="backUserCareer(null)">取消</button>
      </div>
      </div>
    </div>
    <!-- <div>
      <page v-on:page="changePage" v-bind:args="args"></page>
    </div> -->
  </div>
</div>
</template>
<script>
import sidebar from './Sidebar.vue'
import page from './Page.vue'
import axios from 'axios'
import CONFIG from 'global/config'
export default {
  name: 'adUser',
  components: {
    sidebar,
    page
  },
  created: function () {
    // self.args.today = new Date().getFullYear()
    this.getUserCareer(this.args)
  },
  methods: {
    passUserCareer: function (userCareerInfo) {
      this.verify.projectPlanId = userCareerInfo.id
      this.verify.state = 1
      this.verifyUserCareer(this.verify)
    },
    backUserCareer: function (userCareerInfo) {
      if (userCareerInfo != null) {
        this.verify.projectPlanId = userCareerInfo.id
        this.userCareerAdd.projectId = userCareerInfo.projectId
      }
      this.showBackPage = !this.showBackPage
    },
    clickCertain: function () {
      if (this.userCareerAdd.plandateStr != null && this.userCareerAdd.title != null && this.verify.response != null) {
        this.verify.state = 2
        this.verifyUserCareer(this.verify)
        this.addUserCareer()
      }
    },
    verifyUserCareer: function (data) {
      var self = this
      axios.post(CONFIG.baseURL + 'projectPlan/verify', CONFIG.postHttpDataWithToken(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.getUserCareer(self.args)
        } else {
          alert('获取失败')
        }
      })
    },
    addUserCareer: function () {
      var temp = new Date(this.userCareerAdd.plandateStr)
      this.userCareerAdd.plandateStr = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate()
      this.addUserCareerInfo(this.userCareerAdd)
    },
    addUserCareerInfo: function (data) {
      var self = this
      axios.post(CONFIG.baseURL + 'projectPlan/add', CONFIG.postHttpDataWithToken(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.showBackPage = !self.showBackPage
        }
      })
    },
    getUserCareer: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'projectPlan/getProjectPlanList?token=' + CONFIG.getToken() + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.userCareer = []
          self.userCareer = Object.assign([], self.userCareer, res.data.data)
        } else {
          alert('获取失败')
        }
      })
    },
    selectState: function () {
      this.getUserCareer(this.args)
    }
  },
  data () {
    return {
      userCareer: [],
      args: {
        projectId: null,
        state: 0
      },
      verify: {
        projectPlanId: null,
        state: null,
        response: null
      },
      showBackPage: false,
      userCareerAdd: {
        projectId: null,
        title: null,
        content: '',
        plandateStr: null
      }
    }
  }
}
</script>
<style scoped>
.backdiv {
  width: 400px;
  margin: auto;
  margin-top: 100px;
  background: white;
  border-radius: 3px;
  border: 1px solid #eeeeee;
  padding: 10px;
  text-align: left;
}
.backdiv textarea {
  width: 100%;
  height: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  outline: 0;
  font-size: 14px;
  border: 1px solid #eeeeee;
}
.backdiv input {
  height: 32px;
  border-radius: 3px;
  border: 1px solid #bfcbd9;
  outline: 0;
  box-shadow: none;
  width: 100%;
  margin-top: 10px;
}
.backdiv  input:hover,
.backdiv  input:active{
  border-color:#20a0ff
}
.backdate {
  margin-top: 10px;
  width: 100%;
  margin-bottom: 10px;
}
.backdiv button {
  height: 32px;
  width: 100px;
  background-color: #3DA8F5;
  border: none;
  color: white;
  font-size: 14px;
  margin-right: 5px;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: 0;
}
.adp-opr a{
  display: block;
}
.aduadu-las {
  height: 44px;
}
.aduadu-las button {
  margin: auto;
  width: 200px;
  height: 34px;
  border-radius: 3px;
  background-color: #3da8f5;
  border: none;
  color:white;
  font-size: 14px;
}
.adu-mid{
  text-align: left;
  padding: 10px 20px;
}
.adumid-sel {
  display: inline-block;
}
.adumid-sel select {
  height: 36px;
}
.adumid-sea {
  display: inline-block;
  float: right;
}
.adumid-sea input {
  height: 36px;
  width: 150px;
  border-radius: 3px;
  border: 1px solid #eeeeee;
  font-size: 14px;
}
.adumid-sea input:focus {
  box-shadow: none;
  outline: 0;
}
.adumid-sea button {
  height: 36px;
  width: 60px;
  border: 1px solid #eeeeee;
  background-color: transparent;
  border-radius: 3px;
}
.adumid-sea button:focus {
  box-shadow: none;
  outline: 0;
}
.adu-adu {
  width: 1024px;
  background-color: white;
  border-radius: 3px;
  margin: auto;
  margin-left: 200px;
}
.aduadu-fir {
  padding: 18px 20px;
  height: 28px;
}
.aduadu-lbl {
  float: left;
  font-size: 18px;
}
.aduadu-tab {
  padding: 18px 20px;
}
.aduadu-tab table {
  width: 100%;
  text-align: left;
  border-collapse:collapse;
  table-layout: fixed;
}
.aduadu-tab table tr {
  height: 50px;
  border-bottom: 1px solid #D9D9D9;
}
.aduadu-tab table tr:hover {
  background-color: #f5f5f5;
}
.adu-fir {
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.adu-fir label {
  margin-right: 8px;
  font-weight: bold;
}

.adu-nav {
  height:50px;
  border-bottom: 1px solid #D9D9D9;
}
.adu-nav li {
  list-style: none;
  float: left;
  padding:0 20px;

}
.adu-nav li a:hover,
.adu-nav li a.active{
  border-bottom-color:#3da8f5;
}
.adu-nav li a {
  padding:12px 0;
  display: inline-block;
  color:#383838;
  cursor: pointer;
  border-bottom: 3px solid transparent;
}
.adufir-a {
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  width: 190px;
  text-align: right;
  margin-right: 100px !important;
}
.adu-header {
  float: left;
  width: 400px;
}
.adu-sec {
  width: 1200px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.adusec-left {
  width: 200px;
  text-align: right;
  margin-right: 40px;
  display:inline-block;
  vertical-align: top;
}
.adusec-left label {
  font-family: "bodoni-urw", serif;
  font-weight: 800;
  font-size: 62px;
  letter-spacing: -3px;
}
.adu-footer {
  float: right;
}
.adusec-right {
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
.adusec-block {
  background-color : white;
  display: inline-block;
  min-height: 400px;
  width: 900px;
  border-radius: 8px;
  padding: 20px;

}
.adusec-top {
  /*min-height: 70px;*/
  display: inline-block;
  width: 150px;
}
.adusec-monday {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  vertical-align: top;
}
.adusec-monday label {
  font-size: 10px;
}
.adusec-mon {
  font-size: 14px;
  height: 14px;
}
.adusec-com {
  margin-right: 2px;
  padding-left: 10px;
  margin-top:10px;
  margin-bottom: 10px;
}
.adusec-btn1 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #5cb85c;
  color:white;
  border-radius: 4px;
}
.adusec-btn2 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #d9534f;
  color:white;
  border-radius: 4px;
}
.adusec-ans {
  float: right;
  font-size: 10px;
  /*background-color: rgba(200, 200, 200, 0.5);*/
  padding: 3px;
  border-radius: 3px;
}
.adusec-com2 {
  font-size: 10px;
  float: right;
}
.adusec-day {
  font-size: 32px;
  height: 32px;
}
.adusec-title {
  font-weight: bold;
}
.adusec-content {
  font-size: 10px;
  display: inline-block;
}
.adusec-bottom {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.adusec-btm2 {
  font-size: 10px;
  float: right;
}
</style>
