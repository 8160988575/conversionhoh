import React, { useEffect, useState } from "react";
import API from "../../api.js";

export const Mainsearch = () => {

 const [discountdata, setdiscountdata] = useState([])
 const [orderdata, setorderdata] = useState("second")

 useEffect(() => {
  const getdata = async () => {
    try {
        const response = await fetch("http://localhost:5000/getdiscountdata")
        // const response = await  API.get('/getdiscountdata')
        const data = await response.json()
        setdiscountdata(data)
        console.log(data)
        
    } catch (error) {
         console.log("error we got",error)
    }
 
  }
  getdata()
 }, [])

 const usethisdiscount = async(id) => {
   const updatedone = await fetch(`http://localhost:5000/usediscount/${id}`, {
     method: "PUT"})
     let  jsondata = await updatedone.json()
    //  setdiscountdata(updatedone)
    setdiscountdata(jsondata)
    console.log(jsondata)
   
 }
 

  return (
    <>
      <div className="container flex flex-col items-center gap-4 pb-60">
        <div className="search my-10">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Search" />
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
      </div>
    </>
  );
};


