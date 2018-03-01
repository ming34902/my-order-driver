// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const initDriverList = require('./initDriverList.json');
const initOrderList = require('./initOrderList.json');

mongoose.Promise=global.Promise;
const database = mongoose.connect('mongodb://127.0.0.1:27017/test02');
database.connection.on('error', function(error){
  console.log('数据库test02连接失败：' + error);
  return
})
database.connection.once('open', function(){
  console.log('数据库test02连接成功');
  // 初始化数据库
  initData();
});
/************** 定义模式loginSchema **************/
const driverSchema = new Schema({
  driverCode:String,
  driverName:String,
  driverLine:Array,
  driverLevel:Number,
  driverDes:String,
  timestamp: { type : Date, default : Date.now },
  driverOrderCode:String
});
const orderSchema = new Schema({
  orderCode:String,
  orderLine:String,
  orderLevel:Number,
  timestamp:{ type : Date, default : Date.now },
  status:String
});

/************** 定义模型Model **************/
const  db = {
  DriverModel : database.model('DriverModel',driverSchema),
  OrderModel : database.model('OrderModel',orderSchema),
};

const initData = function () {
  // 初始化Driver
  db.DriverModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db DriverModel open first time');
      //首次连接的时候、数据库还是空的, 初始化数据，遍历插入；先打印出来看看
      initDriverList.map(brand => {
        db.DriverModel.create(brand)
      });
      console.log('initDriverList',initDriverList)

    } else {
      console.log('db open not first time');
    }
  })
  db.OrderModel.find({}, function(err, doc){
    if (err) {
      console.log('initData出错：' + err);
    } else if (!doc.length) {
      console.log('db OrderModel open first time');
      //首次连接的时候、数据库还是空的, 初始化数据，遍历插入；先打印出来看看
      initOrderList.map(brand => {
        db.OrderModel.create(brand)
      })
      console.log('initOrderList',initOrderList)

    } else {
      console.log('db open not first time');
    }
  })



}

module.exports = db;
