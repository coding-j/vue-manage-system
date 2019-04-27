<template>
    <div>
        <div class="block">
            <el-timeline>
                <el-timeline-item placement="top"
                    :icon="activity.icon"
                    :type="activity.type"
                    :size="activity.size">
                    <el-card>
                        <div>
                            <el-button type="success" @click="addRating">点赞</el-button>
                            目前赞数{{activity.rating}}
                        </div>
                        <h4>{{activity.title}}</h4>
                        <p>{{activity.projectName}}</p>
                        <p>{{activity.projectTeacher}}</p>
                        <p>{{activity.projectType}}</p>
                        <!--<p>{{activity.projectStudent}}</p>-->
                        <el-collapse v-model="activeNames" @change="handleChange">
                            <el-collapse-item :title="activity.projectStudent" name="1">
                                <div>{{activity.teamDetail}}</div>
                                <!--<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>-->
                                <!--<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>-->
                            </el-collapse-item>
                        </el-collapse>
                        <p>{{activity.projectDesc}}</p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item placement="top"
                    :icon="pic.icon"
                    :type="pic.type"
                    :size="pic.size">
                    <el-card>
                        <h4>{{pic.title}}</h4>
                        <!--轮播图-->
                        <el-carousel :interval="4000" type="card" height="200px">
                            <el-carousel-item v-for="item in pic.picList" :key="item">
                                <img :src="imgUrl+item.name">
                            </el-carousel-item>
                        </el-carousel>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item placement="top"
                    :icon="video.icon"
                    :type="video.type"
                    :size="video.size">
                    <el-card>
                        <h4>{{video.title}}</h4>
                        <!--视频-->
                        <video width="320" height="240" controls="controls">
                            <source :src="video.viderUrl" type="video/mp4" />
                            <source :src="video.viderUrl" type="video/ogg" />
                            <source :src="video.viderUrl" type="video/webm" />
                            <object :data="video.viderUrl" width="320" height="240">
                                <embed :src="video.viderUrl" width="320" height="240"/>
                            </object>
                        </video>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item placement="top"
                    :icon="file.icon"
                    :type="file.type"
                    :size="file.size">
                    <el-card>
                        <h4>{{file.title}}</h4>
                        <!--文件-->
                        <!--<a class='download' :href='downloadhttp' download=""  title="下载">下载</a>-->
                        <el-table
                                @row-click="downloadFile()"
                                ref="singleTable"
                                :data="file.fileList"
                                highlight-current-row
                                @current-change="handleCurrentChange"
                                style="width: 100%">
                            <el-table-column
                                    type="index"
                                    width="50">
                            </el-table-column>
                            <el-table-column
                                    property="name"
                                    label="文件名"
                                    width="120">
                            </el-table-column>
                        </el-table>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import '../../../assets/font/iconfont.css'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "ProjectShow",
        data(){
            return {
                imgUrl:'http://localhost:8088/show?pictureName=',
                activeNames: ['1'],
                currentRow:null,
                // downloadhttp: 'E:\\coding-web\\vue-manage-system\\src\\assets\\img\\img.jpg',
                activity:
                    {
                        rating : 0,
                        title: "项目介绍",
                        type: 'primary',
                        size: 'large',
                        projectName:"项目一",
                        projectTeacher: "导师一",
                        projectType: "Javaweb",
                        projectStudent: "学生1、学生2、学生3、学生4、学生5",
                        projectDesc: "这是一个怎么样的项目",
                        teamDetail: "hhh",
                        icon: 'el-icon-more'
                    },
                pic:{
                    title: '图片展示',
                    type: 'primary',
                    size: 'large',
                    icon: 'el-icon-picture',
                    picList: [
                        {imgUrl: require('../../../assets/img/login-bg.jpg')},
                        {imgUrl: require('../../../assets/img/login-bg.jpg')},
                        {imgUrl: require('../../../assets/img/login-bg.jpg')},
                        {imgUrl: require('../../../assets/img/login-bg.jpg')},
                        {imgUrl: require('../../../assets/img/login-bg.jpg')}
                    ]
                },
                video:{
                    title: '视频展示',
                    type: 'primary',
                    size: 'large',
                    icon: 'el-icon-caret-right',
                    viderUrl: require('../../../assets/vedio/vedio.mp4')
                    // viderUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',
                },

                file:{
                    title: '文件展示',
                    type: 'primary',
                    size: 'large',
                    icon: 'el-icon-document',
                    fileList: [
                        {id:'1',name: "文件1"},
                        {id:'2',name: "文件2"},
                        {id:'3',name: "文件3"}
                    ]
                }
            }
        },
        created(){
            let pName = this.$route.query.name;
            console.log("name:"+pName)
            this.getProject(pName);
            this.getPicture(pName);
            this.getVideo(pName);
            this.getFile(pName);
        },
        methods: {

            getProject(pName){
                console.log(pName)
                axios.post('http://localhost:8088/projectShow',qs.stringify({
                    "pName" : pName
                })).then(response => {
                    this.activity.projectName = response.data['projectName']
                    this.activity.projectTeacher = response.data['teacherName']
                    this.activity.projectType = response.data['type']
                    this.activity.projectStudent = response.data['studentName']
                    this.activity.projectDesc = response.data['projectDetail']
                    this.activity.teamDetail = response.data['teamDetail']
                    this.activity.rating = response.data['rating']
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getPicture(pName){
                axios.post('http://localhost:8088/projectPicture',qs.stringify({
                    'projectName' : pName
                })).then(response => {
                    this.pic.picList = response.data
                    console.log(this.pic.picList)
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getVideo(pName){
                axios.post('http://localhost:8088/projectVideo',qs.stringify({
                    'projectName' : pName
                })).then(response => {
                    this.video.viderUrl = response.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getFile(pName){
                axios.post('http://localhost:8088/projectFile',qs.stringify({
                    'projectName' : pName
                })).then(response => {
                    this.file.fileList = response.data
                    // console.log(this)
                }).catch(e => {
                    this.error.push(e)
                })
            },

            handleChange(val) {
                console.log(val);
            },
            setCurrent(row) {
                this.$refs.singleTable.setCurrentRow(row);
            },
            handleCurrentChange(val) {
                this.currentRow = val;
            },
            downloadFile(){
                let row = this.currentRow
                 console.log(row)
                window.location.assign("http://localhost:8088/download?filename="+row.name)
                // axios.get("http://localhost:8088/download?filename="+row.name).then(res => {
                //     console.log("下载成功")
                // }).catch(e => {
                //     this.error.push(e)
                // })
                // axios.post("http://localhost:8088/download",qs.stringify({
                //     "filename" : row.name
                // })).then(res => {
                //     console.log("下载成功")
                // }).catch(e => {
                //     this.error.push(e)
                // })
                // this.$router.push({ })
            },
            addRating(){
                axios.post("http://localhost:8088/addRating",qs.stringify({
                    "projectName" : this.activity.projectName
                })).then(res => {
                    this.activity.rating = res.data
                }).catch(e => {
                    this.error.push(e)
                })
            }
        }
    }
</script>

<style scoped>

</style>
