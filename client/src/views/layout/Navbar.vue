<template>
  <el-menu class="navbar" mode="horizontal">
    <!--<levelbar></levelbar>-->
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  components: {

  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()  // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 40px;
        width:  100%;
        line-height: 40px;
        text-align: left;
        border-radius: 0 !important;
    }

</style>

