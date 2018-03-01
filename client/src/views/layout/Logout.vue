<template>
  <div>
    <el-dropdown class="avatar-container"  style="float: right" trigger="click">
      <div class="avatar-wrapper">
        <img src="~assets/image/CLOSEHCS.png" class="loginOut" alt="loginOut">
        <span class="username" style="opacity: 0.54">登出</span>
        <i class="el-icon-caret-bottom" style="color:rgba(256,256,256,.54)"></i>
      </div>
      <el-dropdown-menu class="user-dropdown" slot="dropdown" style="width: 160px;text-align: center">
        <el-dropdown-item id="detail-img-item" style="padding-top:10px">
          <div class="detail-info" v-for="(item,index) in funList" @click="moreChoose(index)" >{{item.name}}</div>
        </el-dropdown-item>
        <hr style="border:0.6px solid rgba(0,0,0,0.05);margin-bottom: 0">
        <el-dropdown-item id="loginOut-button">
          <el-button plain  @click="logout">退出</el-button>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div style="float:right">
      <div class="avatar-wrapper-out">
        <span class="username">
          <span style="color: #0facd5">{{name}}</span>
        , 欢迎您
        </span>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  export default{
    data(){
      return {
        funList :[
          {name:'消息提醒',isActive:false},
          {name:'个人设置',isActive:false},
          {name:'修改密码',isActive:false},
          {name:'帮助',isActive:false},
        ]
      }
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'name',
        'entityName'
      ])
    },
    methods: {
      logout() {
        this.$store.dispatch('LogOut').then(() => {
          location.reload()  // 为了重新实例化vue-router对象 避免bug
        })
      },
      moreChoose (n) {
        var tp = this.funList;
        for(var i=0; i<tp.length; i++){
          tp[i].isActive = false
        }
        tp[n].isActive = true
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  #detail-img-item  .detail-info{
    color:rgba(0,0,0,.4);
    letter-spacing: 1px;
  }
  .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
    background-color: #fff;
  }
  .avatar-container{
    width: 114px;
    border-left: 1px solid rgba(26, 35, 49,0.5) !important;
    cursor: pointer;
  }
  .avatar-wrapper-out{
    width: 280px;
    height: 50px;
    padding-left: 10px;
    box-sizing: border-box;
    padding-right: 26px;
    text-align: right;
  }
  .avatar-wrapper{;
    height: 50px;
    box-sizing: border-box;
    padding-right: 18px;
  }
  .el-dropdown-menu__item--divided{
      margin-top: 0;
  }
  .loginOut{
    width: 16px;
    height: 16px;
    margin: 0 6px 0 0;
    position: relative;
    top: 2px;
  }
  #loginOut-button .el-button{
    color:#00aaf1;
    font-size: 14px;
    border: 0 solid #000;
    padding: 0;
  }
  .el-dropdown-menu{
    padding:10px 0 0 0;
  }
  /*.avatar-wrapper:hover{*/
    /*background-color: #3980a7;*/
    /*cursor:pointer;*/
  /*}*/
  .detail-info{
      color:#fff;
      height: 30px;
      line-height: 30px;
      font-size: 12px!important;
      font-weight: 500;
      &:hover{
        background-color: rgba(49, 126, 255, .6);
        color: #fff !important;
        background-image: url('~assets/image/tick.png');
        background-position: 124px 10px;
        background-repeat: no-repeat;
      }
  }
  #detail-img-item{
    /*background-color: #3c8dbc;*/
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    margin-top: -9px;
    border-radius: 5px 5px 0 0 ;
  }

  #detail-img{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    border: 3px solid rgba(255,255,255,0.2);
    margin-top: 10px;
  }

  $r:34px;
  .user-avatar{
    margin: 0 6px 0 0;
    width: $r;
    height: $r;
    border-radius: $r;
    vertical-align:middle;
  }
  .username{
    color:#fff;
    line-height: 50px;
    font-size: 13px;
    opacity: 0.8;
  }
</style>
