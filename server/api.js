// 可能是我的node版本问题，不用严格模式使用ES6语法会报错

const db = require('./db');

module.exports=function (app) {
  app.all("*", function(req, res, next) {
        // res.writeHead(200, { "Content-Type": "text/plain", "Access-Control-Allow-Origin":"*" })
        // res.header('Access-Control-Allow-Origin', '*')
        // res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        // res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
        // res.header("X-Powered-By",' 3.2.1')
        // res.header("Content-Type", "application/json;charset=utf-8")
        // next()
        // res.header('Access-Control-Allow-Origin', '*');
        // res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        // res.header("Access-Control-Allow-Methods","*");

        next();
        // if (req.method == 'OPTIONS') {
        //   res.send(200);
        // }
        // else {
        //   next();
        // }
    });
  app.get('/api/test',function (req,res) {
    let orderData=[],
        driverData=[]
    const getOrderList= new Promise((resolve,reject)=>{
      db.OrderModel.find(
        //{status:"未选派"},
        // {timestamp:1,},
        //{limit:20},
        function (err,doc) {
          if (err) {
            console.log('status find error!')
            reject('reject status 未选派')
          } else {
              //console.log('doc',doc);
              if (!doc) {
              orderData = [];
            } else {
              orderData = doc;
            }
              //console.log('server-orderData',orderData);
              resolve(orderData)
          }
        }
      )
    })
    const getDriverList= new  Promise((resolve,reject)=>{
      db.DriverModel.find(
       // {timestamp:1,},
        function (err,doc) {
          if (err) {
            console.log('status司机 find error!')
            reject('reject 司机')
          } else {
            if (!doc) {
              driverData = [];
            } else {
              driverData = doc;
            }
            resolve(driverData)
          }
        }
      )
    })
    const p_all = Promise.all([getOrderList, getDriverList])

    p_all.then((suc)=>{
        let data = {
            "orderData": suc[0],
            "driverData": suc[1],
        }
        res.json({code: 200, msg:'', data: data})
        return
    }).catch( (err) => {
        console.log('err all:' + err)
        res.json({code: 600, msg:'查询出错', data: data})
        return
    })


  })

  // app.get('/api/test', function (req, res) {
  //     let brand_id = req.query.brand_id
  //     let name = req.query.name
  //     let newCart = req.query
  //     db.cartsModel.update({brand_id: brand_id, name: name}, {$set:newCart}, {upsert:true}, function(err){
  //         if (err) {
  //             console.log('加入购物车失败：' + err);
  //             res.json({code: 700, msg:'加入购物车失败：' + err})
  //             return
  //         } else {
  //             // add
  //             res.json({code: 200, msg:'加入购物车成功'})
  //             return
  //         }
  //     })
  // })
    
  // app.get('/api/test/addToDriver',function (req, res) {
  //     // let driverCode= req.query.driverCode,
  //     //     driverName= req.query.driverName,
  //     //     driverLine= req.query.driverLine,
  //     //     driverLevel=req.query.driverLevel,
  //     //     driverDes=req.query.driverDes,
  //     //     timestamp=req.query.timestamp,
  //     //     driverOrderCode=req.query.driverOrderCode
  //
  //     let  newDriver= req.query
  //     db.DriverModel.updated({$set:newDriver},function (err) {
  //         if (err) {
  //             console.log('增加新司机到数据库失败：' + err);
  //             res.json({code: 700, msg:'增加新司机车失败：' + err})
  //             return
  //         } else {
  //             // add
  //             res.json({code: 200, msg:'增加新司机成功'})
  //             return
  //         }
  //     })
  //
  // })

  app.get('*', function(req, res){
    res.end('404')
  })
}



/************** 创建(create) 读取(get) 更新(update) 删除(delete) **************/



