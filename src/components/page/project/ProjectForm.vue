<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实训项目</el-breadcrumb-item>
                <el-breadcrumb-item>项目上传</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-steps :active="active" finish-status="success">
                    <el-step title="步骤 1"></el-step>
                    <el-step title="步骤 2"></el-step>
                    <el-step title="步骤 3"></el-step>
                    <el-step title="步骤 4"></el-step>
                </el-steps>
                <el-form ref="project" :model="project" label-width="17%" :rules="aaa">
                    <div class="basicInfo" v-if="active===0">
                        <el-form-item label="项目名称" prop="pname" >
                            <el-input v-model="project.pname"></el-input>
                        </el-form-item>
                        <el-form-item label="小组成员" prop="students">
                            <el-input v-model="project.students"></el-input>
                            <span>用中文字符的顿号隔开,如：xxx、xxx、xxx</span>
                        </el-form-item>
                        <el-form-item label="项目类型" prop="type">
                            <el-select v-model="project.type" placeholder="请选择" filterable>
                                <el-option v-for="(type, index) in projectConstant.types" :key="index" :label="type" :value="type"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="指导老师" prop="teacher">
                            <el-select v-model="project.teacher" placeholder="请选择" filterable>
                                <el-option v-for="(teacher, index) in projectConstant.teachers" :key="index" :label="teacher" :value="teacher"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="完成时间" prop="finishDate">
                            <el-input v-model="project.finishDate"></el-input>
                            <span>格式：2019春季学期</span>
                        </el-form-item>
                        <el-form-item label="项目介绍" prop="detail">
                            <el-input type="textarea" :rows="5" v-model="project.detail"></el-input>
                        </el-form-item>
                        <el-form-item label="团队介绍" prop="team">
                            <el-input type="textarea" :rows="5" v-model="project.team"></el-input>
                        </el-form-item>
                    </div>
                    <div class="picture" v-if="active===1">
                        <el-form-item label="图片">
                            <el-upload
                                    class="upload-demo"

                                    drag
                                    :action="uploadUrl"
                                    accept=".png,.jpg"
                                    show-file-list
                                    :before-upload="beforeUploadPic"
                                    :before-remove="beforeRemove"
                                    :on-change="fileChange"
                                    :on-progress="handleProgress"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="picList"
                                    :auto-upload="true"
                                    multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过1M</div>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="video" v-if="active===2">
                        <el-form-item label="视频">
                            <el-upload
                                    class="upload-demo"

                                    drag
                                    :action="uploadUrl"
                                    accept=".mp4"
                                    show-file-list
                                    :before-upload="beforeUploadVideo"
                                    :before-remove="beforeRemove"
                                    :on-change="fileChange"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="videoList"
                                    :auto-upload="true"
                                    multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传mp4文件，且不超过100M</div>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="file" v-if="active===3">
                        <el-form-item label="文件">
                            <el-upload
                                    class="upload-demo"
                                    drag
                                    :action="uploadUrl"
                                    accept=".ppt.pptx.doc.docx.xls.xlsx"
                                    show-file-list
                                    :before-upload="beforeUploadFile"
                                    :before-remove="beforeRemove"
                                    :on-change="fileChange"
                                    :on-success="handleSuccess"
                                    :on-error="handleError"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :file-list="fileList"
                                    :auto-upload="true"
                                    multiple>
                                <i class="el-icon-upload"></i>
                                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                <div class="el-upload__tip" slot="tip">只能上传ppt/pptx/word/xls文件，且不超过10M</div>
                            </el-upload>
                        </el-form-item>
                    </div>
                    <div class="btn">
                        <el-form-item>
                            <el-button type="primary" @click="prev()" v-if="active==1||active==2||active==3">上一步</el-button>
                            <el-button type="primary" @click="next('project')" v-if="active==0||active==1||active==2">下一步</el-button>
                            <el-button type="primary" @click="submitUpload" v-if="active==3">提交</el-button>
                            <!--<el-button>取消</el-button>-->
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: 'ProjectForm',
        data: function(){
            return {
                aaa:{
                    pname:[
                        {required: true, message: '请输入项目名称', trigger: 'blur'}
                    ],
                    students:[
                        {required: true, message: '请输入项目学生姓名', trigger: 'blur'}
                    ],
                    type:[
                        {required: true, message: '请选择项目类型',trigger: 'change'}
                    ],
                    teacher:[
                        {required: true, message: '请选择指导老师',trigger: 'change'}
                    ],
                    finishDate:[
                        {required: true, message:'请输入完成时间'}
                    ],
                    detail:[
                        {required: true, message:'请输入项目介绍', trigger:'blur'}
                    ],
                    team:[
                        {required:true, message:'请输入团队介绍',trigger:'blur'}
                    ]
                },
                active: 0,
                uploadUrl:'http://localhost:8088/file_upload',
                picList:[],
                videoList:[],
                files:[],

                //rule
                // aaa:'',
                // pName:'',
                // student:'',
                // teacher:'',
                // date:'',
                // type:'',
                // prodes:'',
                // teamDes:'',

                project: {
                    pname: '',
                    students: [],
                    type: "",
                    teacher: "",
                    delivery: true,
                    resource: '小天才',
                    detail: '',
                    finishData:'',
                    team:'',
                },

                projectConstant: {
                    types: [

                    ],
                    teachers: [

                    ]
                }
            }
        },
        created(){
            this.getProjectType();
            this.getTeacherList();
        },
        methods: {
            prev(){
                --this.active;
                if(this.active < 0) this.active = 0;
            },
            next(formName){
                // ++this.active;
                if(this.active == 0){
                    this.$refs[formName].validate((valid) => {
                        if(valid){
                            this.active++;
                        }else {
                            return false;
                        }
                    })
                }else{
                    if(this.active++ > 3) this.active = 0;
                }

            },
            // 文件上传成功时的钩子
            handleSuccess(res, file,fileList) {
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
            // 文件状态改变时的钩子
            fileChange(file,fileList) {
                if(this.active == 1){
                    console.log(this.active,fileList)
                    this.picList = fileList;
                }
                if(this.active == 2){
                    console.log(this.active,fileList)
                    this.videoList = fileList;
                }
                if(this.active == 3){
                    console.log(this.active,fileList)
                    this.files = fileList;
                }
                this.file = file.raw
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            beforeUploadFile(file) {
                let size = file.size / 1024 /1024
                if(size > 10){
                    this.$notify.warning({
                        title: '警告',
                        message: `文件大小不得超过10M`
                    });
                }
            },
            beforeUploadVideo(file){
                let size = file.size /1024 /1024
                if(size > 100){
                    this.$notify.warning({
                        title: '警告',
                        message: `文件大小不得超过100M`
                    });
                }
            },
            beforeUploadPic(file){
                let size = file.size / 1024 / 1024
                if(size > 1) {
                    this.$notify.warning({
                        title: '警告',
                        message: `文件大小不得超过1M`
                    });
                }
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
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
            submitUpload() {
                let project = {
                    "projectName": this.project.pname,
                    "type": this.project.type,
                    "finishDate": this.project.finishDate,
                    "studentName": this.project.students,
                    "teacherName": this.project.teacher,
                    "projectDetail": this.project.detail,
                    "teamDetail": this.project.team,
                    "firstPicture":this.picList[0].name,
                    "pictureList" : this.picList,
                    "videoList" : this.videoList,
                    "fileList" : this.files
                }
                // console.log(project)
                console.log("files:"+this.files)

                // this.$refs.upload.submit();
                axios.post('http://localhost:8088/uploadProject', project).then(res => {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.$router.push({ path:'/project_list'})
                    console.log("上传成功")
                }).catch(e => {
                    this.error.push(e)
                })
            },
            // onSubmit() {
            //     this.$message.success('提交成功！');
            // }
        }
    }
</script>
