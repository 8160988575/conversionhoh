import React, { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getallcustomer } from '../features/customer/CusotmerSlice';
import { useState } from 'react';
import './css/Showcustomercss.css'
import { Addcustomer } from './Addcustomer';



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
    setsearch("")
    }
  }, [])


  // let yupdata = useMemo(()=>{
  //   console.log("from memo")
  //   return customer.filter(item=> {
  //   console.log("fd")
  //   return Object.values(item).toString().includes(search)
    
  // })},[customer,search])
// search useEffect
  const [yupdata,setyupdata] = useState([])
useEffect(() => {
 
  setyupdata(customer.filter(item=>Object.values(item).toString().includes(search)))
  console.log("i am getting called")
  setCurrentPage(1)
}, [customer,search])


//paginationuseEffect
const [currentpage,setCurrentPage] = useState(1)
const [totalPages,settotalPages] = useState(0)
const [currentrows,setcurrentRows] = useState([])
const [rowperpage,setrowperpage] = useState(3)
useEffect(() => {
  // console.log(Math.ceil((yupdata.length/rowperpage)))
  settotalPages(Math.ceil((yupdata.length/rowperpage)))
  setcurrentRows(yupdata.slice(currentpage*rowperpage-rowperpage,currentpage*rowperpage))
   
}, [yupdata,currentpage])


// filtering for pagination



/*
summary:
1. [] -> main fetching --> take order
2. [Order,search] --> order ma search apply and take filtereddata(order2)
3. [order2,currentpage] --> search na output vada ma pagination 
*/
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
            {currentrows?.map((row, index) => (
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

        <div className="pagination my-10 flex align-middle">
          <div className="inline-flez join justify-around gap-2 bg-slate-500 text-yellow-50 font-bold m-auto ">{Array(totalPages).fill(null).map((_,index)=><p  onClick={()=>setCurrentPage(index+1)} className={`hover:cursor-pointer hover:bg-slate-600 rounded-xl p-4 px-9 ${currentpage === index+1 ? "bg-slate-600" : ""}`} key={index}>{index+1}</p>)}</div>
        
        </div>
       {isOpen && <Addcustomer setIsOpen={setIsOpen} isOpen />}
   

      </div>
   </>
  )
}
