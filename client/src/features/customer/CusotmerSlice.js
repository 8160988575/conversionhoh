import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getallcustomer = createAsyncThunk('customer/getcustomers22',async ()=>{
    const response = await fetch('http://localhost:5000/customer/getcustomers');
    const data = await response.json()
    console.log("data",data)
    return data;
})



const CustomerSlice = createSlice({
    name:'customer',
    initialState:{
        customer:[],
        singlecustomer:{},
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getallcustomer.fulfilled,(state,action)=>{
            console.log("achived best")
            state.customer = action.payload
            state.status='succeed'
        })

    }
})


export default CustomerSlice.reducer;
