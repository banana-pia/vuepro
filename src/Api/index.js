import ajax from "./ajax"
//获取具体位置
export const reqAddress = (longitude,latitude)=>ajax( `/position/${latitude},${longitude}`)
//获取食品分类
export const reqCategorys = ()=>ajax('/index_category',{
    headers:{needCheck:true}
})
//附件商家列表
export const reqShops = ({longitude,latitude})=>ajax("/shops",{params:{longitude,latitude}},{
    headers:{needCheck:true}
})
//获取短信验证
export const reqSendCode = (phone) => ajax.get("/sendcode",{
    params:{phone}
})
//用手机号，短信登录
export const reqPhoneSws = (phone,code) => ajax.post("/login_sms",{phone,code})
//用户名，密码登录
export const reqPhonePwd = (name,pwd,captcha) => ajax.post('/login_pwd',{name,pwd,captcha})
//自动登录
export const reqautoL = () => ajax.get("/auto_login")