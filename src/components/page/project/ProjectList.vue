<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i>实训项目</el-breadcrumb-item>
                <el-breadcrumb-item>项目列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <div class="form-box">
                <el-form ref="form"  label-width="80px">
                    <el-form-item label="技术实现">
                        <div v-for="(type, index) in typeList" style="float: left; margin-right: 20px">
                            <el-button type="text" @click="searchType($event)" v-model="tech">{{type}}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="实施时间">
                        <div v-for="(finishDate, index) in finishDates" style="float: left; margin-right: 20px">
                            <el-button type="text" @click="searchFinishDate($event)">{{finishDate}}</el-button>
                        </div>
                        <!--<el-button >更多></el-button>-->
                        <!--<el-col :span="11">-->
                            <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>-->
                        <!--</el-col>-->
                        <!--<el-col class="line" :span="2">-</el-col>-->
                        <!--<el-col :span="11">-->
                            <!--<el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>-->
                        <!--</el-col>-->
                    </el-form-item>
                </el-form>
            </div>
            <el-row :gutter="10">
                <el-col :span="8" v-for="project in projectss">
                    <el-card class="box-card">
                        <div>
                            <img :src="imgUrl+project.firstPicture">
                            {{project.projectDetail}}
                        </div>
                        <div slot="header" class="clearfix">
                            <!--<span @click="projectShow($event)">{{project.projectName}}</span>-->
                            <el-button type="text" @click="projectShow($event)">{{project.projectName}}</el-button>
                            <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
                        </div>
                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <!--<el-dialog title="编辑" :visible.sync="editVisible" width="30%">-->
            <!--<el-form ref="form" :model="form" label-width="50px">-->
                <!--<el-form-item label="日期">-->
                    <!--<el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="姓名">-->
                    <!--<el-input v-model="form.name"></el-input>-->
                <!--</el-form-item>-->
                <!--<el-form-item label="地址">-->
                    <!--<el-input v-model="form.address"></el-input>-->
                <!--</el-form-item>-->

            <!--</el-form>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="editVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="saveEdit">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->

        <!-- 删除提示框 -->
        <!--<el-dialog title="提示" :visible.sync="delVisible" width="300px" center>-->
            <!--<div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>-->
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="delVisible = false">取 消</el-button>-->
                <!--<el-button type="primary" @click="deleteRow">确 定</el-button>-->
            <!--</span>-->
        <!--</el-dialog>-->
    </div>
</template>

<script>
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
    import axios from 'axios'
    import qs from 'qs'
    export default {
        components: {ElButton},
        name: 'ProjectList',
        data() {
            return {
                imgUrl:'http://localhost:8088/show?pictureName=',
                // technologies: [
                //     {
                //         label: "Java",
                //         value: "Java"
                //     },
                //     {
                //         label: "Android",
                //         value: "Android"
                //     },
                //     {
                //         label: "Python",
                //         value: "Python"
                //     }
                // ],
                projectss: [],
                //     [
                //         {
                //             name: "project1",
                //             description: "description1"
                //         },
                //         {
                //             name: "project2",
                //             description: "description2"
                //         },
                //         {
                //             name: "project3",
                //             description: "description3"
                //         },
                //     ],
                //     [
                //         {
                //             name: "project4",
                //             description: "description4"
                //         },
                //         {
                //             name: "project5",
                //             description: "description5"
                //         }
                //     ]
                // ],
                finishDates: [],
                //     {
                //         label: "2017上",
                //         value: "2017上"
                //     },
                //     {
                //         label: "2017下",
                //         value: "2017下"
                //     },
                //     {
                //         label: "更早",
                //         value: "更早"
                //     }
                // ],
                typeList:[],
                //     {label:"Javaweb",value:"Javaweb"},
                //     {label:"Python",value:"Python"},
                //     {label:"Android",value:"Android"},
                //     {label:"嵌入式",value:"嵌入式"},
                //     {label:".Net",value:".Net"},
                //     {label:"大数据",value:"大数据"}
                // ],
                tableData: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                tech:'',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    name: '',
                    date: '',
                    address: ''
                },
                idx: -1
            }
        },
        created() {
            this.getProjectList();
            this.gettypeList();
            this.getfinishDateList();
        },
        methods: {
            // getProjectByName(){
            //     axios.post('http://localhost:8088/searchName',qs.stringify({
            //         'pName' :
            //     }))
            // },
            projectShow(btn){
                console.log(btn.target.innerText)
                this.$router.push({ path:'/projectShow?name='+btn.target.innerText})
                // axios.post('http://localhost:8088/projectShow',qs.stringify({
                //     "projectName" : btn.target.innerText
                // })).then(response => {
                //
                // })
            },
            getProjectList(){
              axios.get('http://localhost:8088/projectList').then(response => {
                      console.log(response.data);
                      console.log(response.data['projectDetail'])
                      this.projectss = response.data;
                  }).catch(e => {
                      this.error.push(e)
              })
            },
            gettypeList(){
                axios.get('http://localhost:8088/typeList').then(response => {
                    console.log(response.data);
                    this.typeList = response.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getfinishDateList(){
                axios.get('http://localhost:8088/finishDateList').then(response => {
                    console.log(response);
                    this.finishDates = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.pageIndex = val;
            },

            search() {
                // this.is_search = true;
                console.log(this.select_word)
                axios.post('http://localhost:8088/searchName',qs.stringify({
                    "projectName" : this.select_word
                })).then(response => {
                    this.projectss = response.data;
                    console.log(response.data)
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            searchType(btn){
                console.log(btn.target.innerText)
                axios.post("http://localhost:8088/searchType",qs.stringify({
                    "typeName" : btn.target.innerText
                })).then(response => {
                    console.log(response.data)
                    this.projectss = response.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            searchFinishDate(btn){
                axios.post('http://localhost:8088/searchTime',qs.stringify({
                    "finishDate" : btn.target.innerText
                })).then(response => {
                    console.log(response.data)
                    this.projectss = response.data;
                }).catch(e => {
                    this.error.push(e)
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
