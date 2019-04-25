<template>
    <div>
        <div align="right">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                    <el-breadcrumb-item>导师管理</el-breadcrumb-item>
                </el-breadcrumb>
            <el-button @click="Edit" type="warning">Edit</el-button>
        </div>
        <div>
            <el-row style="padding: 30px 80px 10px 50px" :gutter="20">
                <el-col :span="6">
                    <img :src="imgUrl+pictureUrl" class="pic_size"><br><br>
                    <div align="center" v-bind:style="{fontSize:25+'px'}">
                        <span>{{teacherName}}</span><br><br>
                        <div v-bind:style="{fontSize:15+'px'}">
                            <span>{{"工作单位:"+work_unit}}</span><br><br>
                            <span>{{"通讯地址:"+address}}</span>
                        </div>
                    </div>
                </el-col>
                <el-col :span="18" >
                    <el-row :gutter="20">
                        <div>
                            <el-card >
                                <font size="5">个人简介</font>
                                <div class="Line"></div><br>
                                <span>{{TeacherDetail}}</span>
                            </el-card>
                        </div>
                        <div class="card-top">
                            <el-card>
                                <font size="5">工作经历</font>
                                <div class="Line"></div><br>
                                <div  v-for="work in works">
                                    {{work}}
                                </div>
                            </el-card>
                        </div>
                        <div class="card-top">
                            <el-card>
                                <font size="5">负责项目</font>
                                <div class="Line"></div><br>
                                <el-table
                                        ref="singleTable"
                                        height="250"
                                        :data="projectlist"
                                        highlight-current-row
                                        @current-change="handleCurrentChange"
                                        style="width: 100%">
                                    <el-table-column
                                            type="index"
                                            width="50">
                                    </el-table-column>
                                    <el-table-column
                                            property="finishDate"
                                            label="完成时间"
                                            width="120">
                                    </el-table-column>
                                    <el-table-column
                                            property="projectName"
                                            label="项目名称"
                                            width="120">
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </div>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "TeacherAdminShow",
        data(){
            return {
                imgUrl:'http://localhost:8088/show?pictureName=',
                pictureUrl:'',
                //fontSize: 30,
                teacherName: "",
                work_unit: "大连理工大学软件学院",
                address: "大连理工大学软件学院综合楼四楼实训基地",
                TeacherDetail: "陆坤，工学博士，副教授，硕士生导师。本硕博均毕业于大连理工大学计算机系。承担或参与国家自然科学基金、省自然科学基金重点项目，IBM国际合作项目，中央高校基本科研业务费等多项课题。主要研究领域为移动群智感知，隐私保护，信任模型与激励机制。发表论文30余篇，其中SCI、EI检索20余篇，申请国家发明专利1项。获辽宁省自然科学学术成果二等奖2次。主持省部级教学改革项目6项（含教育部协同育人项目），校级多项；指导学生获得国家级及以上科技竞赛奖励40余项,100多人次。获得省优秀教学成果奖一等奖1次，二等奖2次。荣获IBM Faculty Award2次，国家留学基金委-IBM优秀教师奖教金3次，花旗集团优秀教师奖教金1次。",
                works:[
                    {local:'大连理工大学'},
                    {local:'大连理工大学软件学院'}
                ],
                projectlist:[
                    {date:'2016-05-02',proName:'项目1'},
                    {date:'2016-05-02',proName:'项目1'},
                    {date:'2016-05-02',proName:'项目1'},
                    {date:'2016-05-02',proName:'项目1'},
                    {date:'2016-05-02',proName:'项目1'},
                    {date:'2016-05-02',proName:'项目1'}
                ]
            }
        },
        created(){
            let tName = this.$route.query.name;
            this.teacherShow(tName);
            this.teacher_pro(tName);
        },
        methods: {
            Edit(){
                this.$router.push({ path:'/teacherEdit?name='+this.teacherName  })
            },
            teacherShow(tName){
                axios.post('http://localhost:8088/teacherShow',qs.stringify({
                    'tName' : tName
                })).then(response => {
                    console.log(response.data);
                    this.teacherName = response.data['teacherName'];
                    console.log(this.teacherName)
                    this.pictureUrl = response.data['pictureUrl'];
                    this.work_unit = response.data['working'];
                    this.address = response.data['address'];
                    this.TeacherDetail = response.data['introduction'];
                    this.works = response.data['workList']
                }).catch(e => {
                    this.error.push(e)
                });
            },
            teacher_pro(tName){
                axios.post('http://localhost:8088/searchProjectByTeacherName',qs.stringify({
                    'teacherName' : tName
                })).then(response => {
                    console.log(response.data);
                    this.projectlist = response.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            }
        }
    }
</script>

<style scoped>
    .pic_size{
        width: 250px;
        height: 350px;
    }
    .Line{
        border-bottom:1px dashed #999999;
        height: 1rem;
        margin-left: 0rem;
        margin-right: 1rem;
    }
    .card-top{
        margin-top: 1cm;
    }
</style>
