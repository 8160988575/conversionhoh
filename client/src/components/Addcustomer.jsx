import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";

export const Addcustomer = ({setIsOpen,isOpen}) => {
    
        useEffect(() => {
          // Function to handle the keydown event
          const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                console.log("hi")
              setIsOpen(false)
              
            }
          };
      
          // Adding the event listener
          window.addEventListener("keydown", handleKeyDown);
      
          // Cleanup the event listener on component unmount
          return () => {
            window.removeEventListener("keydown", handleKeyDown);
          };
        }, [])

        
  return (<>
    <div>
       <div className='absolute top-0 overflow-scroll w-full h-full m-0 p-0  flex justify-center items-center '>
        <div className='w-3/4 h-3/4 bg-blue-300'>
        <div className='flex justify-between m-3 text-xl'>
        <p onClick={()=>setIsOpen(!isOpen)}><MdCloseFullscreen /></p>
        <p><MdDelete /></p>
        </div>
        <p className='text-center mt-6'>Add Customer</p>
        <form action="" className='mt-5 flex flex-col gap-4 justify-center items-center'>
            <input className='w-2/3 p-2' type="text" placeholder='name' />
            <input className='w-2/3 p-2' type="text" placeholder='number'/>
            <input className='w-2/3 p-2' type="text" placeholder='email' /> 
            <button type='submit' className='bg-blue-600 w-2/3 p-2 font-medium text-white'>Add</button>
        </form>

        </div>
       </div>
      
    </div>
    </>
 )
}
