<template>
  <div class="dashboard-container">
    <!--<div class='dashboard-text'><p>首页</p></div>-->
    <!--<div class='dashboard-text'>role:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
    <el-row :gutter="20" id="home-page-heard">
      <el-col :span="4" v-for="(item,index) in chartHeard" :key="index">

      </el-col>
    </el-row>



  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getHeard} from '@/api/dashboard'

export default {
  name: 'dashboard',
  data(){
    return {
      chartHeard:[]
    }
  },
  methods:{

  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.dashboard {
  &-container {
    margin: 30px;
    .home-page-heard-box{
      height: 80px;
      cursor: pointer;
      font-size: 12px;
      position: relative;
      overflow: hidden;
      color: #666;
      background: #fff;
      -webkit-box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.15);
      box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
      border-color: rgba(0, 0, 0, 0.05);
      margin-bottom: 10px;
      &:hover{
        background-color: #2f363f;
        cursor: pointer;
      }
      .hp-name{
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
      }
      .hp-value{
        font-size: 20px;
        display: inline-block;
        color: #666;
        font-weight: 700;
        padding: 5px 2px 5px 0;
      }
      .hp-yesterday{
        color:#666
      }
      .el-col{
        height: 80px;
      }
    }
    .home-page-heard{
    }
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
