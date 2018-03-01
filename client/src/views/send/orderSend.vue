<template>
    <div class="app-container calendar-list-container" style="margin:0 10px 10px 10px;">
      <div class="start-page">
        <el-row>
          <el-button class="start-button filter-item" size="small" @click="restDriverInfo" v-show="restPageShow">
            填写信息
          </el-button>
          <el-button class="start-button filter-item" size="small" @click="StartLineUp" v-show="startPageShow">
            开始排队
          </el-button>
        </el-row>
      </div>
      <div v-show="driverCardShow" class="ml10">
        <div class="flex a-left">
          <!--当前司机信息-->
          <el-card class="box-card mr10">
            <div class="box-card-item">
              <div class=" box-card-title">司机信息</div>
              <el-row class="box-card-main ml10 mt10" :model="createDriver">
                <el-col :span="12" class=" mt10" >
                  <span>姓名：</span>{{createDriver.driverName}}
                </el-col>
                <el-col :span="12" class=" mt10" >
                  <span>评级：</span>等级{{createDriver.driverLevel}}
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" class=" mt10"   >
                  <el-tag class="mr5" v-for="(lineTag,index) in createDriver.driverLine" :key="index">{{lineTag}}</el-tag>
                </el-col>
              </el-row>
              <el-row class=" mt10" >
                <el-col :span="19"   style="height: 40px">
                  <span>选派的订单编号：{{createDriver.driverOrderCode}}</span>
                </el-col>
                <el-col :span="5"  style="height: 40px">
                  <el-button v-show="createDriver.driverOrderCode!==''" size="small" @click="restDriverOrder">重选</el-button>
                </el-col>
              </el-row>


            </div>
          </el-card>
          <!--排队信息-->
          <el-card class="box-card mr10" v-show="ranksShow">
            <div class="box-card-item" :model="ranksData">
              <div class=" box-card-title">排队信息</div>
              <el-row class="box-card-main ml10 mt10" >
                <el-col :span="12" class=" mt10" >
                  <span>当前队列总人数：</span><span class="red f20" :model="ranksData.ranksList">{{ranksData.ranksList.length}}人</span>
                </el-col>
              </el-row>
              <el-row class="box-card-main ml10 mt10"  v-show="ranksData.ranksBeforeShow" >
                <el-col :span="12" class=" mt10" >
                  <span>正在排队，你的前面还有：</span>{{ranksData.ranksMyNum}}人
                </el-col>
              </el-row>
            </div>
          </el-card>
          <!--订单信息-->
          <el-card class="box-card mr10" v-show="ranksShow">
            <div class="box-card-item" >
              <div class=" box-card-title">订单信息</div>
              <el-row class="box-card-main ml10 mt10" >
                <el-col :span="12" class=" mt10" >
                  <span>当前订单总数：</span><span class=" f20" :model="beforeOrderListData" >{{beforeOrderListData.length}}</span>
                </el-col>
              </el-row>
              <el-row class="box-card-main ml10 mt10">
                <el-col :span="12" class=" mt10" >
                  <span>可接订单：</span>
                  <span class="red f20"  :model="filterOrderListData" v-show="filterOrderNumShow">
                    {{filterOrderListData.length}}
                  </span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>

        <div class="" style="width: 100%">
          <!--  列表 -->
          <el-table :key='tableKey' ref="multipleTable" :data="filterOrderListData" v-loading="listLoading" height="450"
                    element-loading-text="给我一点时间" border fit highlight-current-row
                    style="margin-top:5px" @selection-change="handleSelectionChange">
            <el-table-column type="selection"></el-table-column>
            <el-table-column align="center" label="序号" width="80">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <!--<el-table-column :key="key" align="center" v-for='(value,key) in tableThead' :label="value.title"  >-->
            <!--<template slot-scope="scope"  :width="value.width" >-->
            <!--<div v-if="value.key == 'isSealed'" >{{scope.row[value.key] | sealedFilter}}</div>-->
            <!--<div v-else>{{scope.row[value.key]}}</div>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center" label="订单编号"  width="200">
              <template slot-scope="scope">
                {{scope.row.orderCode}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单路线"  width="200">
              <template slot-scope="scope">
                {{scope.row.orderLine}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="时间戳"  width="200">
              <template slot-scope="scope">
                {{scope.row.timestamp}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="等级要求" >
                <template slot-scope="scope">
                {{scope.row.orderLevel}}
              </template>
            </el-table-column>
            <el-table-column align="center" label="订单状态"  >
              <template slot-scope="scope">
                {{scope.row.status}}
              </template>
            </el-table-column>


            <el-table-column align="center" label="操作" width="100" class-name="small-padding">
            <template slot-scope="scope">
            <el-button type="primary" size="mini"  @click="handleCheck(scope.row)">选择</el-button>
            </template>
            </el-table-column>
          </el-table>
        </div>

        <!--  分页 -->
        <div v-show="!listLoading" class="pagination-container">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.current"
                         :page-sizes="[10,20,30, 50]" :page-size="listQuery.size" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>

       <!--编辑司机信息-->
      <el-dialog title="司机信息" :visible.sync="dialogFormVisible">
        <el-form  ref="dataForm" :model="createDriver" label-position="right" label-width="100px"
                 style='width: 80%; margin-left:50px;' :rules="rules" >
          <!--:rules="rules"-->
          <el-row>
            <el-col :span="12">
              <el-form-item label="司机名称" prop="driverName">
                <el-input v-model="createDriver.driverName" placeholder="司机名称"  @keyup.enter.native="selectNameChange"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="司机评级" prop="driverLevel" >
                <el-select size="medium" v-model="driverLevelData.selectValue" placeholder="司机评级"  @change="selectLevelChange">
                  <el-option
                    v-for="item in driverLevelData.options"
                    :key="item.text"
                    :label="item.value"
                    :value="item.text">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="路线意愿" prop="driverLine" >
                <el-checkbox-group  v-model="lineCheckList"  @change="selectLineChange">
                  <el-checkbox
                     v-for="item in lineListData.options"
                     :key="item.text"
                     :value="item.text"
                     :label="item.value">{{item.value}}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="备注" prop="driverDes">
            <el-input v-model="createDriver.driverDes" placeholder="请输入备注" @keyup.enter.native="selectCommentChange"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelData">取 消</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createDriverData">确 定</el-button>
        </div>
      </el-dialog>

      <!--<div>-->
        <!--<input class="form-control" id="inputEmail3" placeholder="请输入账号" v-model="account">-->
        <!--<input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码" v-model="password">-->
        <!--<button type="submit" class="btn btn-default" @click="login">登录</button>-->
      <!--</div>-->

    </div>
</template>

<script type="text/ecmascript-6">
  import createDriverFun from  '../../utils/driver/createDriver'

  const defaultTableThead = [
    {key:'orderCode',title:'订单编号',with:80},
    {key:'orderLine',title:'订单路线',with:150},
    {key:'orderLevel',title:'订单等级',with:150},
    {key:'timestamp',title:'时间戳',with:200},
    {key: 'status', title: '订单状态'},
  ]
  const orderListData=[
    {orderCode:"234341015",orderLine:'路线1',orderLevel:1,timestamp:1518399652000,status:'待选派'},
    {orderCode:"577742025",orderLine:'路线5',orderLevel:1,timestamp:1518399653000,status:'待选派'},
    {orderCode:"562987437",orderLine:'路线2',orderLevel:1,timestamp:1518399654000,status:'待选派'},
    {orderCode:"537565004",orderLine:'路线3',orderLevel:1,timestamp:1518399655000,status:'已选派'},
    {orderCode:"562346559",orderLine:'路线4',orderLevel:1,timestamp:1518399656000,status:'待选派'},
    {orderCode:"118552058",orderLine:'路线5',orderLevel:2,timestamp:1518399657000,status:'待选派'},
    {orderCode:"119233246",orderLine:'路线1',orderLevel:1,timestamp:1518399658000,status:'待选派'},
    {orderCode:"112211546",orderLine:'路线4',orderLevel:3,timestamp:1518399659000,status:'已选派'},
    {orderCode:"112648533",orderLine:'路线3',orderLevel:1,timestamp:1518399660000,status:'待选派'},
    {orderCode:"118423932",orderLine:'路线3',orderLevel:2,timestamp:1518399632000,status:'已选派'},
    {orderCode:"112233963",orderLine:'路线2',orderLevel:3,timestamp:1518399642000,status:'待选派'},
    {orderCode:"118333324",orderLine:'路线5',orderLevel:2,timestamp:1518399612000,status:'待选派'},
    {orderCode:"122223956",orderLine:'路线4',orderLevel:1,timestamp:1518399643000,status:'待选派'},
    {orderCode:"112223946",orderLine:'路线4',orderLevel:2,timestamp:1518399644000,status:'已选派'},
  ]
    export default {
        name: 'orderSend',
        data() {
            return {
              restPageShow:true,//编辑司机button
              startPageShow:false,//开始排队button
              listLoading: true,//loading
              driverCardShow:false,//司机卡片展示
              selectedLevelValue: null,
              beforeOrderListData:[],//列表数组
              createDriver:{
                driverCode:'',
                driverName:'',
                driverLine:'',
                driverLevel:'',
                driverDes:'',
                timestamp:'',
                driverOrderCode:''
              },//司机信息
              driverLevelData:{
                selectValue:'',
                options:[
                  {text: 1,value:"等级1",levelDes:"等级经验1-20",},
                  {text: 2,value:"等级2",levelDes:"等级经验21-50",},
                  {text: 3,value:"等级3",levelDes:"等级经验51-100",},
                ]
              },//等级选择
              dialogFormVisible: false,
              dialogStatus: 'create',//创建
              lineCheckList:[],
              lineListData:{
                selectValue:'',
                options:[
                  {text: 1,value: "路线1"},
                  {text: 2,value: "路线2"},
                  {text: 3,value: "路线3"},
                  {text: 4,value: "路线4"},
                  {text: 5,value: "路线5"},
                ]
              },//路线选择
              rules: {
                driverName: [{required: true, message: '名称不能为空', trigger: 'blur'}],
                // driverLevel: [{required: true, message: '请至少选择一项', trigger:'change'}]
              },
              tableKey: 0,//列表
              multipleSelection: [],
              tableThead :defaultTableThead,//表数据
              listQuery: {
                current: 1,
                size: 10,
                order: '',
                orderByField: '',
                condition: {
                  name:undefined,
                }
              },//分页
              total: null,
              ranksShow:true,//排队队列信息显示
              ranksData:{
                ranksList:[],
                ranksMyNum:100,
                ranksBeforeShow:false,
              },
              filterOrderListData:[],//筛选后可供选择的订单
              filterOrderNumShow:false,

              initOrderData:[],
              initDriverData:[]
            }
        },
        created(){
          this.getInitData()
        },
        mounted() {
          //console.log('mounted-createDriver',this.createDriver);

        },
        methods:{
          //请求初始数据
          getInitData(){
            let  _this=this
            //console.log('_this',_this);
            _this.$http({
              url:'/api/test',
              methods:'GET'
            })
              .then((res)=>{
                let data=res.data
                console.log('api请求initdata',data);
                if (data.code === 200) {
                  // 处理数据
                  _this.initOrderData = data.data.orderData
                  _this.initDriverData = data.data.driverData
                  this.orderListInit()
                  this.ranksListInit()
                } else {
                  console.log(data.msg)
                }
              })
            // setTimeout(()=>{
            //   this.orderListInit()
            //   this.ranksListInit()
            // },1000)
          },
          //创建编辑面板
          restDriverInfo(){
            let createDN=createDriverFun.getRandomName();
            let createCode=createDriverFun.getRandomOrderCode()
            this.createDriver.driverName=createDN
            this.createDriver.driverCode=createCode
           // console.log('createDriver',this.createDriver);
            this.restPageShow=false;
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            this.radioIsEnable = '1'
            this.$nextTick(() => {
              this.$refs['dataForm'].clearValidate()
            })
          },
          //编辑司机信息
          createDriverData(){
            this.$refs['dataForm'].validate((valid) => {
              if (valid) {
               // this.createDriver.driverLevel = this.selectedLevelValue
                this.listLoading = false
                this.dialogFormVisible = false
                console.log('编辑司机createDriver',this.createDriver);
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
                this.driverCardShow=true
                this.startPageShow=true
                this.ranksShow=true
              }
            })
          },
          //取消
          cancelData(){
            this.dialogFormVisible = false;
            this.restPageShow=true;
          },
          //订单队列信息初始
          orderListInit(){
            //this.beforeOrderListData=orderListData;
            //this.filterOrderListData=orderListData;
            this.beforeOrderListData=this.initOrderData
            this.filterOrderListData=this.initOrderData
            //console.log('this.beforeOrderListData',this.beforeOrderListData);
          },
          //司机队列信息初始
          ranksListInit(){
            // this.ranksData.ranksList=[
            //    { driverName:'王五', timestamp:'1518399632000'},
            //    { driverName:'王五', timestamp:'1518399642000'},
            //    { driverName:'王五', timestamp:'1518399644000'},
            //    { driverName:'王五', timestamp:'1518399645000'},
            //    { driverName:'王五', timestamp:'1518399646000'},
            //    { driverName:'王五', timestamp:'1518399647000'},
            //    { driverName:'王五', timestamp:'1518399648000'},
            //    { driverName:'王五', timestamp:'1518399649000'},
            //    { driverName:'王五', timestamp:'1518399652000'},
            //    { driverName:'王五', timestamp:'1518399653000'},
            //    { driverName:'王六', timestamp:'1518399654000'},
            //    { driverName:'王七', timestamp:'1519409654000'},
            //  ]
            this.ranksData.ranksList=this.initDriverData
            //console.log('this.ranksData.ranksList',this.ranksData.ranksList);
          },
          //开始排队 加入队列
          StartLineUp(){
            //我的开始排队时间戳
            let myTimeStamp = Date.parse(new Date());
            this.createDriver.timestamp = myTimeStamp;
            let newDriver={}
            newDriver.timestamp=myTimeStamp;
            newDriver.driverName=this.createDriver.driverName;
            let lists=this.ranksData.ranksList
            this.ranksData.ranksMyNum = lists.length
            lists.splice( lists.length,0,newDriver)
            this.ranksData.ranksList=lists
            this.ranksData.ranksBeforeShow=true
            this.cutLineUp()
          },
          //排队队列开始 运行 排队个数逐个消失
          cutLineUp(){
            let _this=this
            let num=_this.ranksData.ranksMyNum
            //console.log('逐个消失num',num);
            let p=num ;
            let change =function () {
              p--;
              console.log(p);
              _this.ranksData.ranksList.shift()
              _this.ranksData.ranksMyNum=p
              if(p<0){
                 console.log("p<0")
              }else  if ( p == 0) {
                clearInterval(timer);
                //console.log('停止');
                _this.$notify.info({
                  title: '消息',
                  message: '正在匹配可选订单请稍等...'
                });
                setTimeout(()=>{
                  _this.filterOrderList()
                },1500)
                return false;
              }
            }
            let timer= setInterval(()=>{
              change(num)
            }, 500)
          },
          //筛选可选订单
          filterOrderList(){
            let _this=this
            let orderList = _this.beforeOrderListData
            let driverInfo= _this.createDriver
            let driverLevel = parseInt(_this.createDriver.driverLevel)
            console.log('driverInfo.driverLine',driverInfo.driverLine);
            //筛选满足等级的订单
            let filterOrderLists=orderList.filter(item=>{
              let itemss=item
              return itemss.orderLevel <= driverInfo.driverLevel
            })
            console.log('满足等级的订单filterOrderLists',filterOrderLists);
            //筛选满足线路的订单
            filterOrderLists = filterOrderLists.filter(item=>{
              let items=item
              if( driverInfo.driverLine.length !== 0 ){
                for( let key in driverInfo.driverLine){
                  if( items.orderLine.indexOf(driverInfo.driverLine[key])!== -1){
                    return true
                  }
                }
              }
            })
            console.log('满足路线的订单filterOrderLists',filterOrderLists);
            this.filterOrderListData=filterOrderLists
            this.filterOrderListFirstData=filterOrderLists[0];//直接给司机派发筛选后的第一个订单
            this.filterOrderNumShow=true
            let infoOrder=this.filterOrderListFirstData.orderCode
            this.$alert('派发的订单编号:'+infoOrder, '派发订单', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          },
          //选择订单
          handleCheck(row){
            //console.log('row',row);
            let isHaveOrder= this.createDriver.driverOrderCode
           // console.log('isHaveOrder',isHaveOrder);
            if(isHaveOrder=== ''){
              //如果司机未选订单
              if (row.status === '待选派') {
                row.status = '已选派'
                this.createDriver.driverOrderCode=row.orderCode
                for (const v of this.filterOrderListData) {
                  if (v.id === row.id) {
                    const index = this.filterOrderListData.indexOf(v)
                    this.filterOrderListData.splice(index, 1, row)
                    break
                  }
                }
                this.$notify({
                  title: '成功',
                  message: ' 抢单成功',
                  type: 'success',
                  duration: 2000
                })
              } else if (row.status === '已选派') {
                this.$message({
                  message: '已选派的订单无法再进行抢单',
                  type: 'warning'
                });
              }
            }else {
              //如果司机已选订单
              this.$notify({
                title: '警告',
                message: ' 您已选择了一个订单不能再选其他订单',
                type: 'warning',
                duration: 2000
              })
            }
          },
          //司机选择的订单清空 重选
          restDriverOrder(){
            this.createDriver.driverOrderCode=''
          },
          selectLevelChange(value){
            //this.selectedLevelValue = value;
            this.createDriver.driverLevel=value
          },
          selectLineChange(value){
            this.createDriver.driverLine=value
          },
          selectNameChange(value){
            this.createDriver.driverName=value
          },
          selectCommentChange(value){
            this.createDriver.driverDes=value
          },
          handleSelectionChange(val) {
            this.multipleSelection = val
          },
          // 列表显示条数发生改变触发
          handleSizeChange(val) {
            this.listQuery.size = val
            this.orderListInit()
          },
          // 列表当前页发生改变触发
          handleCurrentChange(val) {
            this.listQuery.pageNo = val
            this.orderListInit()
          },

        }


    }
</script>

<style scoped>
  .f20{
    font-size: 20px;
  }
.mt10{
  margin-top: 10px;
}
.mr5{
  margin-right: 5px;
}
.mr10{
  margin-right: 10px;
}
  .start-page{
    text-align: center;
  }
.start-button{

}
  .box-card {
    flex: 1;
  }

  /*box-card*/
  .box-card-title{
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left:10px;
    padding-right:10px;
    text-align: center;
    border-radius: 8px;
    color: #fff;
    background-color: #0f88eb;
  }
  .box-card-main{

  }
</style>
