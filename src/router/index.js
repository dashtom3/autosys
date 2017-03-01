import Vue from 'vue'
import Router from 'vue-router'
import Hello from 'components/Hello'
import Student from 'components/Student'
// import Project from 'components/Project'
// import ProjectInfo from 'components/ProjectInfo'
// import FileInfo from 'components/File'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/student',
      name: 'Home',
      component: Student
    }
    // {
    //   path: '/project',
    //   name: 'Project',
    //   component: Project
    // },
    // {
    //   path: '/project/:id',
    //   name: 'ProjectInfo',
    //   component: ProjectInfo
    // },
    // {
    //   path: '/file',
    //   name: 'FileInfo',
    //   component: FileInfo
    // }
  ]
})
