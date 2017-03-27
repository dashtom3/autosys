<template>

  <div class="stu font-nor" v-if="userCareer != null">
    <headerCmp></headerCmp>
    <div class="stu-fir">
      <label class="stufir-a">个人生涯规划记录</label>
      <label>总任务·{{userCareer.all}}</label>
      <label class="font-suc">已完成·{{userCareer.passed}}</label>
      <label class="font-dan">退回·{{userCareer.unPassed}}</label>
      <label class="font-dan">逾期·{{userCareer.overdue}}</label>
      <label class="font-war">待审核·{{userCareer.toVerify}}</label>
      <label>待完成·{{userCareer.unCommit}}</label>
    </div>
    <div class="stu-sec" v-for="dataInfo in userCareer.careerPlanForYears">
      <div class="stusec-left">
        <label>{{dataInfo.year}}</label>
      </div>
      <div class="stusec-block">
      <div class="stusec-right" v-for="datayearInfo in dataInfo.careerPlans">
        <div class="stusec-ans" v-stateWatch=datayearInfo.state>
          <label>{{datayearInfo.state | stateFil}}</label>
        </div>
        <div class="stusec-monday font-dan">
          <div class="stusec-mon">{{datayearInfo.plandate | dateMM}}</div>
          <div class="stusec-day">{{datayearInfo.plandate | dateDay}}</div>
          <div><label>(截止)</label></div>
        </div>
          <div class="stusec-top">
          <div class="stusec-title">{{datayearInfo.title}}
          </div>
          <div class="stusec-content">
            &nbsp;&nbsp;&nbsp;&nbsp;{{datayearInfo.content}}
          </div>
          </div>

          <div class="line"></div>
          <div class="stusec-com">
          <div v-if="datayearInfo.state < 0">
            <!-- <button class="stusec-btn1" v-if="datayearInfo.state == -1">点击上传</button>
            <button class="stusec-btn2" v-if="datayearInfo.state == -2">请尽快上传</button> -->
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
          </div>
          <div v-if="datayearInfo.state >= 0">
            <a v-bind:href="datayearInfo.file.url" target=_blank class="stusec-com1 font-nor">{{datayearInfo.file.title}}</a>
            <label class="stusec-com2">{{datayearInfo.comdate | dateAll}}</label>
          </div>
          </div>

          <div v-if="datayearInfo.state == 2">
            <div class="line"></div>
            <div class="stusec-bottom">
            <label class="stusec-btm1 font-dan">反馈信息：{{datayearInfo.response}}</label>
            <label class="stusec-btm2">{{datayearInfo.resdate | dateAll}}</label>
            </div>
          </div>
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
  name: 'header',
  components: {
    headerCmp
  },
  created: function () {
    if (CONFIG.getToken() == null) {
      this.$router.push('/login')
    } else if (CONFIG.getUser()['type'] === 0) {
      this.$router.push('/adUser')
    } else {
      this.getUserCareer()
    }
  },
  data () {
    return {
      userCareer: null
    }
  },
  methods: {
    getUserCareer: function () {
      var self = this
      axios.get(CONFIG.baseURL + 'careerPlan/getCareePlanList?token=' + CONFIG.getToken()).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.userCareer = []
          self.userCareer = Object.assign([], self.userCareer, res.data.data)
        } else {
          alert('提交失败')
        }
      })
    },
    uploadPlanFile: function ($event, info) {
      var self = this
      self.file = $event.target.files[0]
      axios.post(CONFIG.baseURL + 'careerPlan/commit',
        CONFIG.postHttpData({token: CONFIG.getToken(), file: self.file, careerPlanId: info.id})
      ).then(function (res) {
        if (res.data.callStatus === 'SUCCEED') {
          self.getUserCareer()
        } else {
          alert('提交失败')
        }
      })
    }
  }
}
</script>
<style scoped>
.prosec-inp1 a {
    padding: 4px 10px;
    /*line-height: 20px;*/
    position: relative;
    color: white;
    overflow: hidden;
    display: block;
    text-decoration: none;
    height: 22px;
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
    height: 22px;
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
.stu-fir {
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.stu-fir label {
  margin-right: 8px;
  font-weight: bold;
}
.stufir-a {
  font-weight: 800;
  font-size: 24px;
  letter-spacing: -1px;
  width: 190px;
  text-align: right;
  margin-right: 100px !important;
}
.stu-sec {
  width: 1200px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.stusec-left {
  width: 200px;
  text-align: right;
  margin-right: 40px;
  display:inline-block;
  vertical-align: top;
}
.stusec-left label {
  font-family: "bodoni-urw", serif;
  font-weight: 800;
  font-size: 62px;
  letter-spacing: -3px;
}
.stusec-right {
  width: 250px;
  display: inline-block;
  margin-right: 15px;
  vertical-align: top;
  background-color: #f5f5f5;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0,0,0,.1);
  padding: 5px;
  margin-bottom: 15px;
  /*min-height: 200px;*/
}
.stusec-block {
  background-color : white;
  display: inline-block;
  min-height: 400px;
  width: 830px;
  border-radius: 8px;
  padding: 20px;
}
.stusec-top {
  min-height: 100px;
  display: inline-block;
  width: 150px;
}
.stusec-monday {
  display: inline-block;
  text-align: right;
  margin-right: 5px;
  vertical-align: top;
}
.stusec-monday label {
  font-size: 10px;
}
.stusec-mon {
  font-size: 14px;
  height: 14px;
}
.stusec-com {
  margin-right: 2px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top:10px;
  margin-bottom: 10px;
}
.stusec-btn1 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #5cb85c;
  color:white;
  border-radius: 4px;
}
.stusec-btn2 {
  width: 100%;
  height: 36px;
  border: none;
  background-color: #d9534f;
  color:white;
  border-radius: 4px;
}
.stusec-ans {
  float: right;
  font-size: 10px;
  /*background-color: rgba(200, 200, 200, 0.5);*/
  padding: 3px;
  border-radius: 3px;
}
.stusec-com2 {
  font-size: 10px;
  float: right;
}
.stusec-day {
  font-size: 32px;
  height: 32px;
}
.stusec-title {
  font-weight: bold;
  word-wrap: break-word;
}
.stusec-content {
  font-size: 10px;
  word-wrap: break-word;
}
.stusec-bottom {
  margin-top: 10px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.stusec-btm2 {
  font-size: 10px;
  float: right;
}
</style>
