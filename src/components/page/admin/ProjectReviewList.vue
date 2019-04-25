<template>
    <div>
        <div class="table">
            <div class="crumbs">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                    <el-breadcrumb-item>导师管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div>

                <el-dialog title="添加老师" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="导师名" :label-width="formLabelWidth">
                            <el-input v-model="form.name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="工作单位" :label-width="formLabelWidth">
                            <el-input v-model="form.working" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="通讯地址" :label-width="formLabelWidth">
                            <el-input v-model="form.address" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="个人简介" :label-width="formLabelWidth">
                            <el-input type="textarea" :rows="5" v-model="form.introduction" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="工作经历" :label-width="formLabelWidth">
                            <el-input type="textarea" :rows="5" v-model="form.workExperience" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-upload
                                class="upload-demo"
                                ref="upload"
                                drag
                                :limit="1"
                                action="http://localhost:8088/file_upload"
                                accept=".png,.jpg"
                                show-file-list
                                :before-upload="beforeUploadFile"
                                :before-remove="beforeRemove"
                                :on-success="handleSuccess"
                                :on-error="handleError"
                                :on-remove="handleRemove"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                        <!--<div>-->
                        <!--<el-table :data="data">-->
                        <!--<el-table-column prop="name" label="工作经历">-->
                        <!--<template  slot-scope="scope">-->
                        <!--<el-input v-model="data[scope.$index].name"></el-input>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <!--<el-table-column label="操作">-->
                        <!--<template  slot-scope="scope">-->
                        <!--<el-button @click="deleteRow(scope.$index)">删除</el-button>-->
                        <!--</template>-->
                        <!--</el-table-column>-->
                        <!--</el-table>-->
                        <!--<el-button @click="add" type="primary" round>添加</el-button>-->
                        <!--</div>-->
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addTeacher" >确 定</el-button>
                    </div>
                </el-dialog>
            </div>
            <div>
                <el-table

                        :data="teacherList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="Name"
                            prop="teacherName">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-button type="primary" round @click="dialogFormVisible = true">添加老师</el-button>
                            <!--<el-input-->
                                    <!--v-model="search"-->
                                    <!--size="mini"-->
                                    <!--placeholder="输入关键字搜索"/>-->
                            <!--<el-button type="primary" @click="searchTeacher">搜索</el-button>-->
                        </template>
                        <template slot-scope="scope">
                            <el-button
                                    size="mini"
                                    @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                            <el-button
                                    size="mini"
                                    type="danger"
                                    @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-table
                    @row-click="openProjectDetails"
                    ref="multipleTable"
                    height="250"
                    :data="ProjectList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="projectName"
                        label="项目名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="teacherName"
                        label="导师姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="finishDate"
                        label="提交日期"
                        width="120">
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <!--<el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>-->
                <el-button @click="toggleSelection()">删除</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "ProjectReviewList",
        data(){
            return {
                fileName: '',
                dialogFormVisible : false,
                formLabelWidth: '120px',
                form:{
                    name : '',
                    working: '',
                    address: '',
                    introduction : '',
                    workExperience:'',
                },
                ProjectList: [
                //     {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }, {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }, {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }, {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }, {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }, {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }, {
                //     name: '项目一',
                //     teacher: '王小虎',
                //     date: '2016-05-01'
                // }
                ],
                multipleSelection: [],
                teacherList: [
                //     {
                //     name: '王小虎'
                // }, {
                //     name: '张文博'
                // }, {
                //     name: '欧阳诚'
                // }, {
                //     name: '羊艺超'
                // }
                ],
                search: ''
            };
        },
        created(){
            this.getTeacherList();
            this.getProjectList();
        },

        methods: {


            addTeacher(){
                let teacher = {
                    "teacherName" : this.form.name,
                    "pictureUrl" : this.fileName,
                    "working" : this.form.working,
                    "address" : this.form.address,
                    "introduction" : this.form.introduction,
                    "workExperience": this.form.workExperience
                }
                console.log(teacher)
                axios.post('http://localhost:8088/addTeacher',teacher).then(res => {
                    console.log("添加成功")
                    location.reload()
                }).catch(e => {
                    this.error.push(e)
                })
                this.dialogFormVisible = false;
            },
            getTeacherList(){
                axios.get('http://localhost:8088/TeacherList').then(res => {
                    this.teacherList = res.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getProjectList(){
                axios.get('http://localhost:8088/projectList').then(res => {
                    console.log(res.data)
                    this.ProjectList = res.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            handleEdit(index, row){
                this.$router.push({ path: '/teacherAdminShow?name='+row.teacherName})
            },
            handleDelete(index, row) {
                axios.post('http://localhost:8088/deleteTeacher',qs.stringify({
                    "teacherName": row.teacherName
                })).then(res => {
                    console.log("删除成功")
                    location.reload()
                }).catch(e => {
                    this.error.push(e)
                })
                //console.log(index, row);
            },
            toggleSelection() {
                let rows = this.multipleSelection
                if (rows) {
                    rows.forEach(row => {
                        console.log(row)
                        axios.post('http://localhost:8088/projectDel',qs.stringify({
                            "projectName" : row.projectName
                        })).then(res => {
                            console.log("删除成功")
                            location.reload()
                        })
                    });
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            openProjectDetails(row){
                this.$router.push({ path:'/projectReview?name='+row.projectName  })
            },
            // openTeacherDetails(row){
            //     console.log(row.teacherName)
            //     // reload
            //     this.$router.push({ path: '/teacherAdminShow?name='+row.teacherName})
            // },
            // 文件上传成功时的钩子
            handleSuccess(res, file) {
                this.fileName = file.name
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
            // 文件状态改变时的钩子
            fileChange(file,fileList) {
                this.file = file.raw
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeUploadFile(file) {

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
            searchTeacher(){
                axios.post('http://localhost:8088/searchTeacherName',qs.stringify({
                    "teacherName" : this.search
                })).then(res => {
                    console.log(res.data)
                    this.teacherList = res.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
        }
    }
</script>

<style scoped>
    .el-transfer-panel{
        width: 100%;
        height: 100%;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
