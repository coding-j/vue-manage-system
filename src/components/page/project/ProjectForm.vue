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
                    <el-form-item label="图片">
                        <el-upload
                                class="upload-demo"
                                drag
                                action="/api/posts/"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="视频">
                        <el-upload
                                class="upload-demo"
                                drag
                                action="/api/posts/"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="文件">
                        <el-upload
                                class="upload-demo"
                                drag
                                action="/api/posts/"
                                multiple>
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ProjectForm',
        data: function(){
            return {
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
            }
        }
    }
</script>