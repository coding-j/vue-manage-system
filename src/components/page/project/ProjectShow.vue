<template>
    <div align="center">
        <div id="test" class="crowd-funding">
            <div class="crowd-funding__header">

                <div class="crowd-funding__header__description">

                    <h1 >{{activity.projectName}}</h1 >
                    <div class="hashtags">
                        <p>项目类型：{{activity.projectType}} &nbsp;&nbsp;&nbsp; 完成时间：{{activity.finishDate}}</p>
                        <p><strong>指导老师：{{activity.projectTeacher}}</strong></p>
                        <p><strong>完成学生：{{activity.projectStudent}}</strong></p>
                        <el-tooltip :content="'目前赞数'+activity.rating" placement="top" effect="light">
                            <el-button type="success" icon="el-icon-star-off" circle @click="addRating"></el-button>
                        </el-tooltip>
                        <!--<span>目前赞数{{activity.rating}}</span>-->
                    </div>
                </div>
                <!--<div :style="{position:absolute,right:100+'px',bottom:0+'px'}">-->
                    <!--<el-button type="success" @click="addRating">点赞</el-button>-->
                    <!--<span>目前赞数{{activity.rating}}</span>-->
                <!--</div>-->
                <!--<div class="crowd-funding__header__details">-->
                <!--<h1>25</h1>-->
                <!--<p class="days-to-go">days to go</p>-->
                <!--<div class="funding-counter">-->
                <!--<p><strong>指导老师：陆坤</strong></p>-->
                <!--<p><strong>完成学生：蒋筱斌，芒果，文博</strong></p>-->
                <!--&lt;!&ndash;<div class="funding-counter__bar"></div>&ndash;&gt;-->
                <!--</div>-->
                <!--</div>-->

            </div>

            <text_slide>
                <div class="crowd-funding__main" :key="activeNum">

                    <el-collapse v-model="activeNames" @change="handleChange" style="width: 100%">
                        <el-collapse-item title="项目介绍" name="1">
                            <div>{{activity.projectDesc}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="团队介绍" name="2">
                            <div>{{activity.teamDetail}}</div>
                        </el-collapse-item>
                        <el-collapse-item title="图片介绍" name="3">
                            <div>
                                <el-carousel :interval="4000" type="card" height="200px">
                                    <el-carousel-item v-for="item in pic.picList" :key="item">
                                        <img :src="imgUrl+item.name">
                                        <!--<img :src="item.imgUrla">-->
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="视频介绍" name="4">
                            <div>
                                <video width="320" height="240" controls="controls">
                                    <source :src="imgUrl+video.viderUrl" type="video/mp4" />
                                    <source :src="imgUrl+video.viderUrl" type="video/ogg" />
                                    <source :src="imgUrl+video.viderUrl" type="video/webm" />
                                    <object :data="imgUrl+video.viderUrl" width="320" height="240">
                                        <embed :src="imgUrl+video.viderUrl" width="320" height="240"/>
                                    </object>
                                </video>
                            </div>
                        </el-collapse-item>
                        <el-collapse-item title="文件列表" name="5">
                            <div>
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
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    <!--<div class="crowd-funding__main__col col1">-->
                    <!--&lt;!&ndash;<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="#85365f">&ndash;&gt;-->
                    <!--&lt;!&ndash;<path d="M 26.978516 3.0214844 C 26.978516 3.0214844 18 3 11 10 C 10.676811 10.323189 10.395406 10.675024 10.140625 11.039062 C 8.8995439 10.939831 6.9997651 10.972248 6.0273438 11.945312 C 3.7573437 14.215312 3 18 3 18 L 8 17.285156 L 8 19 L 11 22 L 12.714844 22 L 12 27 C 12 27 15.784688 26.242656 18.054688 23.972656 C 19.027752 23.000235 19.060169 21.100456 18.960938 19.859375 C 19.324976 19.604594 19.676811 19.323189 20 19 C 27 12 26.978516 3.0214844 26.978516 3.0214844 z M 19 9 C 20.105 9 21 9.895 21 11 C 21 12.105 20.105 13 19 13 C 17.895 13 17 12.105 17 11 C 17 9.895 17.895 9 19 9 z M 7.1992188 19.996094 C 6.8192188 20.096094 6.4591094 20.286984 6.1621094 20.583984 C 4.7961094 21.949984 5.0136719 24.984375 5.0136719 24.984375 C 5.0136719 24.984375 8.0281094 25.219938 9.4121094 23.835938 C 9.7091094 23.538937 9.9 23.176875 10 22.796875 L 9.5429688 22.339844 C 9.4979688 22.403844 9.4701094 22.478156 9.4121094 22.535156 C 8.4371094 23.510156 6.9746094 23.023438 6.9746094 23.023438 C 6.9746094 23.023438 6.4868906 21.560938 7.4628906 20.585938 C 7.5208906 20.527938 7.59225 20.501078 7.65625 20.455078 L 7.1992188 19.996094 z"></path>&ndash;&gt;-->
                    <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                    <!--<h4>项目介绍：</h4>-->
                    <!--<span class="content">You know what to do. We know you know</span>-->
                    <!--&lt;!&ndash;<span class="content">Why not help us build those super warm fortresses for our little friends!? <strong>Winter is coming</strong> and they need that money to buy that wood, insulation and tools</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="button"><strong><small>donate now</small></strong></div>&ndash;&gt;-->
                    <!--</div>-->

                    <!--<div class="crowd-funding__main__col col2">-->
                    <!--&lt;!&ndash;<svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="#85365f">&ndash;&gt;-->
                    <!--&lt;!&ndash;<path d="M 6.5292969 2.515625 A 1 1 0 0 0 5.8085938 2.8085938 A 1 1 0 0 0 5.8085938 4.2226562 A 1 1 0 0 0 7.2226562 4.2226562 A 1 1 0 0 0 7.2226562 2.8085938 A 1 1 0 0 0 6.5292969 2.515625 z M 23.5 2.515625 A 1 1 0 0 0 22.777344 2.8085938 A 1 1 0 0 0 22.777344 4.2226562 A 1 1 0 0 0 24.191406 4.2226562 A 1 1 0 0 0 24.191406 2.8085938 A 1 1 0 0 0 23.5 2.515625 z M 15 3 C 10.029 3 6 7.029 6 12 C 6 17 10 19 12 23 L 18 23 C 20 19 24 17 24 12 C 24 7.029 19.971 3 15 3 z M 15 6 L 15 11 L 19 11 L 15 18 L 15 13 L 11 13 L 15 6 z M 3 11 A 1 1 0 0 0 2 12 A 1 1 0 0 0 3 13 A 1 1 0 0 0 4 12 A 1 1 0 0 0 3 11 z M 27 11 A 1 1 0 0 0 26 12 A 1 1 0 0 0 27 13 A 1 1 0 0 0 28 12 A 1 1 0 0 0 27 11 z M 6.5292969 19.484375 A 1 1 0 0 0 5.8066406 19.777344 A 1 1 0 0 0 5.8066406 21.191406 A 1 1 0 0 0 7.2226562 21.191406 A 1 1 0 0 0 7.2226562 19.777344 A 1 1 0 0 0 6.5292969 19.484375 z M 23.498047 19.486328 A 1 1 0 0 0 22.777344 19.777344 A 1 1 0 0 0 22.777344 21.193359 A 1 1 0 0 0 24.191406 21.193359 A 1 1 0 0 0 24.191406 19.777344 A 1 1 0 0 0 23.498047 19.486328 z M 12 25 L 12 26 C 12 27.105 12.895 28 14 28 A 1 1 0 0 0 15 29 A 1 1 0 0 0 16 28 C 17.105 28 18 27.105 18 26 L 18 25 L 12 25 z"></path>&ndash;&gt;-->
                    <!--&lt;!&ndash;</svg>&ndash;&gt;-->
                    <!--<h4>团队介绍:</h4>-->
                    <!--<span class="content">You know what to do. We know you know</span>-->
                    <!--&lt;!&ndash;<ul>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="list-content">Why should you care? Who knows.</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="list-content">Why should you care? Who knows.</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="list-content">Why should you care? Who knows.</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;<li class="list-content">Why should you care? Who knows.</li>&ndash;&gt;-->
                    <!--&lt;!&ndash;</ul>&ndash;&gt;-->
                    <!--</div>-->
                    <!--<div>-->
                    <!--<el-carousel :interval="4000" type="card" height="280px">-->
                    <!--<el-carousel-item v-for="item in pic.picList" :key="item">-->
                    <!--&lt;!&ndash;<img :src="imgUrl+item.name">&ndash;&gt;-->
                    <!--<img :src="item.imgUrla">-->
                    <!--</el-carousel-item>-->
                    <!--</el-carousel>-->
                    <!--</div>-->
                </div>

                <!--<div  style="width: 100%; height: 100%;" :key="activeNum" >-->
                <!--<el-carousel :interval="4000" type="card" height="280px">-->
                <!--<el-carousel-item v-for="item in pic.picList" :key="item">-->
                <!--&lt;!&ndash;<img :src="imgUrl+item.name">&ndash;&gt;-->
                <!--<img :src="item.imgUrla">-->
                <!--</el-carousel-item>-->
                <!--</el-carousel>-->
                <!--</div>-->

                <!--<div  style="width: 100%; height: 100%;" :key="activeNum" >-->
                <!--<video width="320" height="240" controls="controls">-->
                <!--<source :src="video.viderUrl" type="video/mp4" />-->
                <!--<source :src="video.viderUrl" type="video/ogg" />-->
                <!--<source :src="video.viderUrl" type="video/webm" />-->
                <!--<object :data="video.viderUrl" width="320" height="240">-->
                <!--<embed :src="video.viderUrl" width="320" height="240"/>-->
                <!--</object>-->
                <!--</video>-->
                <!--</div>-->

                <!--<div  style="width: 100%; height: 100%; align: left;" :key="activeNum" >-->
                <!--<el-table-->
                <!--@row-click="downloadFile()"-->
                <!--ref="singleTable"-->
                <!--:data="file.fileList"-->
                <!--highlight-current-row-->
                <!--@current-change="handleCurrentChange"-->
                <!--style="width: 100%">-->
                <!--<el-table-column-->
                <!--type="index"-->
                <!--width="50">-->
                <!--</el-table-column>-->
                <!--<el-table-column-->
                <!--property="name"-->
                <!--label="文件名"-->
                <!--width="120">-->
                <!--</el-table-column>-->
                <!--</el-table>-->
                <!--</div>-->
            </text_slide>

            <span class="arrow arrow-left" @click="onClick"></span>
            <span class="arrow arrow-right" @click="onClick"></span>

        </div>
        <!--<div class="inspired-by">-->
        <!--<a target="_blank" href="https://dribbble.com/shots/3874641-Daily-UI-Day-32-Crowdfunding">-->
        <!--<small>inspired by <strong>this dribbble</strong> shot</small>-->
        <!--</a>-->
        <!--<a class="second-link" target="_blank" href="https://codepen.io/akosstegner/pen/MQvbEe">-->
        <!--<small> and <strong>this pen</strong></small>-->
        <!--</a>-->
        <!--</div>-->
    </div>
</template>
<!--<script src="../../../assets/css/static/anime.min.js"></script>-->
<script>
    import text_slide from '../project/text_slide'
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "ProjectShow",
        components: {text_slide},
        data: () => ({
            activeNum: 0,
            activeNames: ['1'],

            //rating
            // star:'目前赞数'+this.activity.rating,

            imgUrl:'http://localhost:8088/show?pictureName=',
            activeNames: ['1','2','3','4','5'],
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
                    finishDate:'',
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
                    {imgUrla: require('../../../assets/img/login-bg.jpg')},
                    {imgUrla: require('../../../assets/img/login-bg.jpg')},
                    {imgUrla: require('../../../assets/img/login-bg.jpg')},
                    {imgUrla: require('../../../assets/img/login-bg.jpg')},
                    {imgUrla: require('../../../assets/img/login-bg.jpg')}
                ]
            },
            video:{
                title: '视频展示',
                type: 'primary',
                size: 'large',
                icon: 'el-icon-caret-right',
                viderUrl:''
                // viderUrl: require('../../../assets/vedio/vedio.mp4')
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
        }),

        computed: {
            activeItem() {
                return this.items[this.activeNum];
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
            onClick() {
                this.activeNum = this.activeNum >= 3 ? 0 : ++this.activeNum;
                console.log("activeNum:"+this.activeNum)
            },
            handleChange(val) {
                console.log(val);
            },


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
                    this.activity.finishDate = response.data['finishDate']
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
                    this.video.viderUrl = response.data[0].name
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

<style lang="scss">
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');

    * {
        box-sizing: border-box;
        font-family: 'Roboto';
    }

    body {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        /*width: 100%;*/
        /*min-height: 100vh;*/
        /*background: linear-gradient(to top right, #d5888c, #fdfafa 43%, #fdfafa 56%, #85365f);*/
        /*margin: 0 auto;*/
        /*padding: 20px 50px;*/
    }

    .crowd-funding {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 950px;
        height: 100%;
        min-height: 550px;
        max-height: 1000px;
        box-shadow: 0px 2px 4px hsla(0, 0%, 0%, .18);
        box-shadow: 0 10px 40px 0 rgba(0, 0, 0, .27);
        border-radius: 3px;

        &__header {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 40%;
            min-height: 250px;
            padding: 20px 30px;
            background: linear-gradient(
                            rgba(133, 54, 95, .8),
                            rgba(200, 70, 87, .8)
            ), url('../../../assets/img/TIM图片20190430134150.jpg');

            background: linear-gradient(
                            rgba(200, 70, 87, .3),
                            rgba(133, 54, 95, .8)
            ), url('../../../assets/img/TIM图片20190430134150.jpg');

            background-size: cover;
            background-position: center;
            color: #fdfafa;
            border-radius: 3px 3px 0 0;
            // border-bottom: 6px solid #85365f;

            h1 {
                font-size: 50px;
                letter-spacing: 3px;
                margin-bottom: 7px;
                padding: 0;
                line-height: 50px;
                opacity: .9;
            }

            p {
                font-size: 16px;
                opacity: .8;
                margin: 0 0 3px 0;
                padding: 0;
                line-height: 18px;
            }

            .hashtags {
                opacity: .8;
                font-size: 10px;
                margin-top: 5px;
            }

            &__description {
                /*align-items: center;*/
                width: 100%;
            }

            &__details {
                width: 40%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;

                .days-to-go {
                    margin-top: 5px;
                    margin-bottom: 5px;
                }

                .funding-counter {
                    display: flex;
                    flex-direction: column;

                    p {
                        opacity: 1;

                        @media (max-width: 523px) {
                            font-size: 12px;
                        }
                    }

                    &__bar {
                        width: 100%;
                        height: 5px;
                        border: 1px solid #fff;
                        margin-top: 3px;
                        background: linear-gradient(to right, #fff 40%, transparent 40%);
                        border-radius: 1px;
                    }
                }
            }
        }

        &__main {
            display: flex;
            justify-content: space-between;
            height: 100%;
            min-height: 1600px;
            padding: 20px 30px;
            background: #fdfafa;
            color: #85365f;
            border-radius: 0 0 3px 3px;
            overflow: hidden;

            h4 {
                margin: 0 0 10px 0;
            }

            .content {
                font-size: 12px;
                font-weight: 300;
                margin: 5px 0;
                line-height: 8px;
            }

            &__col {
                display: flex;
                flex-direction: column;
                width: 45%;

                .icon {
                    width: 30px;
                    height: 30px;
                    margin-bottom: 10px;
                }

                .button {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    max-width: 150px;
                    margin-top: 15px;
                    color: #fdfafa;
                    background-color: #85365f;
                    border: 1px solid #85365f;
                    border-radius: 2px;
                    transition: all 200ms;
                    cursor: pointer;

                    &:hover {
                        background: #fdfafa;
                        color: #85365f;
                    }
                }

                ul {
                    list-style: none;
                    padding: 0;
                    margin: 5px 0 0 0;

                    li {
                        position: relative;
                        padding-left: 15px;
                    }

                    .list-content {
                        font-size: 12px;
                        font-weight: 300;
                        margin: 7px 0;
                    }

                    li::before {
                        box-sizing: border-box;
                        position: absolute;
                        left: 0;
                        top: 2px;
                        content: "";
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        border: 2px solid #85365f;
                    }
                }
            }

        }
    }

    .arrow {
        position: absolute;
        content: "";
        top: calc(50% - 10px);
        width: 25px;
        height: 25px;
        transform: rotate(45deg);
        transition: all 200ms;
        cursor: pointer;
    }

    .arrow-right {
        right: -40px;
        border-top: 2px solid #85365f;
        border-right: 2px solid #85365f;

        &:hover {
            right: -43px;
        }
    }

    .arrow-left {
        left: -40px;
        border-bottom: 2px solid #85365f;
        border-left: 2px solid #85365f;

        &:hover {
            left: -43px;
        }
    }

    .inspired-by {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        max-width: 800px;
        a {
            font-size: 14px;
            padding: 3px 0;
            text-decoration: none;
            color: #85365f;
            opacity: .8;
        }

        a.second-link {
            margin-left: 3px
        }
    }
</style>

<!--<template>-->
    <!--<div>-->
        <!--<div class="block">-->
            <!--<el-timeline>-->
                <!--<el-timeline-item placement="top"-->
                    <!--:icon="activity.icon"-->
                    <!--:type="activity.type"-->
                    <!--:size="activity.size">-->
                    <!--<el-card>-->
                        <!--<div>-->
                            <!--<el-button type="success" @click="addRating">点赞</el-button>-->
                            <!--目前赞数{{activity.rating}}-->
                        <!--</div>-->
                        <!--<h4>{{activity.title}}</h4>-->
                        <!--<p>{{activity.projectName}}</p>-->
                        <!--<p>{{activity.projectTeacher}}</p>-->
                        <!--<p>{{activity.projectType}}</p>-->
                        <!--&lt;!&ndash;<p>{{activity.projectStudent}}</p>&ndash;&gt;-->
                        <!--<el-collapse v-model="activeNames" @change="handleChange">-->
                            <!--<el-collapse-item :title="activity.projectStudent" name="1">-->
                                <!--<div>{{activity.teamDetail}}</div>-->
                                <!--&lt;!&ndash;<div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>&ndash;&gt;-->
                                <!--&lt;!&ndash;<div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>&ndash;&gt;-->
                            <!--</el-collapse-item>-->
                        <!--</el-collapse>-->
                        <!--<p>{{activity.projectDesc}}</p>-->
                    <!--</el-card>-->
                <!--</el-timeline-item>-->
                <!--<el-timeline-item placement="top"-->
                    <!--:icon="pic.icon"-->
                    <!--:type="pic.type"-->
                    <!--:size="pic.size">-->
                    <!--<el-card>-->
                        <!--<h4>{{pic.title}}</h4>-->
                        <!--&lt;!&ndash;轮播图&ndash;&gt;-->
                        <!--<el-carousel :interval="4000" type="card" height="200px">-->
                            <!--<el-carousel-item v-for="item in pic.picList" :key="item">-->
                                <!--<img :src="imgUrl+item.name">-->
                            <!--</el-carousel-item>-->
                        <!--</el-carousel>-->
                    <!--</el-card>-->
                <!--</el-timeline-item>-->
                <!--<el-timeline-item placement="top"-->
                    <!--:icon="video.icon"-->
                    <!--:type="video.type"-->
                    <!--:size="video.size">-->
                    <!--<el-card>-->
                        <!--<h4>{{video.title}}</h4>-->
                        <!--&lt;!&ndash;视频&ndash;&gt;-->
                        <!--<video width="320" height="240" controls="controls">-->
                            <!--<source :src="video.viderUrl" type="video/mp4" />-->
                            <!--<source :src="video.viderUrl" type="video/ogg" />-->
                            <!--<source :src="video.viderUrl" type="video/webm" />-->
                            <!--<object :data="video.viderUrl" width="320" height="240">-->
                                <!--<embed :src="video.viderUrl" width="320" height="240"/>-->
                            <!--</object>-->
                        <!--</video>-->
                    <!--</el-card>-->
                <!--</el-timeline-item>-->
                <!--<el-timeline-item placement="top"-->
                    <!--:icon="file.icon"-->
                    <!--:type="file.type"-->
                    <!--:size="file.size">-->
                    <!--<el-card>-->
                        <!--<h4>{{file.title}}</h4>-->
                        <!--&lt;!&ndash;文件&ndash;&gt;-->
                        <!--&lt;!&ndash;<a class='download' :href='downloadhttp' download=""  title="下载">下载</a>&ndash;&gt;-->
                        <!--<el-table-->
                                <!--@row-click="downloadFile()"-->
                                <!--ref="singleTable"-->
                                <!--:data="file.fileList"-->
                                <!--highlight-current-row-->
                                <!--@current-change="handleCurrentChange"-->
                                <!--style="width: 100%">-->
                            <!--<el-table-column-->
                                    <!--type="index"-->
                                    <!--width="50">-->
                            <!--</el-table-column>-->
                            <!--<el-table-column-->
                                    <!--property="name"-->
                                    <!--label="文件名"-->
                                    <!--width="120">-->
                            <!--</el-table-column>-->
                        <!--</el-table>-->
                    <!--</el-card>-->
                <!--</el-timeline-item>-->
            <!--</el-timeline>-->
        <!--</div>-->
    <!--</div>-->
<!--</template>-->

<!--<script>-->
    <!--import axios from 'axios'-->
    <!--import qs from 'qs'-->
    <!--export default {-->
        <!--name: "ProjectShow",-->
        <!--data(){-->
            <!--return {-->
                <!--imgUrl:'http://localhost:8088/show?pictureName=',-->
                <!--activeNames: ['1'],-->
                <!--currentRow:null,-->
                <!--// downloadhttp: 'E:\\coding-web\\vue-manage-system\\src\\assets\\img\\img.jpg',-->
                <!--activity:-->
                    <!--{-->
                        <!--rating : 0,-->
                        <!--title: "项目介绍",-->
                        <!--type: 'primary',-->
                        <!--size: 'large',-->
                        <!--projectName:"项目一",-->
                        <!--projectTeacher: "导师一",-->
                        <!--projectType: "Javaweb",-->
                        <!--projectStudent: "学生1、学生2、学生3、学生4、学生5",-->
                        <!--projectDesc: "这是一个怎么样的项目",-->
                        <!--teamDetail: "hhh",-->
                        <!--icon: 'el-icon-more'-->
                    <!--},-->
                <!--pic:{-->
                    <!--title: '图片展示',-->
                    <!--type: 'primary',-->
                    <!--size: 'large',-->
                    <!--icon: 'el-icon-picture',-->
                    <!--picList: [-->
                        <!--{imgUrl: require('../../../assets/img/login-bg.jpg')},-->
                        <!--{imgUrl: require('../../../assets/img/login-bg.jpg')},-->
                        <!--{imgUrl: require('../../../assets/img/login-bg.jpg')},-->
                        <!--{imgUrl: require('../../../assets/img/login-bg.jpg')},-->
                        <!--{imgUrl: require('../../../assets/img/login-bg.jpg')}-->
                    <!--]-->
                <!--},-->
                <!--video:{-->
                    <!--title: '视频展示',-->
                    <!--type: 'primary',-->
                    <!--size: 'large',-->
                    <!--icon: 'el-icon-caret-right',-->
                    <!--viderUrl: require('../../../assets/vedio/vedio.mp4')-->
                    <!--// viderUrl: 'http://babylife.qiniudn.com/FtRVyPQHHocjVYjeJSrcwDkApTLQ',-->
                <!--},-->

                <!--file:{-->
                    <!--title: '文件展示',-->
                    <!--type: 'primary',-->
                    <!--size: 'large',-->
                    <!--icon: 'el-icon-document',-->
                    <!--fileList: [-->
                        <!--{id:'1',name: "文件1"},-->
                        <!--{id:'2',name: "文件2"},-->
                        <!--{id:'3',name: "文件3"}-->
                    <!--]-->
                <!--}-->
            <!--}-->
        <!--},-->
        <!--created(){-->
            <!--let pName = this.$route.query.name;-->
            <!--console.log("name:"+pName)-->
            <!--this.getProject(pName);-->
            <!--this.getPicture(pName);-->
            <!--this.getVideo(pName);-->
            <!--this.getFile(pName);-->
        <!--},-->
        <!--methods: {-->

            <!--getProject(pName){-->
                <!--console.log(pName)-->
                <!--axios.post('http://localhost:8088/projectShow',qs.stringify({-->
                    <!--"pName" : pName-->
                <!--})).then(response => {-->
                    <!--this.activity.projectName = response.data['projectName']-->
                    <!--this.activity.projectTeacher = response.data['teacherName']-->
                    <!--this.activity.projectType = response.data['type']-->
                    <!--this.activity.projectStudent = response.data['studentName']-->
                    <!--this.activity.projectDesc = response.data['projectDetail']-->
                    <!--this.activity.teamDetail = response.data['teamDetail']-->
                    <!--this.activity.rating = response.data['rating']-->
                <!--}).catch(e => {-->
                    <!--this.error.push(e)-->
                <!--})-->
            <!--},-->
            <!--getPicture(pName){-->
                <!--axios.post('http://localhost:8088/projectPicture',qs.stringify({-->
                    <!--'projectName' : pName-->
                <!--})).then(response => {-->
                    <!--this.pic.picList = response.data-->
                    <!--console.log(this.pic.picList)-->
                <!--}).catch(e => {-->
                    <!--this.error.push(e)-->
                <!--})-->
            <!--},-->
            <!--getVideo(pName){-->
                <!--axios.post('http://localhost:8088/projectVideo',qs.stringify({-->
                    <!--'projectName' : pName-->
                <!--})).then(response => {-->
                    <!--this.video.viderUrl = response.data-->
                <!--}).catch(e => {-->
                    <!--this.error.push(e)-->
                <!--})-->
            <!--},-->
            <!--getFile(pName){-->
                <!--axios.post('http://localhost:8088/projectFile',qs.stringify({-->
                    <!--'projectName' : pName-->
                <!--})).then(response => {-->
                    <!--this.file.fileList = response.data-->
                    <!--// console.log(this)-->
                <!--}).catch(e => {-->
                    <!--this.error.push(e)-->
                <!--})-->
            <!--},-->

            <!--handleChange(val) {-->
                <!--console.log(val);-->
            <!--},-->
            <!--setCurrent(row) {-->
                <!--this.$refs.singleTable.setCurrentRow(row);-->
            <!--},-->
            <!--handleCurrentChange(val) {-->
                <!--this.currentRow = val;-->
            <!--},-->
            <!--downloadFile(){-->
                <!--let row = this.currentRow-->
                 <!--console.log(row)-->
                <!--window.location.assign("http://localhost:8088/download?filename="+row.name)-->
                <!--// axios.get("http://localhost:8088/download?filename="+row.name).then(res => {-->
                <!--//     console.log("下载成功")-->
                <!--// }).catch(e => {-->
                <!--//     this.error.push(e)-->
                <!--// })-->
                <!--// axios.post("http://localhost:8088/download",qs.stringify({-->
                <!--//     "filename" : row.name-->
                <!--// })).then(res => {-->
                <!--//     console.log("下载成功")-->
                <!--// }).catch(e => {-->
                <!--//     this.error.push(e)-->
                <!--// })-->
                <!--// this.$router.push({ })-->
            <!--},-->
            <!--addRating(){-->
                <!--axios.post("http://localhost:8088/addRating",qs.stringify({-->
                    <!--"projectName" : this.activity.projectName-->
                <!--})).then(res => {-->
                    <!--this.activity.rating = res.data-->
                <!--}).catch(e => {-->
                    <!--this.error.push(e)-->
                <!--})-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
