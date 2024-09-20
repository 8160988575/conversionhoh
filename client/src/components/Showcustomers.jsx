import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getallcustomer } from '../features/customer/CusotmerSlice';
import { useState } from 'react';
import './css/Showcustomercss.css'



export const Showcustomers = () => {

  

 
  // Goal: Manage Search and Pagination for firstTimeRead and CUD(ADD, Update , Delete)(API CALLS ,One main Variable Changes)
  // and also when it Called from Page

   //dependencies
   const dispatch = useDispatch()


  //useStates
  const {customer , status} = useSelector((state)=>state.customer)
  const [isOpen,setIsOpen] = useState(false)
  const [search,setsearch] = useState("")
 

  //useEffects

  //1. for fetching in starting only 
  useEffect(() => {    
    if(status === 'idle')
    {
    let yup = dispatch(getallcustomer())
    console.log("yup",yup)
    }

  

  }, [])

  return (
   <>
    <div className="table-container">
        <div className="my-4 flex justify-between">
          <input
            className="rounded-xl w-1/3 px-2 sm:text-xs md:text-lg "
            placeholder="Search here.."
            type="text"
            name="search"
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
          />

          <label onClick={() => setIsOpen(true)} className="btn text-white bg-slate-700">
            Add Customer
          </label>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("number")}>Number</th>
              <th onClick={() => handleSort("total_amount")}>Amount</th>
              <th onClick={() => handleSort("delivery_date")}>personal_note</th>
            </tr>
          </thead>
          <tbody>
            {customer?.map((row, index) => (
              <tr className='' key={index} onClick={ ()=>{dispatch(updateSingleOrder(row))
                setIsOpen(true)
              }}
              style={{ maxHeight: '50px'}}>
                <td className='custom-cell'>{row.name}</td>
                <td className='custom-cell'>{row.number}</td>
                <td className='custom-cell'>{row.email}</td>
                <td className='custom-cell'>{row.personal_note}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination my-10">
          <div className="join flex justify-center">{2}</div>
          {`current page is ${"2"}`}
        </div>
      </div>
   </>
  )
}
