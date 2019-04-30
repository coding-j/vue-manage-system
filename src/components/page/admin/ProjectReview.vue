<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                <el-breadcrumb-item>项目审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="project" :model="project" label-width="17%">
                    <el-form-item label="项目名称">
                        <el-input v-model="project.pname" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="项目小组成员">
                        <el-input v-model="project.students"></el-input>
                    </el-form-item>
                    <el-form-item label="项目类型">
                        <el-select v-model="project.type" placeholder="请选择" filterable>
                            <el-option v-for="(type, index) in projectConstant.types" :key="index" :label="type" :value="type"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指导老师">
                        <el-select v-model="project.teacher" placeholder="请选择" filterable>
                            <el-option v-for="(teacher, index) in projectConstant.teachers" :key="index" :label="teacher" :value="teacher"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="完成时间">
                        <el-input v-model="project.finishDate"></el-input>
                    </el-form-item>
                    <el-form-item label="项目介绍">
                        <el-input type="textarea" :rows="5" v-model="project.detail"></el-input>
                    </el-form-item>
                    <el-form-item label="团队介绍">
                        <el-input type="textarea" :rows="5" v-model="project.team"></el-input>
                    </el-form-item>
                    <el-button @click="confirm">确认</el-button>
                    <!--<el-form-item label="图片">-->
                        <!--<div class="pic_home">-->
                            <!--<el-col span="6" class="pic_layout" v-for="pic in picturess">-->
                                <!--<img class="pic_style" v-bind:src="pic.imgUrl" alt="">-->
                            <!--</el-col>-->
                        <!--</div>-->
                    <!--</el-form-item>-->
                    <!--<el-upload-->
                            <!--class="upload-demo"-->
                            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
                            <!--:on-preview="handlePreview"-->
                            <!--:on-remove="handleRemove"-->
                            <!--:file-list="pictureList"-->
                            <!--list-type="picture">-->
                        <!--<el-button size="small" type="primary">点击上传</el-button>-->
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    <!--</el-upload>-->
                    <!--<el-upload-->
                            <!--class="upload-demo"-->

                            <!--drag-->
                            <!--:action="uploadUrl"-->
                            <!--accept=".png,.jpg"-->
                            <!--show-file-list-->
                            <!--:before-upload="beforeUploadPic"-->
                            <!--:before-remove="beforeRemove"-->
                            <!--:on-change="fileChange"-->
                            <!--:on-progress="handleProgress"-->
                            <!--:on-success="handleSuccessPic"-->
                            <!--:on-error="handleError"-->
                            <!--:on-preview="handlePreview"-->
                            <!--:on-remove="handleRemove"-->
                            <!--:file-list="picList"-->
                            <!--:auto-upload="true"-->
                            <!--multiple>-->
                        <!--<i class="el-icon-upload"></i>-->
                        <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                        <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>-->
                    <!--</el-upload>-->
                    <el-table
                            @row-click="downloadFile()"
                            max-height="250"
                            title="图片"
                            ref="multipleTable"
                            :data="picturess"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handlePictureSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="图片名称"
                                width="200">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="downloadFile(scope.$index, scope.row)">下载</el-button>
                                <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="danger"-->
                                <!--@click="delFile(scope.$index, scope.row)">删除</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
                        <el-button @click="delPicture()">删除</el-button>
                    </div>

                    <br><br>
                    <!--<el-form-item label="视频">-->
                        <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--drag-->
                                <!--action="/api/posts/"-->
                                <!--multiple>-->
                            <!--<i class="el-icon-upload"></i>-->
                            <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                            <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        <!--</el-upload>-->
                    <!--</el-form-item>-->
                    <el-table
                            @row-click="downloadFile()"
                            title="视频"
                            max-height="250"
                            ref="multipleTable"
                            :data="vedioList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleVideoSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="视频名称"
                                width="200">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="downloadFile(scope.$index, scope.row)">下载</el-button>
                                <!--<el-button-->
                                <!--size="mini"-->
                                <!--type="danger"-->
                                <!--@click="delFile(scope.$index, scope.row)">删除</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
                        <el-button @click="delVideo()">删除</el-button>
                    </div>
                    <!--<el-form-item label="文件">-->
                        <!--<el-upload-->
                                <!--class="upload-demo"-->
                                <!--drag-->
                                <!--action="/api/posts/"-->
                                <!--multiple>-->
                            <!--<i class="el-icon-upload"></i>-->
                            <!--<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>-->
                            <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        <!--</el-upload>-->
                    <!--</el-form-item>-->
                    <br><br>
                    <el-table
                            @row-click="downloadFile()"
                            title="文件"
                            max-height="250"
                            ref="multipleTable"
                            :data="fileList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleFileSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="name"
                                label="文件名称"
                                width="200">
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button
                                        size="mini"
                                        @click="downloadFile(scope.$index, scope.row)">下载</el-button>
                                <!--<el-button-->
                                        <!--size="mini"-->
                                        <!--type="danger"-->
                                        <!--@click="delFile(scope.$index, scope.row)">删除</el-button>-->
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="margin-top: 20px">
                        <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
                            <el-button @click="delFile()">删除</el-button>
                    </div>
                    <!--<el-form-item>-->
                        <!--<el-button type="primary" @click="onSubmit">表单提交</el-button>-->
                        <!--<el-button>取消</el-button>-->
                    <!--</el-form-item>-->
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "ProjectReview",
        data: function(){
            return {
                // pictureList: [
                //     {name: 'food.jpeg', url: require('../../../assets/img/img.jpg')},
                //     {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                // ],
                currentRow:null,
                PictureSelection: [],
                VideoSelection:[],
                FileSelection:[],
                picturess:[
                    // {imgUrl:require('../../../assets/img/login-bg.jpg')},
                    // {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    // {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    // {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    // {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    // {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    // {imgUrl:require("../../../assets/img/login-bg.jpg")}
                ],
                vedioList:[
                    // {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    // {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    // {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    // {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    // {vedioUrl:require("../../../assets/img/login-bg.jpg")}
                ],
                fileList:[
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    // {fileUrl:require("../../../assets/img/login-bg.jpg")}
                ],
                project: {
                    pname: '',
                    students: [],
                    type: "",
                    teacher: "",
                    delivery: true,
                    resource: '小天才',
                    detail: '',
                    finishDate:'',
                    team:'',
                },

                projectConstant: {
                    types: [
                        // {
                        //     id: 0,
                        //     name: "type1"
                        // },
                        // {
                        //     id: 1,
                        //     name: "type2"
                        // }
                    ],
                    teachers: [
                        // {
                        //     id: 0,
                        //     name: "jxb"
                        // },
                        // {
                        //     id: 1,
                        //     name: "zwb"
                        // }
                    ]
                }
            }
        },
        created(){
            let pName = this.$route.query.name;
            this.getProject(pName);
            this.getPicture(pName);
            this.getVideo(pName);
            this.getFile(pName);
            this.getTeacherList();
            this.getProjectType();
            // this.teacherShow(tName);
            // this.teacher_pro(tName);
        },
        methods: {
            confirm(){
                let project = {
                    "projectName":this.project.pname,
                    "studentName" : this.project.students,
                    "type" : this.project.type,
                    "teacherName" : this.project.teacher,
                    "projectDetail" : this.project.detail,
                    "teamDetail" : this.project.team,
                    "finishDate" : this.project.finishDate,
                    "firstPicture":this.picturess[0].name
                }
                axios.post('http://localhost:8088/projectEdit',project).then(res => {
                    this.$message({
                        message: '编辑成功',
                        type: 'success'
                    });
                    console.log("编辑成功")
                    location.reload()
                }).catch(e => {
                    this.error.push(e)
                })
            },
            delPicture(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let rows = this.PictureSelection
                    rows.forEach(row => {
                        console.log(row);
                        axios.post("http://localhost:8088/delPicture",qs.stringify({
                            "pictureName":row.name
                        })).then(res => {
                            console.log("删除成功")
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            location.reload()
                        }).catch(e => {
                            this.error.push(e)
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delVideo(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let rows = this.VideoSelection
                    rows.forEach(row => {
                        console.log(row);
                        axios.post("http://localhost:8088/delVideo",qs.stringify({
                            "videoName":row.name
                        })).then(res => {
                            console.log("删除成功")
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            location.reload()
                        }).catch(e => {
                            this.error.push(e)
                        })
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            delFile(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let rows = this.FileSelection
                    rows.forEach(row => {
                        console.log(row);
                        axios.post("http://localhost:8088/delFile",qs.stringify({
                            "fileName":row.name
                        })).then(res => {
                            console.log("删除成功")
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            location.reload()
                        }).catch(e => {
                            this.error.push(e)
                        })
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getProject(pName){
                axios.post("http://localhost:8088/projectShow",qs.stringify({
                    "pName" : pName
                })).then(res => {
                    console.log(res.data)
                    this.project.pname = res.data['projectName']
                    this.project.students = res.data['studentName']
                    this.project.type = res.data['type']
                    this.project.teacher = res.data['teacherName']
                    this.project.detail = res.data['projectDetail']
                    this.project.team = res.data['teamDetail']
                    this.project.finishDate = res.data['finishDate']
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getPicture(pName){
                axios.post('http://localhost:8088/projectPicture',qs.stringify({
                    "projectName" : pName
                })).then(res => {
                    console.log("picture:"+res.data)
                    this.picturess = res.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getVideo(pName){
                axios.post('http://localhost:8088/projectVideo',qs.stringify({
                    "projectName" : pName
                })).then(res => {
                    console.log("video:"+res.data)
                    this.vedioList = res.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getFile(pName){
                axios.post('http://localhost:8088/projectFile',qs.stringify({
                    "projectName" : pName
                })).then(res => {
                    console.log("file:"+res.data)
                    this.fileList = res.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getProjectType(){
                axios.get('http://localhost:8088/typeList').then(res => {
                    this.projectConstant.types = res.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getTeacherList(){
                axios.get('http://localhost:8088/TeacherNameList').then(res => {
                    this.projectConstant.teachers = res.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            onSubmit() {
                this.$message.success('提交成功！');
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handlePictureSelectionChange(val) {
                // this.currentRow = val;
                this.PictureSelection = val;
            },
            handleVideoSelectionChange(val) {
                // this.currentRow = val;
                this.VideoSelection = val;
            },
            handleFileSelectionChange(val) {
                // this.currentRow = val;
                this.FileSelection = val;
            },
            downloadFile(index, row){
                // let row = this.currentRow
                console.log(index)
                console.log(row)
                window.location.assign("http://localhost:8088/download?filename="+row.name)
            },
            //文件上传
            beforeUploadPic(file){
                let size = file.size / 1024 / 1024
                if(size > 1) {
                    this.$notify.warning({
                        title: '警告',
                        message: `文件大小不得超过1M`
                    });
                }
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            // 文件上传成功时的钩子
            handleSuccessPic(res, file,fileList) {
                // console.log(file,fileList)
                this.$notify.success({
                    title: '成功',
                    message: `文件上传成功`
                });

            },
            // 文件上传失败时的钩子
            handleError(err, file) {
                this.$notify.error({
                    title: '错误',
                    message: `文件上传失败`
                });
            },
        }
    }
</script>

<style scoped>
    .pic_style{
        width: 100px;
        height: 100px;
    }
</style>
