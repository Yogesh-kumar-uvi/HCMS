import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice"
import tokenReducer from "./TokenSllice"
import AlertSlice from "./AlertSlice";
import UserSlice from "./UserSlice";
import DoctorSlice from "./DoctorSlice";

const store = configureStore({
    reducer:{
        cart:cartReducer,
        alert:AlertSlice,
        token:tokenReducer,
        user:UserSlice,
        doctor:DoctorSlice
    }
})

export default store;