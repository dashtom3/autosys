<template>
  <div class="stu font-nor">
    <div class="stu-fir">
      <label class="stufir-a">个人生涯规划记录</label>
      <label>总任务:{{data.allT}}</label>
      <label class="font-suc">已完成:{{data.doneT}}</label>
      <label class="font-dan">退回:{{data.failT}}</label>
      <label class="font-dan">逾期:{{data.lateT}}</label>
      <label class="font-war">待审核:{{data.waitT}}</label>
      <label>待完成:{{data.undoT}}</label>
    </div>
    <div class="stu-sec" v-for="dataInfo in data.list">
      <div class="stusec-left">
        <label>{{dataInfo.year}}</label>
      </div>
      <div class="stusec-right" v-colorWatch:d v-for="datayearInfo in dataInfo.list">
        <div class="stusec-block">
          <div class="">
            <label>{{datayearInfo.plandate}}</label>
            <label>{{datayearInfo.plandate}}</label>
          </div>
          <label>{{datayearInfo.title}}<label>
          <label>{{datayearInfo.content}}<label>
          <div v-if="datayearInfo.state > 0">
            <label>{{datayearInfo.file.title}}</label>
            <label>{{datayearInfo.comdate}}</label>
          </div>
          <div v-if="datayearInfo.state == 2">
            <label>{{datayearInfo.response}}</label>
            <label>{{datayearInfo.resdate}}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Vue.directive('color-swatch', function (el, binding) {
//   el.style.backgroundColor = binding.value
// })
export default {
  name: 'header',
  data () {
    return {
      data: {
        list: [
          {year: 2015,
            list: [
              {title: '第一学期期末报告', content: '该学期的报告说明', state: 1, plandate: '1420188122', comdate: '1420447322', resdate: '', response: '', file: {title: '年终报告', url: 'http://v3.bootcss.com/'}},
              {title: '第二学期期末报告', content: '该学期的报告说明', state: 2, plandate: '1420188122', comdate: '1420447322', resdate: '1483605722', response: '提交格式不对', file: {title: '年终报告', url: 'http://v3.bootcss.com/'}}
            ]
          },
          {year: 2016,
            list: [
              {title: '第一学期期末报告', content: '该学期的报告说明', state: 0, plandate: '1451983322', comdate: '1451983322', resdate: '', response: '', file: {title: '年终报告', url: 'http://v3.bootcss.com/'}},
              {title: '第二学期期末报告', content: '该学期的报告说明', state: -2, plandate: '1451983322', comdate: '', resdate: '', response: ''}
            ]
          },
          {year: 2017,
            list: [
              {title: '第一学期期末报告', content: '该学期的报告说明', state: -1, plandate: '1483605722', comdate: '', resdate: '', response: '', file: {title: '年终报告', url: 'http://v3.bootcss.com/'}}
            ]
          }
        ],
        allT: 5,
        doneT: 1,
        failT: 1,
        lateT: 1,
        waitT: 1,
        undoT: 2
      }
    }
  }
}
</script>
<style scoped>
.stu-fir {
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.stu-fir label {
  margin-right: 8px;
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
  width: 1024px;
  margin: auto;
  text-align: left;
  margin-bottom: 20px;
}
.stusec-left {
  width: 190px;
  text-align: right;
  margin-right: 20px;
  display: inline-block;
  vertical-align: top;
}
.stusec-left label {
  font-family: "bodoni-urw", serif;
  font-weight: 800;
  font-size: 62px;
  letter-spacing: -3px;
}
.stusec-right {
  width: 190px;
  text-align: center;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}

</style>
