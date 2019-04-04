<template>
    <div>
        <!--轮播图-->
        <el-row style="padding: 10px 50px 10px 50px">
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="24" align="center">
                    <el-carousel :interval="4000" type="card" height="400px">
                        <el-carousel-item v-for="item in itemList">
                            <h3>{{ item.imgUrl }}</h3>
                        </el-carousel-item>
                    </el-carousel>
                </el-col>
            </el-row>
        </el-row>

        <!--Java类展示-->
        <div class="type">
            java
        </div>
        <el-row style="padding: 10px 80px 10px 50px" >
            <el-row>
                <el-col :span="9" >
                    <img src="../../assets/img/login-bg.jpg" class="first_pic" alt="">
                    <div class="type">
                        项目一
                    </div>
                </el-col>

                <el-row :gutter="5" type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="row-bg" justify="center">
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <img src="../../assets/img/login-bg.jpg" class="other_pic" alt="">
                        <div class="type">
                            项目一
                        </div>
                    </el-col>
                </el-row>
            </el-row>
        </el-row>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    import bus from '../common/bus';
    import pic1 from "../../assets/img/img.jpg";
    export default {
        name: 'dashboard',
        data() {
            return {
                name: localStorage.getItem('ms_username'),
                itemList:[
                    {imgUrl: pic1},
                    {imgUrl: pic1},
                    {imgUrl: pic1},
                    {imgUrl: pic1}
                ],
                todoList: [{
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: false,
                    }, {
                        title: '今天要修复100个bug',
                        status: false,
                    },
                    {
                        title: '今天要修复100个bug',
                        status: true,
                    },
                    {
                        title: '今天要写100行代码加几个bug吧',
                        status: true,
                    }
                ],
                data: [{
                        name: '2018/09/04',
                        value: 1083
                    },
                    {
                        name: '2018/09/05',
                        value: 941
                    },
                    {
                        name: '2018/09/06',
                        value: 1139
                    },
                    {
                        name: '2018/09/07',
                        value: 816
                    },
                    {
                        name: '2018/09/08',
                        value: 327
                    },
                    {
                        name: '2018/09/09',
                        value: 228
                    },
                    {
                        name: '2018/09/10',
                        value: 1065
                    }
                ],
                options: {
                    title: '最近七天每天的用户访问量',
                    showValue: false,
                    fillColor: 'rgb(45, 140, 240)',
                    bottomPadding: 30,
                    topPadding: 30
                },
                options2: {
                    title: '最近七天用户访问趋势',
                    fillColor: '#FC6FA1',
                    axisColor: '#008ACD',
                    contentColor: '#EEEEEE',
                    bgColor: '#F5F8FD',
                    bottomPadding: 30,
                    topPadding: 30
                }
            }
        },
        components: {
            Schart
        },
        computed: {
            role() {
                return this.name === 'admin' ? '超级管理员' : '普通用户';
            }
        },
        created(){
            this.handleListener();
            this.changeDate();
        },
        activated(){
            this.handleListener();
        },
        deactivated(){
            window.removeEventListener('resize', this.renderChart);
            bus.$off('collapse', this.handleBus);
        },
        methods: {
            changeDate(){
                const now = new Date().getTime();
                this.data.forEach((item, index) => {
                    const date = new Date(now - (6 - index) * 86400000);
                    item.name = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
                })
            },
            handleListener(){
                bus.$on('collapse', this.handleBus);
                // 调用renderChart方法对图表进行重新渲染
                window.addEventListener('resize', this.renderChart)
            },
            handleBus(msg){
                setTimeout(() => {
                    this.renderChart()
                }, 300);
            },
            renderChart(){
                this.$refs.bar.renderChart();
                this.$refs.line.renderChart();
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .first_pic {
        width: 350px;
        height: 250px;
    }

    .other_pic {
        width: 200px;
        height: 150px;
    }
    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

    .schart {
        width: 100%;
        height: 300px;
    }


    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>
