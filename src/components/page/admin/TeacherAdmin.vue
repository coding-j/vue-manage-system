<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 管理员</el-breadcrumb-item>
                <el-breadcrumb-item>导师管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div>
            <el-transfer
                    ali
                    class="el-transfer-panel"
                    :titles="['注册申请的导师','通过的导师']"
                    filterable
                    :filter-method="filterMethod"
                    filter-placeholder="请输入导师姓名"
                    v-model="value2"
                    :data="data2">
            </el-transfer>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TeacherAdmin",
        data(){
            const generateData2 = _ => {
                const data = [];
                const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
                const pinyin = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
                cities.forEach((city, index) => {
                    data.push({
                        label: city,
                        key: index,
                        pinyin: pinyin[index]
                    });
                });
                console.log("data:",data);
                return data;
            };
            return {
                data2: generateData2(),
                value2: [],
                filterMethod(query, item) {
                    console.log("query:",query)
                    return item.pinyin.indexOf(query) > -1;
                }
            };
        },
        methods:{

        }
    }
</script>

<style scoped>
    .el-transfer-panel{
        width: 100%;
        height: 100%;
    }
</style>