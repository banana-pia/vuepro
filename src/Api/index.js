import ajax from "./ajax"
//获取具体位置
export const reqAddress = (longitude,latitude)=>ajax( `/position/${latitude},${longitude}`)
//获取食品分类
export const reqCategorys = ()=>ajax('/index_category')
//附件商家列表
export const reqShops = ({longitude,latitude})=>ajax("/shops",{params:{longitude,latitude}})