// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
// Vue.use(axios)
// Vue.use(CONFIG)
/* eslint-disable no-new */

Vue.use(ElementUI)

function hasClass (obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
function addClass (obj, cls) {
  if (!hasClass(obj, cls)) obj.className += ' ' + cls
}
Vue.directive('stateWatch', {
  inserted: function (el, binding) {
    switch (binding.value) {
      case -1: {
        addClass(el.parentNode, 'border-nor')
        break
      }
      case -2: {
        addClass(el, 'font-dan')
        addClass(el.parentNode, 'border-dan')
        el.style.fontWeight = 'bold'
        break
      }
      case 0: {
        addClass(el, 'font-war')
        addClass(el.parentNode, 'border-war')
        break
      }
      case 1: {
        addClass(el, 'font-suc')
        addClass(el.parentNode, 'border-suc')
        break
      }
      case 2: {
        addClass(el, 'font-dan')
        addClass(el.parentNode, 'border-dan')
        el.parentNode.style.backgroundColor = '#eeeeee'
        break
      }
    }
  }
})
Vue.filter('stateFil', function (state) {
  switch (state) {
    case -1: return '未提交'
    case -2: return '已逾期'
    case 0: return '待审核'
    case 1: return '已通过'
    case 2: return '被退回'
  }
})
Vue.filter('dateMM', function (time) {
  return new Date(parseInt(time)).getMonth() + 1 + '月'
})
Vue.filter('dateDay', function (time) {
  return new Date(parseInt(time)).getDate() + 1
})
Vue.filter('dateAll', function (time) {
  var temp = new Date(parseInt(time))
  return temp.getFullYear() + '/' + (temp.getMonth() + 1) + '/' + temp.getDate() + ' ' + temp.getHours() + ':' + temp.getMinutes()
})
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  template: '<App/>',
  components: { App }
})
