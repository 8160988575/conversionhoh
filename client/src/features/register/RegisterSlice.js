import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const getallrequests = createAsyncThunk('request/allrequests',async ()=>{
    const response = await fetch('http://localhost:5000/request/gethohrequest');
    const data = await response.json()
    console.log("data",data)
    return data;
})


export const addregistrationreq = createAsyncThunk('request/addrequest',async (text,{rejectWithValue})=>{
    
    try {
    //   with axios
        const response =await axios.post('http://localhost:5000/request/addrequest',text)
        return response.data;


        // with fetch
    //     const response = await fetch('http://localhost:5000/request/addrequest',{
    //         method:'POST',
    //         headers:{ 'Content-Type':  'application/json'},
    //         body:JSON.stringify(text)
    //     });
        
    //     const check = await response.json()
    //     console.log("check",check)
    //     console.log("response",response)

    //    if (response.ok) {
    //     return check
    //    } 
    //    else {
    //     // console.log(check)
    //     return rejectWithValue(check)
    //    }
    } catch (error) {
        // console.log("error",error.response.data)
        return rejectWithValue(error.response.data);

    }

   
})

export const approverequest = createAsyncThunk('request/approverequest',async (text)=>{
    console.log(text)
    const response = await fetch('http://localhost:5000/request/approverequest',{
        method:'PUT',
        headers:{ 'Content-Type':  'application/json'},
        body:JSON.stringify(text)
    });
    const check = await response.json()
    console.log("updated or not",check)
   return text
})


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
        addsucess:false,        
        error:null,
        hohcurrentreq:{},
    
    },
    reducers:{     
    removesucessofadd:(state,action)=>{
        state.addsucess = false
    },
    removeerrorofadd:(state,action)=>{
        state.error =null
    },
    currentlyhandlingreq:(state,action)=>{
        state.currentreq =action.payload
    }

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
            state.addsucess = true
        })
        .addCase(addregistrationreq.rejected,(state,action)=>{
            console.log("rejected",action.payload)
            state.error = action.payload
            state.addsucess = false

            // state.hohrequests.push(action.payload)
            // state.customer = [...state.customer,action.payload]
            
        })
        .addCase(approverequest.fulfilled,(state,action)=>{
            console.log("request approved",action.payload) 


            // state.hohrequests.push(action.payload)
            // state.customer = [...state.customer,action.payload]
            
        })
     

    }
})

export const { removesucessofadd,removeerrorofadd,currentlyhandlingreq } = RegisterSlice.actions;
export default RegisterSlice.reducer;
