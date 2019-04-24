import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    // 实训项目列表
                    path: '/project_list',
                    component: resolve => require(['../components/page/project/ProjectList.vue'], resolve),
                    meta: { title: '实训项目列表', permission: true }
                },
                {
                    // 实训项目列表
                    path: '/project_form',
                    component: resolve => require(['../components/page/project/ProjectForm.vue'], resolve),
                    meta: { title: '实训项目上传', permission: true }
                },

                // 测试
                // {
                //     path: '/teacherAdmin',
                //     component: resolve => require(['../components/page/admin/TeacherAdmin.vue'],resolve),
                //     hidden: true
                // },
                {
                    path: '/projectReview',
                    component: resolve => require(['../components/page/admin/ProjectReview.vue'],resolve),
                    meta: { title: '项目审核', permission: true }
                },
                {
                    path: '/projectReviewList',
                    component: resolve => require(['../components/page/admin/ProjectReviewList.vue'],resolve),
                    meta: { title: '管理员', permission: true }
                },
                {
                    path: '/teacherShow',
                    component: resolve => require(['../components/page/teacher/TeacherShow.vue'],resolve),
                    meta: { title: '老师介绍', permission: true }
                },
                {
                    path: '/teacherEdit',
                    component: resolve => require(['../components/page/admin/TeacherEdit.vue'],resolve),
                    meta: { title: '老师信息编辑', permission: true }
                },
                {
                    path: 'teacherAdminShow',
                    component: resolve => require(['../components/page/admin/TeacherAdminShow.vue'],resolve),
                    meta: { title: '管理员教师管理', permission: true }
                },
                {
                    path: '/teacherList',
                    component: resolve => require(['../components/page/teacher/TeacherList.vue'],resolve),
                    meta: { title: '导师列表', permission: true }
                },
                {
                    path: '/projectShow',
                    component: resolve => require(['../components/page/project/ProjectShow.vue'],resolve),
                    meta: { title: '实训项目展示', permission: true }
                },





                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve),
            hidden: true
        },
        {
            path: '*',
            redirect: '/404'
        }


    ]
})
