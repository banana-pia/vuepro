import axios from"axios"
import {Indicator} from "mint-ui" 
import qs from 'qs'
import store from "@/vuex/store"
import router from "@/router"
let instance = axios.create({
    baseURL:"/api",
    timeout:5000,
})
instance.interceptors.request.use((config)=>{
    Indicator.open()
    let data = config.data
    if(data instanceof Object){
        config.data = qs.stringify(data)
    }
    let token = store.state.token
    if(token){
     config.headers['Authorization'] = token
    }else{
      let needCheck = config.headers.needCheck
      if(!needCheck){
        throw new Error("请登录")
     }
    }

    return config
})
instance.interceptors.response.use((response)=>{
    Indicator.close()
    return response.data

},(err)=>{
    const response = err.response
    if(!response){
        const path = router.currentRoute.path
        if(path !== "/login"){
            router.replace("/login")
            Toast(err.message)
        }
    }else{
        if(err.response.status === 401){
            const path = route.currentRoute.path
            if(path !== "/login"){
                store.dispatch("loginout")
                router.replace("/login")
                Toast(err.responce.data.message || "登录失效，请重新登录")
            }   
        }else if(err.response.status === 404){
            MessageBox("提示","访问资源不存在")
        }else{
            MessageBox("提示","err.message")
        }
    }
    router.replace("/login")
    return new Promise(()=>{})
}
)
export default instance
