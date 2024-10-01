import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getallrequests = createAsyncThunk('request/allrequests',async ()=>{
    const response = await fetch('http://localhost:5000/request/gethohrequest');
    const data = await response.json()
    console.log("data",data)
    return data;
})


export const addregistrationreq = createAsyncThunk('request/addrequest',async (text)=>{
    const response = await fetch('http://localhost:5000/request/addrequest',{
        method:'POST',
        headers:{ 'Content-Type':  'application/json'},
        body:JSON.stringify(text)
    });
    
    const check = await response.json()
    console.log("check",check)
   return check
})

// export const updatecustomer = createAsyncThunk('customer/updatecustomer',async (text)=>{
//     const response = await fetch('http://localhost:5000/customer/updatecustomer',{
//         method:'PUT',
//         headers:{ 'Content-Type':  'application/json'},
//         body:JSON.stringify(text)
//     });
//    return text
// })


// export  const deletecustomer = createAsyncThunk('customer/delete',async(id)=>{
//     console.log("id for the delete",id)
//     const response = await fetch(`http://localhost:5000/customer/deletecustomer/${id}`,{
//         method: 'DELETE'
//     })
//     return id
// })




const RegisterSlice = createSlice({
    name:'hoh_req',
    initialState:{
        hohrequests:[],
        status:'idle',
    },
    reducers:{     
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getallrequests.fulfilled,(state,action)=>{
            console.log("achived best")
            state.hohrequests = action.payload
            state.status='succeed'
        })
        .addCase(addregistrationreq.fulfilled,(state,action)=>{
            state.hohrequests.push(action.payload)
            // state.customer = [...state.customer,action.payload]
            
        })
     

    }
})

// export const { getonecustomer,currentworkingwith } = CustomerSlice.actions;
export default RegisterSlice.reducer;
