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
export const updateOrder = createAsyncThunk('todos/updateTodo', async ({ id, updatedTodo }) => {
  const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo),
  });
  return response.json();
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
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchorder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchorder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fetchorder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addorder.fulfilled, (state, action) => {
        // state.todos.push(action.payload);
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        // const updatedTodo = action.payload;
        // const existingTodo = state.todos.find(todo => todo.id === updatedTodo.id);
        // if (existingTodo) {
        //   existingTodo.text = updatedTodo.text;
        //   existingTodo.completed = updatedTodo.completed;
        // }
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        // state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export default DiscountSlice.reducer;
