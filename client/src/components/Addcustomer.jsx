import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { MdDelete } from "react-icons/md";
import { MdCloseFullscreen } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addcustomer, deletecustomer, updatecustomer } from '../features/customer/CusotmerSlice';


export const Addcustomer = ({setIsOpen,isOpen}) => {
  const {singlecustomer} = useSelector((state)=>state.customer)

  const dispatch = useDispatch();

    const {reset, register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async(data) => {   

     if (singlecustomer) {
      const check = dispatch(updatecustomer(data))      
     }
     else
     {
      const check =dispatch(addcustomer({...data,cuid:"u r cuid"}))
      console.log("updation mathi",check)
     }
     setIsOpen(false)

     };

     useEffect(() => {
      reset(singlecustomer)
     }, [singlecustomer])
     
        useEffect(() => {
          // reset()
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
       {/* <div className='absolute top-0  overflow-hidden flex justify-center items-center '> */}
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 md:w-96 rounded-xl h-3/4 overflow-scroll bg-blue-300 overflow-scroll pb-10'>
        <div className='flex justify-between m-3 mb-6 text-xl'>
        <p onClick={()=>setIsOpen(!isOpen)}><MdCloseFullscreen /></p>
        <p className='text-center text-base mt-4'>Add Customer</p>
        <p onClick={()=>{dispatch(deletecustomer(singlecustomer?._id))
          setIsOpen(!isOpen)
        }}><MdDelete /></p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className='text-center mt-5 flex flex-col gap-4 justify-center items-center'>
        <input className='p-2 rounded-lg w-3/4' type="text" placeholder='name' {...register("name",{required:"name is required"})} />
        <input className='p-2 rounded-lg w-3/4' type="text" placeholder='number' {...register("number",{required:"number is required"})} />
        <input className='p-2 rounded-lg w-3/4' type="text" placeholder='email' {...register("email",{required:"email is required"})} />
        <select  className='bg-blue-600 rounded-lg w-3/4 p-2 text-white' {...register("status")}> 
            <option value="as">as</option>
            <option value="bs">bs</option>
            <option value="cs">cs</option>
            <option value="ds">ds</option>
        </select>
        <select  className='bg-blue-600 rounded-lg w-3/4 p-2 text-white' {...register("age")}> 
            <option value="mt">mt</option>
            <option value="my">my</option>
            <option value="mf">mf</option>
            <option value="ft">ft</option>
            <option value="fy">fy</option>
            <option value="ff">ff</option>
        </select>
        <input className='p-2 rounded-lg w-3/4' type="text" placeholder='address' {...register("address")} />
        <textarea rows={4} className='rounded-lg p-2 w-3/4' placeholder='Personal_note' {...register("personal_note")} />

        <button type='submit' className='bg-blue-600 w-2/3 p-2 font-medium text-white'>Add</button>
        </form>

        </div>
       </div>
      
    {/* </div> */}
    </>
 )
}
