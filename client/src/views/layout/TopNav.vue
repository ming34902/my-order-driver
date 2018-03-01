<template>
    <el-menu id="hcstopview" :default-active="activeIndex" mode="horizontal" background-color="#33435b"
             text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
      <el-menu-item v-for="item in nav_menus" :key="item.id" :index="item.id">
        <!--{{ item.name }}-->
        <router-link  to="/" :key="item.id" :index="item.id">{{ item.name }}</router-link>
      </el-menu-item>
      <el-menu-item index="2132432">
        <router-link to="/test">订单派发</router-link>
      </el-menu-item>

    </el-menu>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        activeIndex: '0'
      }
    },
    computed: {
      ...mapGetters([
        'nav_menus'
      ])
    },
    methods: {
      handleSelect(key, keyPath) {
        this.$store.dispatch('ClearRouters').then(() => {
          this.$store.dispatch('InitSideNavs', key).then(() => {
          }).catch(error => {
            console.log(error)
          })
        }).catch(error => {
          console.log(error)
        })
      },
      fetchData() {
       // var items = this.$store.getters.nav_menus;
        var items= [{id:'1', name:"系统设置", orders:1},{id:'2', name:"系统设置2", orders:2},{id:'3', name:"系统设置3", orders:3},]
        if(Array.isArray(items)){
          var sortItem = items.sort((a, b) => {
            if (a.orders > b.orders) {
                return 1
            }
            if (a.orders < b.orders) {
                return -1
            }
            return 0;
          })
          this.activeIndex = sortItem[0].id.toString()
        }
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  @media screen and (max-width: 1450px) {
    .el-menu-item{
      width: 130px;
    }
  }
  .el-menu--horizontal {
    border-right: none;
    border-bottom: 1px solid #e6e6e6;
    background-color: $bgc !important;
    .el-menu-item{
      height: 50px;
      line-height: 50px;
    }
  }
  .el-menu {
    float: left;
  }
  .el-menu-item a {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
</style>
