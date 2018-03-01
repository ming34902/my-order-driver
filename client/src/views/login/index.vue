<template>
  <div class="login-container">
    <el-row class="login-header">
      <el-col :span="4"><span style="opacity: 0.1">.</span></el-col>
      <el-col :span="4" class="login-h-l">
        <img src="~/assets/login_images/logo.png" v-show="false" alt="">
      </el-col>
      <el-col :span="4"><span style="opacity: 0.1">.</span></el-col>
      <!--<el-col :span="8" class="login-h-r" style="color:#ffffff">-->
        <!--欢迎登录慧车商系统-->
      <!--</el-col>-->
      <el-col :span="4"><span style="opacity: 0.1">.</span></el-col>
    </el-row>
    <div id="login-main-box">
      <div class="login-title">
        Atomic-web欢迎您
        <img src="~assets/login_images/arrow.png" alt="">
      </div>
    <el-form autoComplete="on" id="login-form" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <el-form-item style="margin-bottom: 0">
        <div class="login-form-login">登录</div>
      </el-form-item>
      <el-form-item prop="userKey" class="hcs-input">
        <!--<span class="svg-container svg-container_login">-->
          <!--<icon-svg icon-class="yonghuming" />-->
        <!--</span>-->
        <el-input name="userKey"
                  type="text"
                  v-model="loginForm.userKey"
                  placeholder="请输入账号"
                  spellcheck="false" style="background-color: #f5f5f5;"></el-input>
      </el-form-item>
      <el-form-item prop="password" class="hcs-input" style="margin-bottom:8px; ">
        <!--<span class="svg-container">-->
          <!--<icon-svg icon-class="mima"></icon-svg>-->
        <!--</span>-->
        <el-input name="password" type="password"
                  @keyup.enter.native="handleLogin"
                  v-model="loginForm.password"
                  placeholder="请输入密码"
                  spellcheck="false" style="background-color: #f5f5f5;"></el-input>
      </el-form-item>
      <el-form-item>
        <span class="login-more">
          <el-checkbox style="color:rgba(0,0,0,.4)">记住我</el-checkbox>
        </span>
        <!--<span class="login-more" style="float: right">-->
          <!--<span class="loginMore login-more-forgive">忘记密码</span>-->
        <!--</span>-->
        <el-button type="primary" class="login-button" :loading="loading" @click.native.prevent="handleLogin">
          登 录
        </el-button>
        <hr class="login-hr">
        <!--<span style="margin-left:102px ">-->
          <!--<span class="hcs-register">没有账户，直接</span>-->
          <!--<span class="login-register" @click="register()" >注册</span>-->
        <!--</span>-->
      </el-form-item>
    </el-form>
    </div>
    <!--<el-row class="login-third-party"><span>——————</span> 第三方账号登录 <span>——————</span></el-row>-->
    <!--<el-row>-->
      <!--<div class="third-party-img">-->
        <!--<div class="qqImg"></div>-->
        <!--<div class="weChatImg"></div>-->
      <!--</div>-->
    <!--</el-row>-->
    <div class="footer-main">
      <el-row class="login-footer">中联物流（中国）有限公司</el-row>
      <el-row class="login-footer">&copy; 2012-2016 中联物流（中国）有限公司 赣ICP13001118号 - 2</el-row>
    </div>
  </div>
</template>

<script>
import { isvalidUserKey } from '@/utils/validate'

export default {
  name: 'login',
  data() {
    const validateUserKey = (rule, value, callback) => {
      if (!isvalidUserKey(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        userKey: '',
        password: ''
      },
      loginRules: {
        userKey: [{ required: true, trigger: 'blur', validator: validateUserKey }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    register() {
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .hcs-register{
    color: #666;
  }
  #login-form{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  @media screen and (max-height: 800px) {
    #login-main-box{
      margin: 4% 0 0 0;
    }
    .login-container .login-third-party{
      margin: 411px 0 20px 0 !important;
    }
  }
  @media screen and (min-height: 800px) and (max-height:900px) {
    #login-main-box{
      margin: 7% 0 0 0;
    }
    .login-container .login-third-party{
      margin: 411px 0 20px 0 !important;
    }
  }
  @media screen and (min-height: 900px) {
    #login-main-box{
      margin: 144px 0 0 0;
    }
  }
  .login-container {
    @include relative;
    height: 100vh;
    background: url('~assets/login_images/bg.png') no-repeat;
    background-size:cover;
    input:-webkit-autofill {
      /*-webkit-box-shadow: 0 0 0 1000px rgba(0, 0, 0,0.1) inset !important;*/
      -webkit-text-fill-color: #000 !important;
    }
    .login-header{
      padding: 12px 0;
      box-sizing: border-box;
      height: 60px;
      line-height: 33px;
      border-bottom: 1px solid rgba(256,256,256,0.2);
    }
    .login-hr{
      margin: 28px 0 0 0 ;
      padding: 0;
      color:#666666;
      opacity: 0.3;
      width: 400px !important;
      position: relative;
      left:-36px;
    }
    .login-h-l{
      img{
        width: 100px;
        height: 36px;
      }
      text-align: left;
    }
    .login-h-r{
      color: #fff;
      text-align: right;
      opacity: 0.7;
    }
    .login-more{
      color:rgba(0,0,0,0.4);
      cursor:pointer;
    }
    .login-register:hover{
      cursor:pointer;
    }
    .login-more-forgive:hover,.login-more-new:hover{
      color: #3a8ee6;
      text-decoration: underline;
    }
    .login-register{
      color: #409eff!important;
    }
    .login-title{
      font-size: 18px;
      border: 2px solid #00bfa5;
      color: #00bfa5;
      border-radius: 4px;
      width: 400px;
      margin: 0 auto 28px;
      text-align: center;
      height: 54px;
      line-height: 54px;
      position: relative;
      img{
        width: 16px;
        height: 16px;
        position: absolute;
        top:16px;
        right: 26px;
      }
    }
    .login-button{
      width:100%;
      margin-bottom: 5px;
      background: linear-gradient(to right, #2a7aff, #448aff);
      box-shadow: 0 0 20px 5px rgba(0,0,0,0.12);
    }
    input {
      background: transparent;
      outline: 0 solid #fff;
      border: 0;
      -webkit-appearance: none;
      padding: 12px 5px 12px 15px;
      color: #000;
      height: 47px;
      border-radius: 2px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      background-color: #fff;
      border-radius: 2px;
      left: 0;
      right: 0;
      width: 400px;
      height: 363px;
      padding: 0 35px 15px 35px;
      margin: 0 auto;
      .login-form-login{
        height: 78px;
        text-align: center;
        color: #00bfa5;
        font-size: 26px;
        font-weight: 500;
        line-height: 78px;
        letter-spacing:8px;
      }
    }
    .hcs-input {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
      box-shadow: 0 -1px 2 0 rgba(0,0,0,.05);
      /*border-bottom: 16px!important;*/
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    #displayNone{
      border: 1px solid rgba(255, 255, 255, 0);
      background-color: rgba(255, 255, 255, 0);
      text-align: right;
    }
    #displayNone #register{
      color:rgba(255, 255, 255, 0.9)
    }
    #displayNone #register:hover{
        cursor:pointer;
        color: #409EFF;
    }
    .login-third-party{
      margin: 438px 0 20px 0;
      color: #fff;
      text-align: center;
      font-size: 14px;
      opacity: 0.7;
    }
    .third-party-img{
      width: 400px;
      margin: 0 auto;
      text-align: center;
      box-sizing: border-box;
      padding: 0 94px;
    }
    .qqImg,.weChatImg{
      width: 76px;
      height: 76px;
    }
    .qqImg{
      float: left;
      background: url('~assets/login_images/qq.png') center center no-repeat;
    }
    .weChatImg{
      float: right;
      background: url('~assets/login_images/weixin.png') center center no-repeat;
    }
    .qqImg:hover{
      cursor:pointer;
      background: url('~assets/login_images/qq-over.png') center center no-repeat;
    }
    .weChatImg:hover{
      cursor: pointer;
      background: url('~assets/login_images/weixin-over.png') center center no-repeat;
    }
    .footer-main{
      position: absolute;
      left:50%;
      transform: translate(-50%,0);
      bottom:8px;
      z-index: 999;
    }
    .login-footer{
      text-align: center;
      font-size: 12px;
      color: #fff;
      opacity: 0.4;
      height: 20px;
    }
  }
</style>
