<template>
  <div id="asideHcs">
    <template v-for="item in routes">
      <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.children[0].name}}
        </el-menu-item>
      </router-link>
      <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden">
        <template slot="title">
          <icon-svg v-if='item.icon' :icon-class="item.icon" /> {{item.name}}
        </template>
        <template v-for="child in item.children" v-if='!child.hidden'>
          <sidebar-item class='menu-indent' v-if='child.children&&child.children.length>0&&!(child.check==="No")' :routes='[child]'> </sidebar-item>
          <router-link v-else class="menu-indent" :to="item.path+'/'+child.path" tag="li">
            <el-menu-item :index="item.path+'/'+child.path">
              <icon-svg v-if='child.icon' :icon-class="child.icon" />
              {{child.children[0].name}}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
//  created() {
//    let temp = this.routes;
//     console.log(this.routes)
//   },
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  #asideHcs .el-submenu .is-active{
    background-color: #1c2432 !important;
  }
  .el-submenu__icon-arrow{
    left:160px;
  }
  .el-menu .menu-indent .is-active {
    background: url('~assets/image/menuActive.png') center center no-repeat;
    color: #fff;
  }
  .el-menu-item:hover, .el-submenu__title:hover{
    background-color:#293447;
    border-bottom: 0 solid #0facd5 !important;
  }
  .el-menu-item{
    font-size: 13px;
  }
  .el-submenu .el-menu-item{
    height: 40px !important;
    line-height: 40px !important;
  }
  .el-submenu{
    &.is-opened{
      .el-submenu__title{
        background-color: #283345!important;
      }
    }
  }
.svg-icon {
  margin-right: 6px;
}
.hideSidebar .svg-icon{
  margin-right: 16px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}

</style>

