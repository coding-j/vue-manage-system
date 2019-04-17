<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="username">
                <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
            </el-input>
        </el-form-item>
        <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </div>
        <!--<p class="login-tips">Tips : 用户名和密码随便填。</p>-->
    </el-form>
</template>

<script>
    import axios from 'axios'
    import qs from 'qs'
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName){
                formName.preventDefault();

                axios.post('http://localhost:8088/project/login',qs.stringify({
                    'userName' : this.ruleForm.username,
                    'password' : this.ruleForm.password
                })).then((response) => {
                    var status = response.data;
                    if(status == 'success'){
                        this.$router.push('/homePage')
                    }
                })
            }
            // submitForm(formName) {
            //     this.$refs[formName].validate((valid) => {
            //         if (valid) {
            //             localStorage.setItem('ms_username',this.ruleForm.username);
            //             this.$router.push('/');
            //         } else {
            //             console.log('error submit!!');
            //             return false;
            //         }
            //     });
            // }
        }
    }
</script>

<style scoped>
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
    .login-tips{
        font-size:12px;
        line-height:30px;
        color:#fff;
    }
</style>
