import React from 'react'
import { decrement, increment, incrementByAmount } from '../features/counter/counterSlice'
import { useDispatch, useSelector } from 'react-redux'


export const CounterImpliment = () => {
    const count = useSelector((state) => state.counter);    
    const dispatch = useDispatch();
  return ( <>
    <div className="card bg-base-100 w-100 shadow-xl m-10 flex items-center justify-center">      
    <h1 className='flex bg-purple-400 px-8 py-2 rounded-full mb-5'> {count.value}</h1>
    <h1 className='flex bg-purple-400 px-8 py-2 rounded-full'> {count.totalchanges}</h1>
    <button className='bg-slate-700 p-2 m-5 text-white' onClick={() => dispatch(increment())}>Increment</button>
    <button className='bg-slate-700 p-2 m-5 text-white' onClick={() => dispatch(decrement())}>Decrement</button>
    <button className='bg-slate-700 p-2 m-5 text-white' onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
  </div>
  </> )
}
