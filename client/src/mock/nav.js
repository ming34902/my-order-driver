const TopList=[
  {id:'1', name:"系统设置", orders:1},
]

const  AllRouter=  [
  {
    pid:'1',
    childrenRouter:[
      {name: "机构管理"},
      {name: "角色管理"},
      {name: "用户管理"},
    ]
  }
]

export  default {
  GetTopNavs: confg =>{
    return {
      "code": 0,
      "data": TopList,
      "message":"success"
    }
  },
  GetSideNavs: config =>{
    const { pid } =JSON.parse(config.body)
    let filterList = AllRouter.filter(item =>{
      if(item.pid != pid){
        return false
      }
      return true
    })
    let pageList=[]
    if( filterList.length !==0){
      pageList= filterList[0].childrenRouter
    }
    return {
      "code": 0,
      "data": pageList,
      "message":"success"
    }
  }
}
