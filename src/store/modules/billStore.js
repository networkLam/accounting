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
        },
        // 同步添加账单方法
        addBill (state, action) {
        state.billList.push(action.payload)
      }
    }
})

const {setBillList,addBill} = billStore.actions;

// 异步获取数据

const getBillList = ()=>{
    return async(dispatch)=>{
       const res = await  axios.get("http://localhost:8888/ka")
       dispatch(setBillList(res.data))
    }
}
const addBillList = (data) => {
    return async (dispatch) => {
      // 编写异步请求
      const res = await axios.post('http://localhost:8888/ka', data)
      // 触发同步reducer
      dispatch(addBill(res.data))
    }
  }
  const reducer = billStore.reducer;
export {getBillList,addBillList}
export default reducer;