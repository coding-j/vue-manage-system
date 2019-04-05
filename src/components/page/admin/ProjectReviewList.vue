<template>
    <div>
        <el-table
                @row-click="openDetails"
                ref="multipleTable"
                :data="tableData"
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
</template>

<script>
    export default {
        name: "ProjectReviewList",
        data() {
            return {
                tableData: [{
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
                multipleSelection: []
            }
        },

        methods: {
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
            openDetails(row){
                this.$router.push({ path:'/projectReview'  })
            }
        }
    }
</script>

<style scoped>

</style>