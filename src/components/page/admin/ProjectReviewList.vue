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
                <el-table
                        @row-click="openTeacherDetails"
                        :data="teacherList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
                        style="width: 100%">
                    <el-table-column
                            label="Name"
                            prop="name">
                    </el-table-column>
                    <el-table-column
                            align="right">
                        <template slot="header" slot-scope="scope">
                            <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="输入关键字搜索"/>
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
                    :data="ProjectList"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="项目名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="teacher"
                        label="导师姓名"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="提交日期"
                        width="120">
                </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
                <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProjectReviewList",
        data(){
            return {
                ProjectList: [{
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }, {
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }, {
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }, {
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }, {
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }, {
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }, {
                    name: '项目一',
                    teacher: '王小虎',
                    date: '2016-05-01'
                }],
                multipleSelection: [],
                teacherList: [{
                    name: '王小虎'
                }, {
                    name: '张文博'
                }, {
                    name: '欧阳诚'
                }, {
                    name: '羊艺超'
                }],
                search: ''
            };
        },


        methods: {
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            openProjectDetails(row){
                this.$router.push({ path:'/projectReview'  })
            },
            openTeacherDetails(row){
                this.$router.push({ path: '/teacherAdminShow'})
            }
        }
    }
</script>

<style scoped>
    .el-transfer-panel{
        width: 100%;
        height: 100%;
    }
</style>