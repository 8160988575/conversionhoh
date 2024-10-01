import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import todoSlice from '../features/todo/todoSlice';
import DiscountSlice from '../features/discount/DiscountSlice';
import OrderSlice from '../features/orders/OrderSlice';
import CusotmerSlice from '../features/customer/CusotmerSlice';
import RegisterSlice from '../features/register/RegisterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    yuptodos:todoSlice,
    discount:DiscountSlice,
    order:OrderSlice, 
    customer:CusotmerSlice   ,
    hoh_req:RegisterSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })



// export const store = configureStore({
//   reducer:counterReducer,
//  
// });

// export const store = configureStore({
//   reducer: {
//     counter: counterReducer,
//   },
// });
