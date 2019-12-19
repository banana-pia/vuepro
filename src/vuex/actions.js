import {SHOPS,CATEGORY,POSITION, SAVEUSER, SAVETOKEN,CLEANUSER, CLEANTOKEN} from "./mutation-types"
import {reqAddress,reqCategorys,reqShops,reqautoL} from "../Api/index" 
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
    },
    saveUser({commit},user){
        console.log(user)
        let token = user.token
        delete user.token
        localStorage.setItem("token_key",token)
        commit(SAVEUSER,{user})
        commit(SAVETOKEN,{token})

    },
    loginout({commit}){
        localStorage.removeItem("token_key")
        commit(CLEANUSER)
        commit(CLEANTOKEN)
    },
    async autoLogin({commit,state}){
        if(state.token && !state.user._id){
            let result = await reqautoL()
            let user = result.data
            commit(SAVEUSER,{user})
        }
       
    }
}