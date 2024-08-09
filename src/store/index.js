import { configureStore } from "@reduxjs/toolkit";
import BillStore from "@/store/modules/billStore"
const store = configureStore({
    reducer:{
        Bill:BillStore
    }
})

export default store;