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
                        <el-input v-model="project.name"></el-input>
                    </el-form-item>
                    <el-form-item label="项目小组成员">
                        <el-select v-model="project.students" placeholder="请选择" multiple filterable>
                            <el-option v-for="(student, index) in projectConstant.students" :key="index" :label="student.name" :value="student.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目类型">
                        <el-select v-model="project.type" placeholder="请选择" filterable>
                            <el-option v-for="(type, index) in projectConstant.types" :key="index" :label="type.name" :value="type.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="指导老师">
                        <el-select v-model="project.teacher" placeholder="请选择" filterable>
                            <el-option v-for="(teacher, index) in projectConstant.teachers" :key="index" :label="teacher.name" :value="teacher.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目介绍">
                        <el-input type="textarea" :rows="5" v-model="project.name"></el-input>
                    </el-form-item>
                    <!--<el-form-item label="图片">-->
                        <!--<div class="pic_home">-->
                            <!--<el-col span="6" class="pic_layout" v-for="pic in picturess">-->
                                <!--<img class="pic_style" v-bind:src="pic.imgUrl" alt="">-->
                            <!--</el-col>-->
                        <!--</div>-->
                    <!--</el-form-item>-->
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :file-list="pictureList"
                            list-type="picture">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <!--<el-table-->
                            <!--max-height="250"-->
                            <!--title="图片"-->
                            <!--ref="multipleTable"-->
                            <!--:data="picturess"-->
                            <!--tooltip-effect="dark"-->
                            <!--style="width: 100%"-->
                            <!--@selection-change="handleSelectionChange">-->
                        <!--<el-table-column-->
                                <!--type="selection"-->
                                <!--width="55">-->
                        <!--</el-table-column>-->
                        <!--<el-table-column-->
                                <!--prop="imgUrl"-->
                                <!--label="图片名称"-->
                                <!--width="200">-->
                        <!--</el-table-column>-->
                    <!--</el-table>-->

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
                            title="视频"
                            max-height="250"
                            ref="multipleTable"
                            :data="vedioList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="vedioUrl"
                                label="视频名称"
                                width="200">
                        </el-table-column>
                    </el-table>
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
                            title="文件"
                            max-height="250"
                            ref="multipleTable"
                            :data="fileList"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange">
                        <el-table-column
                                type="selection"
                                width="55">
                        </el-table-column>
                        <el-table-column
                                prop="fileUrl"
                                label="文件名称"
                                width="200">
                        </el-table-column>
                    </el-table>
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
    export default {
        name: "ProjectReview",
        data: function(){
            return {
                pictureList: [
                    {name: 'food.jpeg', url: require('../../../assets/img/img.jpg')},
                    {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
                ],

                picturess:[
                    {imgUrl:require('../../../assets/img/login-bg.jpg')},
                    {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    {imgUrl:require("../../../assets/img/login-bg.jpg")},
                    {imgUrl:require("../../../assets/img/login-bg.jpg")}
                ],
                vedioList:[
                    {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    {vedioUrl:require("../../../assets/img/login-bg.jpg")},
                    {vedioUrl:require("../../../assets/img/login-bg.jpg")}
                ],
                fileList:[
                    {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    {fileUrl:require("../../../assets/img/login-bg.jpg")},
                    {fileUrl:require("../../../assets/img/login-bg.jpg")}
                ],
                options:[
                    {
                        value: 'guangdong',
                        label: '广东省',
                        children: [
                            {
                                value: 'guangzhou',
                                label: '广州市',
                                children: [
                                    {
                                        value: 'tianhe',
                                        label: '天河区'
                                    },
                                    {
                                        value: 'haizhu',
                                        label: '海珠区'
                                    }
                                ]
                            },
                            {
                                value: 'dongguan',
                                label: '东莞市',
                                children: [
                                    {
                                        value: 'changan',
                                        label: '长安镇'
                                    },
                                    {
                                        value: 'humen',
                                        label: '虎门镇'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        value: 'hunan',
                        label: '湖南省',
                        children: [
                            {
                                value: 'changsha',
                                label: '长沙市',
                                children: [
                                    {
                                        value: 'yuelu',
                                        label: '岳麓区'
                                    }
                                ]
                            }
                        ]
                    }
                ],
                project: {
                    name: '',
                    students: [],
                    type: "",
                    teacher: "",
                    date1: '',
                    date2: '',
                    delivery: true,
                    resource: '小天才',
                    desc: '',
                    options: []
                },

                projectConstant: {
                    types: [
                        {
                            id: 0,
                            name: "type1"
                        },
                        {
                            id: 1,
                            name: "type2"
                        }
                    ],
                    students: [
                        {
                            id: 0,
                            name: "jxb"
                        },
                        {
                            id: 1,
                            name: "zwb"
                        }
                    ],
                    teachers: [
                        {
                            id: 0,
                            name: "jxb"
                        },
                        {
                            id: 1,
                            name: "zwb"
                        }
                    ]
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            }
        }
    }
</script>

<style scoped>
    .pic_style{
        width: 100px;
        height: 100px;
    }
</style>