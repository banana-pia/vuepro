import axios from"axios"
import {Indicator} from "mint-ui" 
import qs from 'qs'
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
    return config
})
instance.interceptors.response.use((response)=>{
    Indicator.close()
    return response.data

},(err)=>{
    alert('请求出错了'+err.message)
    return new Promise(()=>{})
}
)
export default instance
