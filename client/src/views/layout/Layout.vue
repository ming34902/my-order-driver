<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <el-header style="position: relative">
      <div class="logo null" :class="{wd50 : !sidebar.opened }"></div>
      <img class="logo-img" v-if="sidebar.opened"  src="~assets/image/lg.png" alt="hcs">
      <img class="logo-img" v-if="!sidebar.opened"  src="~assets/image/lgs.png" alt="hcs">
      <top-nav></top-nav>
      <logout></logout>
    </el-header>

    <router-view key="1321321"></router-view>

  </div>
</template>




<script>
  import { mapGetters } from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import { Sidebar, AppMain, Logout, TopNav, TabsView, hscAppMain } from '@/views/layout'

export default {
    name: 'layout',
    components: {
      Sidebar,
      AppMain,
      Logout,
      Hamburger,
      TopNav,
      TabsView,
      hscAppMain
    },
    data(){
      return {
        otherRouter: true
      }
    },
    computed: {
      ...mapGetters([
        'sidebar'
      ]),
      sidebar: {
        get: function() {
          return this.$store.state.app.sidebar
        },
        set: function(newValue) {
          this.$store.state.app.sidebar = newValue
        }
      }
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('ToggleSideBar')
      }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .tags-view-container {
      background: #fff;
      height: 34px;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0,0,0,.12), 0 0 3px 0 rgba(0,0,0,.04);
    }
    .main-container-box{
      width: 100%;
      height: 100%;
      display: flex;
      flex-flow: column;
      flex: 1;
    }
    .hcs-app-main{
      flex: 1;
      overflow-y: auto;
    }
    .hcs-app-main::-webkit-scrollbar{
      display: none;
    }
    .hcs-tabs-view{
      height: 40px;
    }
    .hsc-footer{
      height: 40px;
    }

    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        flex: 1;
        &.hideSidebar {
            .sidebar-wrapper,.null{
                /*<!--transform: translate(-150px, 0);-->*/
                width: 50px;
                .sidebar-container {
                  right: -18px;
                  /*transform: translate(140px, 0);*/
                }
                /*&:hover {*/
                    /*transform: translate(0, 0);*/
                    /*.sidebar-container {*/
                        /*transform: translate(0, 0);*/
                    /*}*/
                /*}*/
            }
            .hamburger-container{
                /*transform: translate(-164px);*/
              width: 100%!important;
            }
            .main-container {
              box-sizing: border-box;
              padding-left: 50px;
            }
            .logo{
              width: 200px!important;
            }
            .el-submenu__icon-arrow{
              display: none!important;
            }
          .svg-icon {
            margin-right: 16px;
          }
        }
        .el-header{
          height: 50px !important;
          line-height: 50px;
          position: relative;
          .logo{
            transition:width .34s;
          }
          .wd50{
            width: 50px!important;
          }
          .logo-img{
            position: absolute;
            top:0;
            left:0;
          }
        }
        .sidebar-wrapper {
            width: 200px;
            position: fixed;
            top: 50px;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
            transition: all .28s ease-out;
        }
      .sidebar12-wrapper:after{
          content: url('/static/image/sq1.png');
          position:absolute;
          top:50%;
          right:-9px;
          color:#fff;
          z-index:9999;

      }
        .sidebar-container {
            transition: all .28s ease-out;
            position: absolute;
            top: 40px;
            bottom: 0;
            left: 0;
            right: -18rem;
            overflow-y: scroll;
            background-color: #33435b;
        }
        .main-container {
            min-height: 0;
            transition: all .28s ease-out;
            box-sizing: border-box;
            padding-left: 200px;
            background-color: rgb(223,230,240);
            display: flex;
            flex-direction: column;
            flex: 1;
        }
    }
    .logo{
        width: 200px;
        height: 100%;
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }
    .logo img{
    }

    .hamburger-container{
        /*position: absolute;*/
        /*top: 50%;*/
        /*right:0.8px;*/
        color:#000;
        z-index: 9999;
        /*width: 99.3% !important;*/
        /*transition: all .28s ease-out;*/
    }

    .el-header {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 50px;
    }

    .el-aside {
      background-color: #D3DCE6;
      color: #333;
      text-align: center;
      line-height: 200px;
    }

    .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
    }


    body > .el-container {
      margin-bottom: 40px;
    }

    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
      line-height: 260px;
    }

    .el-container:nth-child(7) .el-aside {
      line-height: 320px;
    }

    .app-wrapper .el-container{
      height: 100%;
    }

    .main-container{
      position: relative;
    }
    .main-container footer{
        /*position: absolute;*/
        bottom:0;
        width: 100%;
    }
    .el-header{
      background-color: $bgc;
      text-align: right;
      padding: 0;

    }
    .el-footer{
      background-color: #fff;
      border: 1px solid #d2d6de;
      color:#878D99;
      text-align: left;
      font-size: 12px;
    }
    #Copyright{
      font-weight: 700;
    }
    .hsc-footer{
      height: 40px !important;
      line-height: 40px !important;
      text-align: center;
      color: #000;
      opacity: 0.34;
    }

</style>
