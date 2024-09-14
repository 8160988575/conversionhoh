import React, { useEffect, useState } from "react";
import API from "../../api.js";
import './css/CssMainsearch.css'
import { Link } from "react-router-dom";



export const Mainsearch = () => {

const [searchdata, setsearchdata] = useState("")
 const [discountdata, setdiscountdata] = useState([])
 const [fixdiscountdata, setfixdiscountdata] = useState([])
 const [orderdata, setorderdata] = useState("second")

 useEffect(() => {
  const getdata = async () => {
    try {
        // const response = await fetch("http://localhost:5000/discount/getdiscountdata")
        const response = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/discount/getalldiscountdata`)
        // const response = await  API.get('/getdiscountdata')
        const data = await response.json()
        setdiscountdata(data)
        setfixdiscountdata(data)
        console.log(data)
        
    } catch (error) {
         console.log("error we got",error)
    }
 
  }
  getdata()
 }, [])
 
 useEffect(() => {
   if(searchdata.length > 0){
     const getdata = async () => {
       try {
        console.log("fixdiscountdata",fixdiscountdata)
         const samedata = fixdiscountdata.filter((item=>item.number?.toString()?.toLowerCase()?.includes(searchdata.toLowerCase()) ||item.Discount_type?.toLowerCase()?.includes(searchdata.toLowerCase())))
         setdiscountdata(samedata)
           
       } catch (error) {
            console.log("error we got",error)
       }
 
     }
     getdata()
   }
   else{  
     setdiscountdata(fixdiscountdata)
   }
 
 }, [searchdata])
 

 const usethisdiscount = async(id) => {
  //  const updatedone = await fetch(`http://localhost:5000/usediscount/${id}`, {
   const updatedone = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/usediscount/${id}`, {
     method: "PUT"})
     let  jsondata = await updatedone.json()
    //  setdiscountdata(updatedone)
    setdiscountdata(jsondata)
    setfixdiscountdata(jsondata)
    console.log(jsondata)
   
 }

 const yup = <>
 <li><a>Order's</a></li>
 <li><a>Customer's</a></li>
 <li><Link to='/Discountshow'>Discount's</Link></li>
 <li><Link to='/contactus'>ConactUs</Link></li>
 <li><a>Login/Logout</a></li> </>

const [dropdownOpen, setDropdownOpen] = useState(false);

 
 const toggleDropdown = () => {
  setDropdownOpen(!dropdownOpen);
};

  return (
    <>
      <div className="container flex flex-col items-center gap-4 pb-60 relative">
        <div className="search my-10">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" style={{}} onChange={(e)=>setsearchdata(e.target.value)} value={searchdata} className="atmainsearch" placeholder="Search" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="Discounts min-w-80">
          <ul className="menu bg-base-200 rounded-box">
           {
            discountdata.map((data)=>{
              return(
                <li key={data._id}>
                  <a onClick={()=>usethisdiscount(data._id)}>{data.number+"-"+data.Discount_type}</a>
                </li>
              )
            })
           }
          </ul>
        </div>
        <div className="Orders min-w-80">
          <ul className="menu bg-base-200 rounded-box ">
            <li>
              <a> Item 1Item 1Item 1Item 1Item 1Item 1Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
            <li>
              <a>Item 3</a>
            </li>
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
         
          </ul>
        </div>
        <div className="flex-none fixed right-10 bottom-10">
  <div className="dropdown dropdown-end">
    <div
      tabIndex={1}
      role="button"
      className="btn btn-ghost btn-circle avatar md:mx-20"
      onClick={toggleDropdown} // Handle the click event
    >
      <div className="w-10 rounded-full">
        <img
          alt="Tailwind CSS Navbar component"
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        />
      </div>
    </div>

    {dropdownOpen && (
      <ul
        tabIndex={1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mb-3 w-52 p-2 shadow"
        style={{ bottom: '0%', marginBottom: '1rem',right:'65%' }} // Adjust positioning
      >
        {/* <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li> */}
        {yup}
      </ul>
    )}
  </div>
</div>

      </div>
    </>
  );
};


