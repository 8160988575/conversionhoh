import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name:'todos',
    initialState:{
        todos:[{email:"email",username:"username",password:"password",id:nanoid()}]
    },
    reducers:{
        addtodo:(state,argu)=>{
            state.todos.push(argu.payload)
        },
        // deletetodo:(state,argu)=>{
        //     state.todos = state.todos.filter(item=>item.id!=argu.payload)
        // },

    }
})

export const {addtodo} = todoSlice.actions;

export default todoSlice.reducer;