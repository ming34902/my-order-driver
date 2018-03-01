<template>
  <div id="testBox">
    <iframe style="width: 100%" :src="src" frameborder="0"></iframe>
  </div>
</template>

<script type="text/javascript">
  export default  {
    name: 'test',
    data(){
      return {
        src: 'http://www.baidu.com'
      }
    }
  }
</script>
<style type="text/scss" scoped="">
  #testBox{
    width: 100%;
    display: flex;
    flex:1;
    iframe{
      width: 100%;
    }
  }
</style>
