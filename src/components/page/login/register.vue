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

        <!--手机验证码-->
        <!--<el-form-item prop="phone">-->
            <!--<el-input  @keyup.enter.native="handleLogin" v-model="ruleForm.phone" placeholder="请输入手机号码">-->
                <!--<i slot="prefix" class="icon-shouji"></i>-->
            <!--</el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item prop="code">-->
            <!--<el-input  @keyup.enter.native="handleLogin" v-model="ruleForm.code" placeholder="请输入验证码">-->
                <!--<i slot="prefix" class="icon-yanzhengma yanzhengma" style=""></i>-->
                <!--<template slot="append">-->
                    <!--<span @click="handleSend" class="msg-text" :class="[{display:msgKey}]">{{msgText}}</span>-->
                <!--</template>-->
            <!--</el-input>-->
        <!--</el-form-item>-->


        <div class="login-btn">
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        </div>
        <p class="login-tips">Tips : 用户名和密码随便填。</p>
    </el-form>
</template>

<script>
    // const MSGINIT = '发送验证码'
    // const MSGERROR = '验证码发送失败'
    // const MSGSCUCCESS = '${time}秒后重发'
    // const MSGTIME = 60
    export default {
        name: "register.vue",
        data: function(){
            // const validatePhone = (rule, value, callback) => {
            //     if (isvalidatemobile(value)[0]) {
            //         callback(new Error(isvalidatemobile(value)[1]))
            //     } else {
            //         callback()
            //     }
            // }
            // const validateCode = (rule, value, callback) => {
            //     if (value.length !== 4) {
            //         callback(new Error('请输入4位数的验证码'))
            //     } else {
            //         callback()
            //     }
            // }
            return {
                ruleForm: {
                    username: 'admin',
                    password: '123123',
                    //phone: '123456789',
                    //code: '1234'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, message: '密码长度最少为6位', trigger: 'blur' }
                    ]
                    // phone: [
                    //     { required: true, trigger: 'blur', validator: validatePhone}
                    // ],
                    // code: [
                    //     { required: true, trigger: 'blur', }
                    // ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        localStorage.setItem('ms_username',this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            // handleLogin() {
            //     this.$refs.loginForm.validate(valid => {
            //         if (valid) {
            //             this.$store.dispatch('Login', this.loginForm).then(res => {
            //                 this.$router.push({ path: '/' })
            //             })
            //         }
            //     })
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