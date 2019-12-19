import {SHOPS,CATEGORY,POSITION,SAVETOKEN,SAVEUSER,
    CLEANTOKEN,CLEANUSER} from "./mutation-types"
export default{
    [POSITION](state,address){
        state.address = address
    },
    [CATEGORY](state,categorys){
        state.categorys = categorys
    },
    [SHOPS](state,shops){
        state.shops = shops
    },
    [SAVETOKEN](state,token){
        state.tkoen = token
    },
    [SAVEUSER](state,{user}){
        console.log(user)
        state.user = user
    },
    [CLEANTOKEN](state){
        state.token = ""
    },
    [CLEANUSER](state){
        state.user = ''
    }

}