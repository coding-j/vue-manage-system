<template>
    <div>
        <div class="block">
            <el-timeline>
                <el-timeline-item placement="top"
                    :icon="activity.icon"
                    :type="activity.type"
                    :size="activity.size">
                    <el-card>
                        <h4>{{activity.title}}</h4>
                        <p>{{activity.projectName}}</p>
                        <p>{{activity.projectTeacher}}</p>
                        <p>{{activity.projectType}}</p>
                        <p>{{activity.projectStudent}}</p>
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
                            <el-carousel-item v-for="item in pic.picList">
                                <img :src="item.imgUrl">
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
                    </el-card>
                </el-timeline-item>
                <el-timeline-item placement="top"
                    :icon="file.icon"
                    :type="file.type"
                    :size="file.size">
                    <el-card>
                        <h4>{{file.title}}</h4>
                        <!--文件-->
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import '../../../assets/font/iconfont.css'
    export default {
        name: "ProjectShow",
        data(){
            return {
                activity:
                    {
                        title: "项目介绍",
                        type: 'primary',
                        size: 'large',
                        projectName:"项目一",
                        projectTeacher: "导师一",
                        projectType: "Javaweb",
                        projectStudent: "学生1、学生2、学生3、学生4、学生5",
                        projectDesc: "这是一个怎么样的项目",
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
                    sources: require('../../../assets/vedio/vedio.mp4'),
                },
                file:{
                    title: '文件展示',
                    type: 'primary',
                    size: 'large',
                    icon: 'el-icon-document'
                }
            }
        }
    }
</script>

<style scoped>

</style>