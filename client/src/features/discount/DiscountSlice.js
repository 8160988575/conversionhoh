import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('http://localhost:5000/discount/getalldiscountdata');
  console.log("again fetching from database")
  return response.json();
});

// Add new todo
export const adddiscount = createAsyncThunk('todos/addTodo', async (text) => {
  console.log("text",text)
  const response = await fetch('http://localhost:5000/discount/adddiscount', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(text),
  });
  return response.json();
});

// Update a todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatetodo) => {
  console.log("updatetodo",updatetodo)
  const response = await fetch(`http://localhost:5000/discount/updatediscount`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatetodo),
  });
  
  return updatetodo;
});

// Delete a todo
export const deletediscount = createAsyncThunk('todos/deleteTodo', async (todo) => {
  await fetch(`http://localhost:5000/discount/deletediscount`, {
     method: 'DELETE' , 
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(todo),});

  return todo._id;
});

const DiscountSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    todo:{
      name: "",
      number: "",
      Discount_type: "",
      email: "",
      reference_name: "",
      reference_number: "",
      current_use: false,
      self_giving: false,      
    },
    status: 'idle',
    error: null,
  },
  reducers: {
    todohandle: (state,action) => {
      state.todo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(fetchTodos.pending, (state) => {
      //   state.status = 'loading';
      // })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      // .addCase(fetchTodos.rejected, (state, action) => {
      //   state.status = 'failed';
      //   state.error = action.error.message;
      // })
      .addCase(adddiscount.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
       
        let updatedTodo = action.payload;
        console.log("at the add case with before",updatedTodo)
        let existingTodo = state.todos.findIndex(todo => {
         if(todo._id === updatedTodo._id)
          { console.log("same id we got is",todo._id,updatedTodo._id)
            console.log(todo)
            return true
          }
        });
       state.todos[existingTodo] = updatedTodo;
      })
      .addCase(deletediscount.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      });
  },
});

export const { todohandle } = DiscountSlice.actions;

export default DiscountSlice.reducer;
