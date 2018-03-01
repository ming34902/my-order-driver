<template>
  <el-menu mode="vertical" :default-active="$route.path">
    <sidebar-item :routes="nav_routers"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from './SidebarItem'
import { mapGetters } from 'vuex'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'nav_routers',
      'sidebar'
    ])
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
  background-color: #34435b;
  width: 201px;
}
</style>
