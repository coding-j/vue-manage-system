<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实训项目</el-breadcrumb-item>
                <el-breadcrumb-item>导师列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>

            <el-row :gutter="30" style="margin: 10px 50px 10px 50px">
                <el-col :span="8" v-for="teachers in teacherList">
                    <el-card class="box-card" @click.native="teacherDetail(teachers.teacherName)">
                        <div>
                            <div>
                                <figure class="image" align="center">
                                    <img  width="100%" :src="imgUrl+teachers.pictureUrl" alt="Image">
                                </figure>
                            </div>
                            <br>
                            <div>
                                <h1 >{{teachers.teacherName}}</h1>
                                <br>
                                <!--<el-button size="medium"  type="text" @click="projectShow($event)">{{project.projectName}}</el-button>-->
                                <p>老师简介：{{teachers.introduction | ellipsis}}</p>
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
            <!--<el-row :gutter="10">-->
                <!--<el-col :span="8" v-for="teachers in teacherList">-->
                    <!--<el-card class="box-card">-->
                        <!--<div><img :src="imgUrl+teachers.pictureUrl"></div>-->
                        <!--<div slot="header" class="clearfix">-->
                            <!--<el-button type="text" @click="teacherDetail($event)">{{teachers.teacherName}}</el-button>-->
                            <!--&lt;!&ndash;<span>{{teachers.teacherName}}</span>&ndash;&gt;-->
                            <!--&lt;!&ndash;<el-button style="float: right; padding: 3px 0" type="text" @click="teacherDetail">操作按钮</el-button>&ndash;&gt;-->
                        <!--</div>-->
                        <!--{{teachers.introduction}}-->
                    <!--</el-card>-->
                <!--</el-col>-->
            <!--</el-row>-->
            <!--<div class="pagination">-->
                <!--<el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">-->
                <!--</el-pagination>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        name: "TeacherList",
        filters: {
            ellipsis:function (value) {
                if (!value) return ''
                if (value.length > 40) {
                    return value.slice(0,40) + '...'
                }
                return value
            }
        },
        data() {
            return {
                imgUrl:'http://localhost:8088/show?pictureName=',
                tableData: [],

                //分页
                pageIndex: 1,
                pageSize: 9,
                total: 0,

                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                teacherList: []
                //     [
                //         {
                //             name: "teacher1",
                //             description: "description1"
                //         },
                //         {
                //             name: "teacher2",
                //             description: "description2"
                //         },
                //         {
                //             name: "teacher3",
                //             description: "description3"
                //         },
                //     ],
                //     [
                //         {
                //             name: "teacher4",
                //             description: "description4"
                //         },
                //         {
                //             name: "teacher5",
                //             description: "description5"
                //         }
                //     ]
                // ]
            }
        },
        created() {
            this.getTeacherList();
            this.getTeacherCount();
        },
        methods: {
            getTeacherList(){
                axios.post('http://localhost:8088/TeacherList',qs.stringify({
                    "index" : this.pageIndex
                })).then(response => {
                    console.log(response.data);
                    this.teacherList = response.data;
                    // this.total = this.teacherList.length;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getTeacherCount(){
                axios.get("http://localhost:8088/TeacherCount").then(res => {
                    this.total = res.data
                }).catch(e =>{
                    this.error.push(e)
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getTeacherList()
            },

            search() {
                axios.post('http://localhost:8088/searchTeacherByName',qs.stringify({
                    "teacherName" : this.select_word
                })).then(response => {
                    this.teacherList = response.data;
                    console.log(response.data)
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                const item = this.tableData[index];
                this.form = {
                    name: item.name,
                    date: item.date,
                    address: item.address
                }
                this.editVisible = true;
            },
            handleDelete(index, row) {
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = '';
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + ' ';
                }
                this.$message.error('删除了' + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 保存编辑
            saveEdit() {
                this.$set(this.tableData, this.idx, this.form);
                this.editVisible = false;
                this.$message.success(`修改第 ${this.idx+1} 行成功`);
            },
            // 确定删除
            deleteRow(){
                this.tableData.splice(this.idx, 1);
                this.$message.success('删除成功');
                this.delVisible = false;
            },
            teacherDetail(btn){
                this.$router.push({ path: '/teacherShow?name='+btn})
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
