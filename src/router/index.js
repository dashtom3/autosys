import Vue from 'vue'
import Router from 'vue-router'
// import Hello from 'components/Hello'
import Student from 'components/Student'
import Project from 'components/Project'
import ProjectInfo from 'components/ProjectInfo'
import FileInfo from 'components/File'
import Login from 'components/Login'
import Admin from 'components/AdminLogin'
import AdUser from 'components/AdUser'
import AdPlan from 'components/AdPlan'
import AdProplan from 'components/AdProplan'
import AdFile from 'components/AdFile'
import AdProject from 'components/AdProject'
import User from 'components/User'
Vue.use(Router)

export default new Router({
  mode: 'history',
  hashbang: true,
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/student',
      name: 'Student',
      component: Student
    },
    {
      path: '/project',
      name: 'Project',
      component: Project
    },
    {
      path: '/project/:id',
      name: 'ProjectInfo',
      component: ProjectInfo
    },
    {
      path: '/file',
      name: 'FileInfo',
      component: FileInfo
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/adUser',
      name: 'AdUser',
      component: AdUser
    },
    {
      path: '/adPlan',
      name: 'AdPlan',
      component: AdPlan
    },
    {
      path: '/adProplan',
      name: 'AdProplan',
      component: AdProplan
    },
    {
      path: '/adFile',
      name: 'AdFile',
      component: AdFile
    },
    {
      path: '/adProject',
      name: 'AdProject',
      component: AdProject
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
