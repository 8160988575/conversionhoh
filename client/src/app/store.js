import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoSlice from '../features/todo/todoSlice';
import DiscountSlice from '../features/discount/DiscountSlice';
import OrderSlice from '../features/orders/OrderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    yuptodos:todoSlice,
    discount:DiscountSlice,
    order:OrderSlice
    
  },
});



// export const store = configureStore({
//   reducer:counterReducer,
//  
// });

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
