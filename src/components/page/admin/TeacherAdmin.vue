<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                <el-breadcrumb-item>导师管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
                    <el-option key="1" label="广东省" value="广东省"></el-option>
                    <el-option key="2" label="湖南省" value="湖南省"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <div class="form-box">
                <el-form ref="form"  label-width="80px">
                    <el-form-item label="技术实现">
                        <el-select placeholder="请选择" filterable>
                            <el-option v-for="(technology, index) in technologies" :key="index" :label="technology.label" :value="technology.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="实施时间">
                        <div v-for="(finishDate, index) in finishDates" style="float: left; margin-right: 20px">
                            <el-button type="text">{{finishDate.label}}</el-button>
                        </div>
                        <el-button >更多></el-button>
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
            <div>
                <el-table
                        ref="multipleTable"
                        :data="teacherList"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                    <el-table-column
                            type="selection"
                            width="55">
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                            width="120">
                    </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                    <el-button @click="toggleSelection()">取消选择</el-button>
                    <!--<el-button @click="deleteTeacher()">删除</el-button>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
    export default {
        components: {ElButton},
        name: "TeacherAdmin",
        data(){
            return{
                // 导师列表
                teacherList: [{
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }, {
                    name: '王小虎'
                }],
                multipleSelection: [],
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
                finishDates: [
                    {
                        label: "2017上",
                        value: "2017上"
                    },
                    {
                        label: "2017下",
                        value: "2017下"
                    }
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
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // deleteTeacher()
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