import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const billStore = createSlice({
    name:"billStore",
    initialState:{
        billList:[]
    },
    reducers:{
        setBillList(state,actions){
            state.billList = actions.payload;
        }
    }
})

const {setBillList} = billStore.actions;
const reducer = billStore.reducer;
// 异步获取数据

const getBillList = ()=>{
    return async(dispatch)=>{
       const res = await  axios.get("http://localhost:8888/ka")
       dispatch(setBillList(res.data))
    }
}


export {getBillList}
export default reducer;