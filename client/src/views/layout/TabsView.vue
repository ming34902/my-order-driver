<template>
    <tabs-panel class='tags-view-container' ref='tabPanel'>
      <span class="tab-view-tips"></span>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path":key="tag.path">
        {{ tag.name }}
        <span  :class="isClose(tag)?'el-icon-close':''"  @click='closeViewTags(tag,$event)'></span>
      </router-link>
    </tabs-panel>
</template>

<script>
  import tabsPanel from './TabsPanel'

  export default {
    components: { tabsPanel },
    computed: {
      visitedViews() {
        return this.$store.getters.visitedViews
      }
    },
    mounted() {
      this.addViewTags()
    },
    methods: {
      closeViewTags(view, $event) {
        if(this.isClose(view)){
          this.$store.dispatch('delVisitedViews', view).then((views) => {
            if (this.isActive(view)) {
              const latestView = views.slice(-1)[0]
              if (latestView) {
                this.$router.push(latestView.path)
              } else {
                this.$router.push('/')
              }
            }
          })
          $event.preventDefault()
        }
      },
      generateRoute() {
        console.log('this.$route.name',this.$route.name);
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      addViewTags() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.$store.dispatch('addVisitedViews', route)
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      isClose(route) {
        return route.isclose
      },
      moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
          for (const tag of tags) {
            if (tag.to === this.$route.path) {
              this.$refs.tabPanel.moveToTarget(tag.$el)
              break
            }
          }
        })
      }
    },
    watch: {
      $route() {
        this.addViewTags()
        this.moveToCurrentTag()
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .tab-view-tips{
    margin: 0 -11px 0 30px;
    display: inline-block;
    border-left: 4px solid #08bad0;
    height: 18px;
    position: relative;
    top:4px;
  }
  .tags-view-container {
    background: #eef1f8;
    height: 40px;
    line-height: 40px;
    width: 100%;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-item {
      display: inline-block;
      position: relative;
      height: 26px;
      width:auto;
      border-radius: 6px;
      text-align: center;
      line-height: 26px;
      /*border: 1px solid #d8dce5;*/
      color: rgba(0,0,0,.5);
      /*background: #fff;*/
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 15px;
      }
      &.active {
        background-image: url('~assets/image/button.png');
        background-size: cover;
        /*background-color: #42b983;*/
        color: #fff;
        /*border-color: #42b983;*/
        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
    .scroll-wrapper{
      box-sizing: border-box !important;
      padding-left: 30px !important;
    }
  }
</style>

<style rel="stylesheet/scss" lang="scss">
  .tags-view-container {
    .tags-view-item {
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.8);
          display: inline-block;
          vertical-align: -2px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }
  }
</style>
