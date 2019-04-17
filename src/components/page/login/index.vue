<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">实训项目展示平台</div>
            <el-tabs v-model="activeName">
                <el-tab-pane label="用户登陆" name="user" >
                    <Login></Login>
                </el-tab-pane>
                <!--<el-tab-pane label="用户注册" name="code" >-->
                    <!--<register></register>-->
                <!--</el-tab-pane>-->
            </el-tabs>
        </div>
    </div>
</template>

<script>
    import Login from "./Login";
    import Register from './register'

    export default {
        name: "index.vue",
        components: {Register, Login},
        data() {
            return {
                activeName: 'user'
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../../assets/img/login-bg.jpg);
        background-size: 100%;
    }
    .ms-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #EEC900;
        border-bottom: 1px solid #EEC900;
    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255,255,255, 0.3);
        overflow: hidden;
    }
    .ms-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
    .character{
        text-align: center;
    }
</style>
