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
                        <el-select v-model="value1" clearable placeholder="请选择" @change="getProjectList()">
                            <el-option
                                    v-for="item in typeList"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <!--<div v-for="(type, index) in typeList" style="float: left; margin-right: 20px">-->
                            <!--<el-button type="text" @click="searchType($event)" v-model="tech">{{type}}</el-button>-->
                        <!--</div>-->
                    </el-form-item>
                    <el-form-item label="实施时间">
                        <el-select v-model="value2" clearable placeholder="请选择" @change="getProjectList()">
                            <el-option
                                    v-for="item in finishDates"
                                    :value="item">
                            </el-option>
                        </el-select>
                        <!--<div v-for="(finishDate, index) in finishDates" style="float: left; margin-right: 20px">-->
                            <!--<el-button type="text" @click="searchFinishDate($event)">{{finishDate}}</el-button>-->
                        <!--</div>-->
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
            <el-row :gutter="30" style="margin: 10px 50px 10px 50px">
                <el-col :span="8" v-for="project in projectss">
                    <el-card class="box-card" @click.native="projectShow(project.projectId)">
                        <div>
                            <div>
                                <figure class="image" align="center">
                                    <img  width="100%" height="230px" :src="imgUrl+project.firstPicture" alt="Image">
                                </figure>
                            </div>
                            <br>
                            <div>
                                <h1 >{{project.projectName}}</h1>
                                <br>
                                <!--<el-button size="medium"  type="text" @click="projectShow($event)">{{project.projectName}}</el-button>-->
                                <span>项目简介：{{project.projectDetail|ellipsis}}</span>
                            </div>
                        </div>
                        <!--<div>-->
                            <!--<img :src="imgUrl+project.firstPicture">-->
                            <!--{{project.projectDetail}}-->
                        <!--</div>-->
                        <!--<div slot="header" class="clearfix">-->
                            <!--&lt;!&ndash;<span @click="projectShow($event)">{{project.projectName}}</span>&ndash;&gt;-->
                            <!--<el-button type="text" @click="projectShow($event)">{{project.projectName}}</el-button>-->
                            <!--&lt;!&ndash;<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;-->
                        <!--</div>-->
                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
    import axios from 'axios'
    import qs from 'qs'
    export default {
        components: {ElButton},
        name: 'ProjectList',
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
                imgUrl:'/project/showPicture?pictureName=',
                // searchLists:[],
                // typeName:'',
                // finishDate:'',

                projectss: [],  //项目列表
                finishDates: [], //时间列表
                typeList:[],  //类型列表

                tableData: [],

                //分页
                pageIndex: 1,
                pageSize: 9,
                total: 0,

                value1:null,
                value2:null,

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
            this.getProjectCount();
            this.gettypeList();
            this.getfinishDateList();
            this.getProjectList();
        },
        methods: {
            projectShow(btn){
                // console.log(btn.target.innerText)
                console.log(btn)
                this.$router.push({ path:'/projectShow?id='+btn})
                // axios.post('/project/projectShow',qs.stringify({
                //     "projectName" : btn.target.innerText
                // })).then(response => {
                //
                // })
            },
            getProjectList(){
                console.log("type:"+this.value1)
                console.log("finish:"+this.value2)
                let pagination = {
                    "typeName" : this.value1,
                    "finishDate" : this.value2,
                    "index" : this.pageIndex
                }
                this.getProjectCount();
              axios.post('/project/projectList',pagination).then(response => {
                      console.log(response.data);
                      console.log(response.data['projectDetail'])
                      this.projectss = response.data;
                      // this.total = this.projectss.length;
                      // console.log("total:"+this.total)
                      this.$forceUpdate()
                      // this.total = this.projectss.length;
                  }).catch(e => {
                      this.error.push(e)
              })
            },
            getProjectCount(){
                // console.log("type:"+this.value1)
                // console.log("finish:"+this.value2)
                let pagination = {
                    "typeName" : this.value1,
                    "finishDate" : this.value2,
                    "index" : this.pageIndex
                }
                console.log('getCount:'+pagination.typeName)
                axios.post("/project/ProjectCount",pagination).then(res => {
                    this.total = res.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            gettypeList(){
                axios.get('/project/typeList').then(response => {
                    console.log(response.data);
                    this.typeList = response.data;
                }).catch(e => {
                    this.error.push(e)
                })
            },
            getfinishDateList(){
                axios.get('/project/finishDateList').then(response => {
                    console.log(response);
                    this.finishDates = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            // 分页导航
            handleCurrentChange(val) {
                this.pageIndex = val;
                this.getProjectList();

                // axios.post('/project/projectList',qs.stringify({
                //     "index" : this.pageIndex
                // })).then(response => {
                //     console.log(response.data);
                //     console.log(response.data['projectDetail'])
                //     this.projectss = response.data;
                //     // this.total = this.projectss.length;
                // }).catch(e => {
                //     this.error.push(e)
                // })
                // this.projectss = this.lists.
            },

            search() {
                // this.is_search = true;
                console.log(this.select_word)
                this.getProjectCountByName()
                axios.post('/project/searchName',{
                    "projectName" : this.select_word,
                    "index" : this.pageIndex
                }).then(response => {
                    this.projectss = response.data;
                    console.log(response.data)
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            getProjectCountByName(){
                axios.post("/project/ProjectCountByName",qs.stringify({
                    "projectName" : this.select_word
                })).then(response => {
                    this.total = response.data
                }).catch(e => {
                    this.error.push(e)
                })
            },
            // searchType(btn){
            //     console.log(btn.target.innerText)
            //     this.typeName = btn.target.innerText
            //     axios.post("/project/searchType",qs.stringify({
            //         "typeName" : btn.target.innerText
            //     })).then(response => {
            //         console.log(response.data)
            //         this.projectss = response.data;
            //     }).catch(e => {
            //         this.error.push(e)
            //     })
            // },
            // searchFinishDate(btn){
            //     this.finishDate = btn.target.innerText
            //     axios.post('/project/searchTime',qs.stringify({
            //         "finishDate" : btn.target.innerText
            //     })).then(response => {
            //         console.log(response.data)
            //         this.projectss = response.data;
            //     }).catch(e => {
            //         this.error.push(e)
            //     })
            // },
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
    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .mr10{
        margin-right: 10px;
    }
    .box-card{
        height: 400px;
    }

</style>
