import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch todos
export const fetchorder = createAsyncThunk('order/fetchorder', async () => {
  const response = await fetch('http://localhost:5000/order/getallorder');
  console.log("again fetching from database")
  return response.json();
});

// Add new todo
export const addorder = createAsyncThunk('order/addorder', async (text) => {
  const response = await fetch('http://localhost:5000/order/addorder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(text),
  });
  return response.json();
});

// Update a todo
export const updateOrder = createAsyncThunk('order/updateOrder', async ({id,data}) => {
  const response = await fetch(`http://localhost:5000/order/updateorder`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({id,data}),
  });
  const result = await response.json()
  return {response:result,id,data}
});

// Delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await fetch(`http://localhost:5000/api/todos/${id}`, { method: 'DELETE' });
  return id;
});

const DiscountSlice = createSlice({
  name: 'order',
  initialState: {
    order: [],
    singleorder:{},
    status: 'idle',
    error: null,
  },
  reducers: {
    updateSingleOrder: (state, action) => {
      state.singleorder = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchorder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchorder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("sucess")
        state.order = action.payload;
      })
      .addCase(fetchorder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addorder.fulfilled, (state, action) => {
        // state.todos.push(action.payload);
      })
      // .addCase(updateOrder.fulfilled, (state, action) => {
      //   console.log("updateorder fulfilled")
      //   const {_id,data} = action.payload;
      //   console.log("data",data,id)
      //   const existingTodoIndex = state.order.findIndex(todo => todo.id === _id);
      //   if (existingTodoIndex) {
      //     console.log("existingTodoIndex",existingTodoIndex)
      //     state.order[existingTodoIndex] = data;
      //   }
      // })
      .addCase(updateOrder.fulfilled, (state, action) => {
        console.log("updateOrder fulfilled");
        const { id, data } = action.payload; // Use 'id' from payload
        console.log("data", data, id);
      
        // Find the index of the existing order by `id`
        const existingTodoIndex = state.order.findIndex((todo) => todo._id === id);
      
        // Ensure that the index is not -1 (i.e., item was found)
        if (existingTodoIndex !== -1) {
          console.log("existingTodoIndex", existingTodoIndex);
          state.order[existingTodoIndex] = data; // Update the existing order
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        // state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export const { updateSingleOrder } = DiscountSlice.actions;
export default DiscountSlice.reducer;
