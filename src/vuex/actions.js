import {SHOPS,CATEGORY,POSITION} from "./mutation-types"
import {reqAddress,reqCategorys,reqShops} from "../Api/index" 
export default{

    async getAddress({commit,state}){
        let {longitude,latitude} = state
        let result = await reqAddress(longitude,latitude)
        if (result.code === 0){
            commit(POSITION ,result.data)
        }
    },
    async getCategorys({commit}){

        let result = await reqCategorys()
        if (result.code === 0){
            commit(CATEGORY ,result.data)
        }
    },
    async getShops({commit,state}){
        let {longitude,latitude} = state
        let result = await reqShops({longitude,latitude})
        console.log(result)
        if (result.code === 0){
            commit(SHOPS ,result.data)
        }
    }
}