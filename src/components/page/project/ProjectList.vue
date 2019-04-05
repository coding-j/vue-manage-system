<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 实训项目</el-breadcrumb-item>
                <el-breadcrumb-item>项目列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <!--<el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">-->
                    <!--<el-option key="1" label="广东省" value="广东省"></el-option>-->
                    <!--<el-option key="2" label="湖南省" value="湖南省"></el-option>-->
                <!--</el-select>-->
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <div class="form-box">
                <el-form ref="form"  label-width="80px">
                    <el-form-item label="技术实现">
                        <div v-for="(type, index) in typeList" style="float: left; margin-right: 20px">
                            <el-button type="text">{{type.label}}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label="实施时间">
                        <div v-for="(finishDate, index) in finishDates" style="float: left; margin-right: 20px">
                            <el-button type="text">{{finishDate.label}}</el-button>
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
            <el-row :gutter="10" v-for="(projects, xAxis) in projectss">
                <el-col :span="8" v-for="(project, yAxis) in projectss[xAxis]">
                    <el-card class="box-card">
                        <div><img src="../../../assets/img/img.jpg"></div>
                        <div slot="header" class="clearfix">
                            <span>{{project.name}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
                        </div>
                        {{project.description}}
                    </el-card>
                </el-col>
            </el-row>
            <div class="pagination">
                <el-pagination background @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next" :total="total">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="日期">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

    export default {
        components: {ElButton},
        name: 'ProjectList',
        data() {
            return {
                technologies: [
                    {
                        label: "Java",
                        value: "Java"
                    },
                    {
                        label: "Android",
                        value: "Android"
                    },
                    {
                        label: "Python",
                        value: "Python"
                    }
                ],
                projectss: [
                    [
                        {
                            name: "project1",
                            description: "description1"
                        },
                        {
                            name: "project2",
                            description: "description2"
                        },
                        {
                            name: "project3",
                            description: "description3"
                        },
                    ],
                    [
                        {
                            name: "project4",
                            description: "description4"
                        },
                        {
                            name: "project5",
                            description: "description5"
                        }
                    ]
                ],
                finishDates: [
                    {
                        label: "2017上",
                        value: "2017上"
                    },
                    {
                        label: "2017下",
                        value: "2017下"
                    },
                    {
                        label: "更早",
                        value: "更早"
                    }
                ],
                typeList:[
                    {label:"Javaweb",value:"Javaweb"},
                    {label:"Python",value:"Python"},
                    {label:"Android",value:"Android"},
                    {label:"嵌入式",value:"嵌入式"},
                    {label:".Net",value:".Net"},
                    {label:"大数据",value:"大数据"}
                ],
                tableData: [],
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
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
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.pageIndex = val;
            },

            search() {
                this.is_search = true;
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
