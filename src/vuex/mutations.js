import {SHOPS,CATEGORY,POSITION} from "./mutation-types"
export default{
    [POSITION](state,address){
        state.address = address
    },
    [CATEGORY](state,categorys){
        state.categorys = categorys
    },
    [SHOPS](state,shops){
        state.shops = shops
    }
}