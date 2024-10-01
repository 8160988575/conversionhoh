import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallrequests } from '../../features/register/RegisterSlice'
import { Link } from 'react-router-dom'

export const ApproveRegistration = () => {

    const {hohrequests} = useSelector((state) => state.hoh_req)
  
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getallrequests()) 
    
    }, [])
    
    useEffect(() => {
  
        console.log("hohrequests",hohrequests)

    }, [hohrequests])
    
    const [search, setsearch] = useState("")
    const [isOpen, setisOpen] = useState(false)
    const searchhandle = (e) => {}
    const getbuton = ""

    return (
      <div>
        {/* <ToastContainer /> */}
        <div className="table-container">
          <p className='w-full text-center font-bold'>Requests for HOH_Entry</p>
          <div className="my-4 flex justify-between">
            <input
              className="rounded-xl w-1/3 px-2 sm:text-xs md:text-lg "
              placeholder="Search here.."
              type="text"
              name="search"
              value={search}
              onChange={searchhandle}
            />
  
            <label onClick={() => setisOpen(true)} className="btn text-white bg-slate-700">
             <Link to='/register'>Add Request</Link> 
            </label>
          </div>
          <table className="custom-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>Name</th>
                <th onClick={() => handleSort("number")}>Number</th>
                <th onClick={() => handleSort("Password")}>password</th>
                <th onClick={() => handleSort("status")}>Status</th>
                <th onClick={() => handleSort("address")}>Address</th>
                <th onClick={() => handleSort("bname")}>bname</th>
              </tr>
            </thead>
            <tbody>
              {hohrequests?.map((row, index) => (
                <tr key={index} onClick={()=>{
                  console.log("row",row)
                  dispatch(todohandle(row))
                  setIsOpen(true)
                }}>
                  <td>{row.name}</td>
                  <td>{row.number}</td>
                  <td>{row.password}</td>
                  <td>{row.status}</td>
                  <td>{row.address}</td>
                  <td>{row.businessname}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="pagination my-10">
            {/* <div className="join flex justify-center">{...getbuton()}</div> */}
            {/* {`current page is ${currentPage}`} */}
          </div>
        </div>
        {isOpen && (
          <p className="fixed top-10 right-10 bg-white z-500" onClick={() => setIsOpen(false)}>close</p>
        )}
  
         {/* <Adddiscountmodal isOpen={isOpen} setIsOpen={setIsOpen}/> */}
  
      </div>
    );
}
