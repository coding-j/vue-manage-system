<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="rgba(0,0,0,0)"
            text-color="#fff" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        <!--</el-menu>-->
        <!--<el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"-->
                 <!--text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>-->
            <!--<template v-for="item in items">-->
                <!--<template v-if="item.subs">-->
                    <!--<el-submenu :index="item.index" :key="item.index">-->
                        <!--<template slot="title">-->
                            <!--<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>-->
                        <!--</template>-->
                        <!--<template v-for="subItem in item.subs">-->
                            <!--<el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">-->
                                <!--<template slot="title">{{ subItem.title }}</template>-->
                                <!--<el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">-->
                                    <!--{{ threeItem.title }}-->
                                <!--</el-menu-item>-->
                            <!--</el-submenu>-->
                            <!--<el-menu-item v-else :index="subItem.index" :key="subItem.index">-->
                                <!--{{ subItem.title }}-->
                            <!--</el-menu-item>-->
                        <!--</template>-->
                    <!--</el-submenu>-->
                <!--</template>-->
                <!--<template v-else>-->
                    <!--<el-menu-item :index="item.index" :key="item.index">-->
                        <!--<i :class="item.icon"></i><span slot="title">{{ item.title }}</span>-->
                    <!--</el-menu-item>-->
                <!--</template>-->
            <!--</template>-->
            <!--<el-menu>-->
                <!--<el-menu-item :index="admin.index" :key="admin.index">-->
                    <!--<i :class="admin.icon"></i><span slot="title">{{admin.title}}</span>-->
                <!--</el-menu-item>-->
            <!--</el-menu>-->
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    import axios from 'axios'
    import qs from 'qs'
    export default {
        data() {
            return {
                collapse: false,
                authority: 0,
                // admins: [
                //     {
                //         icon: 'el-icon-service',
                //         index: 'projectReviewList',
                //         title: '管理员'
                //     }
                // ],
                items: [
                    {
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '首页'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'project_list',
                        title: '实训成果'
                    },
                    {
                        icon: 'el-icon-lx-copy',
                        index: 'teacherList',
                        title: '名师阵容'
                    },
                    {
                        icon: 'el-icon-lx-emoji',
                        index: 'about',
                        title: '关于我们'
                    },
                    {
                        icon: 'el-icon-service',
                        index: 'admin',
                        title: '管理员'
                    },
                    {
                        icon: 'el-icon-upload',
                        index: 'project_form',
                        title: '老师'
                    }
                    // {
                    //     icon: 'el-icon-lx-calendar',
                    //     index: '3',
                    //     title: '表单相关',
                    //     subs: [
                    //         {
                    //             index: 'form',
                    //             title: '基本表单'
                    //         },
                    //         {
                    //             index: '3-2',
                    //             title: '三级菜单',
                    //             subs: [
                    //                 {
                    //                     index: 'editor',
                    //                     title: '富文本编辑器'
                    //                 },
                    //                 {
                    //                     index: 'markdown',
                    //                     title: 'markdown编辑器'
                    //                 },
                    //             ]
                    //         },
                    //         {
                    //             index: 'upload',
                    //             title: '文件上传'
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-rank',
                    //     index: '6',
                    //     title: '拖拽组件',
                    //     subs: [
                    //         {
                    //             index: 'drag',
                    //             title: '拖拽列表',
                    //         },
                    //         {
                    //             index: 'dialog',
                    //             title: '拖拽弹框',
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-lx-calendar',
                    //     index: '7',
                    //     title: '实训项目',
                    //     subs: [
                    //         {
                    //             index: 'project_list',
                    //             title: '项目列表',
                    //         },
                    //         {
                    //             index: 'project_form',
                    //             title: '项目上传',
                    //         }
                    //     ]
                    // },
                    // {
                    //     icon: 'el-icon-lx-warn',
                    //     index: '8',
                    //     title: '错误处理',
                    //     subs: [
                    //         {
                    //             index: 'permission',
                    //             title: '权限测试'
                    //         },
                    //         {
                    //             index: '404',
                    //             title: '404页面'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            this.getAuthority();
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
            this.getHomePage();
        },
        methods: {
            getAuthority(){
                if(null != sessionStorage.getItem("userName")){
                    this.authority = sessionStorage.getItem("authority");
                } else {
                    this.authority = 0;
                }
            },
            getHomePage(){
                axios.post("/project/home_page",qs.stringify({
                        "authority" : this.authority
                })).then(res => {
                    console.log(res.data)
                    this.items = res.data
                }).catch(e => {
                    // this.error.push(e)
                })
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
        color: #fff;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
