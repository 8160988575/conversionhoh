import React, { useState } from 'react'
import { Practicepage2 } from './Practicepage2';

export const Practicepage = () => {

 let arr = [1,2,3,4,5,6]

 let total = 5;

 let all = () => {
  let ff=[];
    for(let index = 0; index < 5; index++) {
        ff.push(4)   
    }
 }
 const paragraphs = Array(total).fill(null).map((_, index) => (
  <p key={index}>{index+1}</p>
));

//   return (
//     <div className='bg-red-300 w-1/2 flex items-center justify-around flex m-auto mt-4 rounded-2xl shadow-black shadow-2xl'>
//      {Array(total).fill(null).map((_, index) => {
//     return (<div className='flex gap-1'><p key={index}>{index + 1}</p><p>hi</p></div>)
    
// })}
//     </div>
//   )
const [isopen, setisopen] = useState(false)
return ( <>
  <div className='bg-red-300 w-1/3 flex items-center justify-around flex m-auto mt-4 rounded-2xl shadow-black shadow-2xl'>
   {Array(total).fill(null).map((_, index) => <p key={index}>{index + 1}</p>)}
  
  </div>
  <button onClick={()=>setisopen(c=>!c)} className='bg-slate-200 p-4 mx-auto absolute right-5 top-20 cursor-pointer active:bg-violet-500 focus:bg-violet-300'>Add Something</button>
  {isopen && <Practicepage2 setisopen/>}
  </>
)
}
