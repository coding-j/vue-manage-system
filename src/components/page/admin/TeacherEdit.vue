<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                <el-breadcrumb-item>教师信息编辑</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-upload
                    class="upload-demo"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </div>
        <div>
            <el-form ref="form" :model="form" label-width="80px" class="form_top">
                <el-form-item label="导师姓名">
                    <el-input v-model="teacher.TeacherName"></el-input>
                </el-form-item>
                <el-form-item label="工作单位">
                    <el-input v-model="teacher.work_unit"></el-input>
                </el-form-item>
                <el-form-item label="通讯地址">
                    <el-input v-model="teacher.address"></el-input>
                </el-form-item>
                <el-form-item label="个人简介">
                    <el-input  type="textarea" :rows="5" v-model="teacher.TeacherDetail"></el-input>
                </el-form-item>
                <!--<el-form-item label="工作经历" prop="name">-->
                    <!--<el-input v-model="data[scope.$index].name"></el-input>-->
                    <!--<el-button @click="add" type="primary" round>添加</el-button>-->
                    <!--<el-button @click="deleteRow(scope.$index)">删除</el-button>-->
                <!--</el-form-item>-->
                <div>
                    <el-table :data="data">
                        <el-table-column prop="name" label="工作经历">
                            <template  slot-scope="scope">
                                <el-input v-model="data[scope.$index].name"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template  slot-scope="scope">
                                <el-button @click="deleteRow(scope.$index)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-button @click="add" type="primary" round>添加</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TeacherEdit",
        data(){
            return {
                //fontSize: 30,
                data:[],
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                teacher: {
                    TeacherName: "陆坤老师",
                    work_unit: "大连理工大学软件学院",
                    address: "大连理工大学软件学院综合楼四楼实训基地",
                    TeacherDetail: "陆坤，工学博士，副教授，硕士生导师。本硕博均毕业于大连理工大学计算机系。承担或参与国家自然科学基金、省自然科学基金重点项目，IBM国际合作项目，中央高校基本科研业务费等多项课题。主要研究领域为移动群智感知，隐私保护，信任模型与激励机制。发表论文30余篇，其中SCI、EI检索20余篇，申请国家发明专利1项。获辽宁省自然科学学术成果二等奖2次。主持省部级教学改革项目6项（含教育部协同育人项目），校级多项；指导学生获得国家级及以上科技竞赛奖励40余项,100多人次。获得省优秀教学成果奖一等奖1次，二等奖2次。荣获IBM Faculty Award2次，国家留学基金委-IBM优秀教师奖教金3次，花旗集团优秀教师奖教金1次。",
                },
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
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            add(){
                this.data.push({});
            },
            deleteRow(index){
                this.data.splice(index,1);
            }
        }
    }
</script>

<style scoped>
    .form_top{
        margin-top: 0.6cm;
    }
</style>
