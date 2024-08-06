import { configureStore } from "@reduxjs/toolkit";
import BillStore from "@/store/mudules/billStore"
const store = configureStore({
    reducer:{
        Bill:BillStore
    }
})

export default store;