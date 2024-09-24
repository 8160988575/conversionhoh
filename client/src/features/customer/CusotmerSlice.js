import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const getallcustomer = createAsyncThunk('customer/getcustomers22',async ()=>{
    const response = await fetch('http://localhost:5000/customer/getcustomers');
    const data = await response.json()
    console.log("data",data)
    return data;
})


export const addcustomer = createAsyncThunk('customer/addcustomer',async (text)=>{
    const response = await fetch('http://localhost:5000/customer/addcustomer',{
        method:'POST',
        headers:{ 'Content-Type':  'application/json'},
        body:JSON.stringify(text)
    });
   return response.json()
})

export const updatecustomer = createAsyncThunk('customer/updatecustomer',async (text)=>{
    const response = await fetch('http://localhost:5000/customer/updatecustomer',{
        method:'PUT',
        headers:{ 'Content-Type':  'application/json'},
        body:JSON.stringify(text)
    });
   return text
})


export  const deletecustomer = createAsyncThunk('customer/delete',async(id)=>{
    console.log("id for the delete",id)
    const response = await fetch(`http://localhost:5000/customer/deletecustomer/${id}`,{
        method: 'DELETE'
    })
    return id
})




const CustomerSlice = createSlice({
    name:'customer',
    initialState:{
        customer:[],
        singlecustomer:{},
        status:'idle',
        error:null,
        currentworkingcustomer:{}
    },
    reducers:{     
        getonecustomer:(state,action)=>{
            
            state.singlecustomer = action.payload
        },
        currentworkingwith:(state,action)=>{
            console.log("currentworkingcustomer",action.payload)
            state.currentworkingcustomer = action.payload
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getallcustomer.fulfilled,(state,action)=>{
            console.log("achived best")
            state.customer = action.payload
            state.status='succeed'
        })
        .addCase(addcustomer.fulfilled,(state,action)=>{
            // state.customer.push(action.payload)
            // state.customer = [...state.customer,action.payload]
            
        })
        .addCase(updatecustomer.fulfilled,(state,action)=>{
          
            let check = state.customer.findIndex((ele)=>ele._id==action.payload._id)
            console.log("we are got called bro in the update succeful with  ")
           if(check !== -1)
            {
                state.customer[check] = action.payload
                console.log("data from inside",action.payload,check)
            }
           
           
            
        })
        .addCase(deletecustomer.fulfilled,(state,action)=>{
            
            state.customer = state.customer.filter(ele=>ele._id !==action.payload)
             console.log("at the delete with id",action.payload)  

        })

    }
})

export const { getonecustomer } = CustomerSlice.actions;
export default CustomerSlice.reducer;
