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
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>

            <el-row :gutter="10" v-for="(teachers, xAxis) in teacherList">
                <el-col :span="8" v-for="(teachers, yAxis) in teacherList[xAxis]">
                    <el-card class="box-card">
                        <div><img src="../../../assets/img/img.jpg"></div>
                        <div slot="header" class="clearfix">
                            <span>{{teachers.name}}</span>
                            <el-button style="float: right; padding: 3px 0" type="text" @click="teacherDetail">操作按钮</el-button>
                        </div>
                        {{teachers.description}}
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
    export default {
        name: "TeacherList",
        data() {
            return {
                teacherList: [
                    [
                        {
                            name: "teacher1",
                            description: "description1"
                        },
                        {
                            name: "teacher2",
                            description: "description2"
                        },
                        {
                            name: "teacher3",
                            description: "description3"
                        },
                    ],
                    [
                        {
                            name: "teacher4",
                            description: "description4"
                        },
                        {
                            name: "teacher5",
                            description: "description5"
                        }
                    ]
                ]
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
            },
            teacherDetail(){
                this.$router.push({ path: '/teacherShow'})
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