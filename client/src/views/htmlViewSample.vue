<template>
  <div>
    <HtmlPanel :url.asyc="url1"></HtmlPanel>
  </div>
</template>
<style scoped>
  div{color:red}
</style>
<script>
  import HtmlPanel from '@/views/HtmlPanel'
  export default{
    components: {HtmlPanel},
    data () {
      return {
        url1: ''
      }
    },
    mounted () {
      this.url1 = 'www.baidu.com'
    },
    methods: {
    }
  }
</script>

