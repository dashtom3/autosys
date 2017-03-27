<template>
  <div class="adu font-nor">
  <sidebar></sidebar>
  <div class="adu-adu">
    <div class="aduadu-fir">
      <div class="aduadu-lbl">用户列表</div>
      <label><a href="javascript:void(0)" v-on:click="addUsersCareer">批量添加用户规划</a></label>
    </div>
    <div class="line"></div>
    <div class="adu-mid">
      <div class="adumid-sel">
        <label>筛选：</label>
        <label>选择年级&nbsp;</label>
        <select v-model="args.schoolYear" v-on:change="selectGrade">
          <option value=null>全部</option>
          <option v-for="n in 20">{{n + args.today - 10}}</option>
        </select>
        <label>规划状态&nbsp;</label>
        <select v-model="args.careerCount" v-on:change="selectCareer">
          <option value=null>全部</option>
          <option value="0">未规划</option>
          <option value="1">已规划</option>
        </select>
      </div>
      <div class="adumid-sea">
        <input type = "text" placeholder="搜索姓名，学号" v-model="args.keywords">
        <button v-on:click="selectSearch">搜索</button>
      </div>
    </div>
    <div class="line"></div>
    <div class="aduadu-tab">
      <table>
        <tr>
          <th>用户名</th>
          <th>姓名</th>
          <th>学籍</th>
          <th>邮箱</th>
          <th>注册日期</th>
          <th>规划情况</th>
          <th></th>
        </tr>
        <tbody v-for="userInfo in userList">
          <tr>
            <td>{{userInfo.userName}}</td>
            <td>{{userInfo.name}}</td>
            <td>{{userInfo.schoolYear}}</td>
            <td>{{userInfo.email}}</td>
            <td>{{userInfo.registerDate | dateAll}}</td>
            <td v-if="userInfo.careerCount == 0">暂无,<a href="javascript:void(0)" v-on:click="addUserCareer(userInfo)">添加</a></td>
            <td v-if="userInfo.careerCount == 1"><a href="javascript:void(0)" v-on:click="getUserCareer(userInfo)">查看</a></td>
            <td><a href="javascript:void(0)" v-on:click="adueDel(userInfo.id)" class="font-nor">删除用户</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="screen-out" v-if="userCareerShow != null">
      <div class="adu-car" v-if= "userCareerShow == -1">
        <div class="aducar-fir">
          <label v-if="userCareerShow == -1">批量添加</label>
          <button v-on:click="careerShow(null)">关闭</button>
        </div>
        <div class="line"></div>
        <div class="adusel-fir">
          <label>选择学生：&nbsp;&nbsp;选择年级&nbsp;</label>
          <select v-model="selectArgs.schoolYear" v-on:change="selectCareerGrade">
            <option value=null>全部</option>
            <option v-for="n in 20">{{n + args.today - 10}}</option>
          </select>
          <label>规划状态&nbsp;</label>
          <select v-model="selectArgs.careerCount" v-on:change="selectCareerCareer">
            <option value=null>全部</option>
            <option value="0">未规划</option>
            <option value="1">已规划</option>
          </select>
          <div class="adusel-blo">
            <input type="checkbox" v-on:click="selectAllUserList2">
            <label>全选</label>
          </div>
        </div>
        <div class="adusel-sec">
          <div class="adusel-blo" v-for="userCareerInfo in userList2">
            <input type="checkbox" v-model="userCareerInfo.isChecked">
            <label>{{userCareerInfo.userName}}</label>
            <label>{{userCareerInfo.name}}</label>
            <label v-if="userCareerInfo.careerCount == 0">未规划</label>
            <label v-if="userCareerInfo.careerCount == 1">有规划</label>
          </div>
        </div>
        <div class="line"></div>
        <table width="100%" class="aducar-tab">
          <tbody>
            <tr>
              <th width="20%">标题</th>
              <th width="30%">内容</th>
              <th width="20%">预计日期</th>
              <th></th>
            </tr>
          </tbody>
        </table>
        <table class="aducar-tab">
          <tbody>
            <tr>
              <td><input type="text" placeholder="规划标题" v-model="userCareerAdd.title"></td>
              <td><input type="text" placeholder="规划内容" v-model="userCareerAdd.content"></td>
              <td>
                <el-date-picker type="date" placeholder="Pick a day" v-model="userCareerAdd.plandateStr"></el-date-picker>
              </td>
              <td><a href="javascript:void(0)" v-on:click="aduAddCareer()" class="font-nor">添加一项规划</a></td>
            </tr>
          </tbody>
        </table>
        <div class="line"></div>
        <div class="adutab-flow">
          <table width="100%" class="aducar-tab">
              <tr v-for="(userCareerInfo, index) in userCareer">
                <td width="20%">{{userCareerInfo.title}}</td>
                <td width="30%">{{userCareerInfo.content}}</td>
                <td width="20%">{{userCareerInfo.plandateStr}}</td>
                <td><a href="javascript:void(0)" v-on:click="aduDelUsersCareer(index)" class="font-nor">删除</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="adutab-fin">
          <button v-on:click="addUsersCareerFinal">添加以上规划</button>
        </div>
      </div>
    <div class="adu-car" v-if= "userCareerShow != -1">
      <div class="aducar-fir">
        <label v-if="userCareerShow != -1">学号:{{userCareerShow.userName}},姓名:{{userCareerShow.name}}</label>
        <button v-on:click="careerShow(null)">关闭</button>
      </div>
      <div class="line"></div>
      <table width="100%" class="aducar-tab">
        <tbody>
          <tr>
            <th width="100px">标题</th>
            <th width="100px">内容</th>
            <th width="15%">预计日期</th>
            <th width="10%" class="font-dan">状态</th>
            <th width="10%">提交文件</th>
            <th width="15%">提交日期</th>
            <th width="15%">反馈日期</th>
            <th width="10%">反馈内容</th>
            <th></th>
          </tr>
        </tbody>
      </table>
      <table class="aducar-tab">
        <tbody>
          <tr>
            <td><input type="text" placeholder="规划标题" v-model="userCareerAdd.title"></td>
            <td><input type="text" placeholder="规划内容" v-model="userCareerAdd.content"></td>
            <td>
              <el-date-picker type="date" placeholder="Pick a day" v-model="userCareerAdd.plandateStr"></el-date-picker>
            </td>
            <td><a href="javascript:void(0)" v-on:click="aduAddCareer()" class="font-nor">添加一项规划</a></td>
          </tr>
        </tbody>
      </table>
      <div class="line"></div>
      <div class="adutab-flow">
      <table width="100%" class="aducar-tab">
        <tbody v-for="userYearCareerInfo in userCareer.careerPlanForYears">
          <tr v-for="userCareerInfo in userYearCareerInfo.careerPlans">
            <td width="10%">{{userCareerInfo.title}}</td>
            <td width="10%">{{userCareerInfo.content}}</td>
            <td width="15%" v-if="userCareerInfo.plandate != null">{{userCareerInfo.plandate | dateAll}}</td>
            <td width="15%" v-if="userCareerInfo.plandate == null">暂无</td>
            <td width="10%" class="font-dan">{{userCareerInfo.state | stateFil}}</td>
            <td width="10%" >{{userCareerInfo.file.title}}</td>
            <td width="15%" v-if="userCareerInfo.comdate != null">{{userCareerInfo.comdate | dateAll}}</td>
            <td width="15%" v-if="userCareerInfo.comdate == null">暂无</td>
            <td width="15%" v-if="userCareerInfo.resdate != null">{{userCareerInfo.resdate | dateAll}}</td>
            <td width="15%" v-if="userCareerInfo.resdate == null">暂无</td>
            <td width="10%" v-if="userCareerInfo.response != null">{{userCareerInfo.response}}</td>
            <td width="10%" v-if="userCareerInfo.response == null">暂无</td>
            <td><a href="javascript:void(0)" v-on:click="aduDelUserCareer(userCareerInfo)" class="font-nor">删除</a></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
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
// import DatePicker from 'element-ui'
export default {
  name: 'adUser',
  components: {
    sidebar,
    page
  },
  created: function () {
    this.getUserList(this.args)
  },
  methods: {
    addUsersCareer: function () {
      this.userCareer = []
      this.careerShow(-1)
    },
    addUserCareer: function (value) {
      this.userCareer = []
      this.careerShow(value)
    },
    getUserCareer: function (value) {
      var self = this
      axios.get(CONFIG.baseURL + 'careerPlan/getCareePlanList?token=' + CONFIG.getToken() + '&userId=' + value.id).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.careerShow(value)
          self.userCareer = []
          self.userCareer = Object.assign([], self.userCareer, res.data.data)
        } else {
          alert('获取失败')
        }
      })
    },
    getUserList: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'user/getUserList?token=' + CONFIG.getToken() + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.userList = []
          self.userList = Object.assign([], self.userList, res.data.data)
          self.args.currentPage = res.data.currentPage
          self.args.totalPage = res.data.totalPage
        } else {
          alert('获取失败')
        }
      })
    },
    addUserCareerInfo: function (data) {
      var self = this
      axios.post(CONFIG.baseURL + 'careerPlan/add', CONFIG.postHttpDataWithToken(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          alert('添加成功')
          if (self.userCareerShow !== -1) {
            self.getUserCareer(self.userCareerShow)
          }
        } else {
          alert('添加失败')
        }
      })
    },
    getUserList2: function (data) {
      var self = this
      axios.get(CONFIG.baseURL + 'user/getUserList?token=' + CONFIG.getToken() + CONFIG.getHttpData(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.userList2 = []
          self.userList2 = Object.assign([], self.userList2, res.data.data)
          self.selectArgs.currentPage = res.data.currentPage
          self.selectArgs.totalPage = res.data.totalPage
        } else {
          alert('获取失败')
        }
      })
    },
    addUsersCareerFinal: function () {
      var temp = []
      var self = this
      self.userList2.forEach(function (item) {
        if (item.isChecked === true) {
          temp.push(item.id)
        }
      })
      self.userCareer.forEach(function (item) {
        item.userIds = temp
        self.addUserCareerInfo(item)
      })
    },
    selectAllUserList2: function () {
      var self = this
      this.userList2.forEach(function (item) {
        self.$set(item, 'isChecked', !item.isChecked)
      })
    },
    deleteCareer: function (data) {
      var self = this
      axios.post(CONFIG.baseURL + 'careerPlan/delete', CONFIG.postHttpDataWithToken(data)).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.getUserCareer(self.userCareerShow)
          alert('删除成功')
        } else {
          alert('删除失败')
        }
      })
    },
    selectGrade: function () {
      this.args.totalPage = -1
      this.args.currentPage = 1
      this.getUserList(this.args)
    },
    selectCareer: function () {
      this.args.totalPage = -1
      this.args.currentPage = 1
      this.getUserList(this.args)
    },
    selectCareerGrade: function () {
      this.selectArgs.totalPage = -1
      this.selectArgs.currentPage = 1
      this.getUserList2(this.selectArgs)
    },
    selectCareerCareer: function () {
      this.selectArgs.totalPage = -1
      this.selectArgs.currentPage = 1
      this.getUserList2(this.selectArgs)
    },
    selectSearch: function () {
      this.args.totalPage = -1
      this.args.currentPage = 1
      if (this.args.keywords === '') {
        this.args.keywords = null
      }
      this.getUserList(this.args)
    },
    changePage: function (value) {
      this.args.currentPage = value
      this.getUserList(this.args)
    },
    careerShow: function (value) {
      this.userCareerShow = value
    },
    aduDelUsersCareer: function (value) {
      // this.userCareer
      this.userCareer.splice(value, 1)
    },
    aduDelUserCareer: function (value) {
      // this.userCareer
      this.deleteCareer({careerPlanIds: [value.id]})
    },
    aduAddCareer: function () {
      if (this.userCareerAdd.plandateStr != null && this.userCareerAdd.title != null) {
        var temp = new Date(this.userCareerAdd.plandateStr)
        this.userCareerAdd.plandateStr = temp.getFullYear() + '-' + (temp.getMonth() + 1) + '-' + temp.getDate()
        if (this.userCareerShow !== -1) {
          this.userCareerAdd.userIds = [this.userCareerShow.id]
          this.addUserCareerInfo(this.userCareerAdd)
        } else {
          this.userCareer.push({title: this.userCareerAdd.title, content: this.userCareerAdd.content, plandateStr: this.userCareerAdd.plandateStr})
        }
      }
    }
  },
  data () {
    return {
      userList: [],
      userList2: [],
      userCareerShow: null,
      userCareerAdd: {
        userIds: [],
        title: null,
        content: '',
        plandateStr: null
      },
      userCareer: [],
      args: {
        today: 2016,
        careerCount: null,
        keywords: null,
        schoolYear: null,
        totalPage: -1,
        numberPerPage: 10,
        currentPage: 1
      },
      selectArgs: {
        careerCount: null,
        keywords: null,
        schoolYear: null,
        totalPage: -1,
        numberPerPage: -1,
        currentPage: -1
      },
      pickerOptions1: {
        shortcuts: [{
          text: 'Today',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: 'Yesterday',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: 'A week ago',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
      // value1: '',
      // value2: ''
    }
  }
}
</script>
<style scoped>
/*.tatdbr {
  word-wrap: break-word;
  word-break: break-all;
  display: inline-block;
}*/
.adu {
  margin-top: -50px;
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
.aduadu-fir label {
  float: right;
}
.adusel-fir {
  text-align: left;
  padding:5px;
}
.aducar-fir {
  height:40px;
}
.aducar-fir button{
  float: right;
  background-color: #3DA8F5;
  border-radius: 3px;
  width: 50px;
  height: 34px;
  border: none;
  color: white;
  box-shadow: none;
  outline: 0;
}
.adutab-fin {
  margin-top: 5px;
}
.adutab-fin button {
  width: 100px;
  height: 34px;
  border: none;
  color: white;
  background-color: #3DA8F5;
  border-radius: 3px;
  padding: 5px;
  font-size: 14px;
}
.aducar-tab {
  border-collapse: collapse;
}
.aducar-tab tbody{
  border-bottom: 1px solid #eeeeee;
}
.aducar-tab tr {
  height: 40px;
}
.aducar-tab input {
  height: 32px;
  border-radius: 3px;
  border: 1px solid #bfcbd9;
  outline: 0;
  box-shadow: none;
  width: 300px;
}
.aducar-tab input:hover,
.aducar-tab input:active{
  border-color:#20a0ff
}
.adutab-flow {
  /*height: 80%;
  overflow: scroll;
  overflow-x: hidden;*/
}
.adusel-sec {
  text-align: left;
  padding-bottom: 5px;
  max-height:200px;
  overflow-y: scroll;
}
.adusel-blo {
  display: inline-block;
  background-color: #eeeeee;
  border-radius: 3px;
  margin-right: 5px;
  margin-top: 5px;
  font-size: 13px;
  padding: 2px;
}
.adu-car {
  width: 1024px;
  margin: auto;
  margin-top: 50px;
  height: 80%;
  background: white;
  border-radius: 3px;
  border: 1px solid #eeeeee;
  padding: 10px;
  overflow-y: scroll;
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
table tr {
  border-bottom: 1px solid #eeeeee
}
</style>
