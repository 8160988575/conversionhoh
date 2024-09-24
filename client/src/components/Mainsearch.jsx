import React, { useEffect, useState } from "react";
import API from "../../api.js";
import './css/CssMainsearch.css'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos } from "../features/discount/DiscountSlice.js";
import { fetchorder } from "../features/orders/OrderSlice.js";
import { currentworkingwith, getallcustomer } from "../features/customer/CusotmerSlice.js";



export const Mainsearch = () => {

 
  const [discountdata, setdiscountdata] = useState([])
  const [fixdiscountdata, setfixdiscountdata] = useState([])
  const [orderdata, setorderdata] = useState([])
  const [customerdata, setcustomerdata] = useState([])
  const [workingwithcustomer,setworkingwithcustomer] = useState([]) 
 

  const { todos } = useSelector((state) => state.discount)
  const { order } = useSelector((state) => state.order)
  const { customer,currentworkingcustomer } = useSelector((state) => state.customer)

  const [searchdata, setsearchdata] = useState(currentworkingcustomer?.number || "")
  const loadcustomer = () => {

     const gc = customer.filter((ele,index)=>ele.number == searchdata)
     if (gc[0]) {
        dispatch(currentworkingwith(gc[0]))
     }
     else
     {
      console.log("here at the without matching part")
      dispatch(currentworkingwith({number:searchdata}))
     }

  }
  
  const dispatch = useDispatch()
  useEffect(() => {
    const getdata = async () => {
      try {

        await dispatch(fetchTodos())
        await dispatch(fetchorder())
        await dispatch(getallcustomer())


      } catch (error) {
        console.log("error we got", error)
      }

    }
    getdata()
  }, [])


  useEffect(() => {
    console.log("setting updat", todos)
    setdiscountdata(todos)
  }, [todos])

  useEffect(() => {
    console.log(order)
    setorderdata(order)
  }, [order])

  useEffect(() => {
    console.log("customer",customer)
    setcustomerdata(customer)
  }, [customer])


  useEffect(() => {

    if (searchdata.length > 0) {

      const getdata = async () => {
        try {
        
          const samedata = todos.filter((item => item.number?.toString()?.toLowerCase()?.includes(searchdata.toLowerCase()) || item.Discount_type?.toLowerCase()?.includes(searchdata.toLowerCase())))
          setdiscountdata(samedata)

          const samedataorder = order.filter(data => Object.values(data).toString().includes(searchdata))
          setorderdata(samedataorder)

          const samedatacustomer = customer.filter(data => Object.values(data).toString().includes(searchdata))
          setcustomerdata(samedatacustomer)


        } catch (error) {
          console.log("error we got", error)
        }

      }
      getdata()
    }
    else {
      setdiscountdata(todos)
      setorderdata(order)
      setcustomerdata(customer)
    }

  }, [searchdata])


  const usethisdiscount = async (id) => {
    //  const updatedone = await fetch(`http://localhost:5000/usediscount/${id}`, {
    const updatedone = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/usediscount/${id}`, {
      method: "PUT"
    })
    let jsondata = await updatedone.json()
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
      <div className="container mx-auto flex flex-col items-center gap-4 pb-60 relative">
        <div className="search my-10 flex gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" style={{}} onChange={(e) => {
              
              setsearchdata(e.target.value)}} value={searchdata} className="atmainsearch" placeholder="Search" />
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
          <button onClick={()=>{!currentworkingcustomer?.number ? loadcustomer(): dispatch(currentworkingwith({}))}} className="bg-blue-700 p-3 rounded-xl text-white">{(currentworkingcustomer?.number)? "unload":"Load"}</button>
          <button onClick={()=>{dispatch(currentworkingwith({}))}}>ul</button>
        </div>
        <div className="w-80 md:w-2/3 Discounts max-h-72 md:max-h-80  rounded-xl overflow-auto">
          <ul className="w-full menu md:px-9 md:py-5 bg-base-200 rounded-box pb-8">
  <div className="stats shadow ">
  <div className="stat">
    <div className="stat-title">CurrentUser:{currentworkingcustomer?.number}</div>
    {/* <div className="stat-value">89,400</div>
    <div className="stat-desc">21% more than last month</div> */}
  </div>
</div>
            <li className="text-center mb-2 font-bold text-xl">Customer's</li>
            {
              customerdata.map((data) => {
                return (
                  <li key={data._id}>
                    <a onClick={() => usethisdiscount(data._id)}>{data.name + "-" + "-" + data.number}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className="w-80 md:w-2/3 Discounts max-h-72 md:max-h-80  rounded-xl overflow-auto">
          <ul className="w-full menu md:px-9 md:py-5 bg-base-200 rounded-box pb-8">
            <li className="text-center mb-2 font-bold text-xl">Discount's</li>
            {
              discountdata.map((data) => {
                return (
                  <li key={data._id}>
                    <a onClick={() => usethisdiscount(data._id)}>{data.number + "-" + "-" + data.status}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className="w-80 md:w-2/3 Discounts max-h-72 md:max-h-80  rounded-xl overflow-auto">
          <ul className="w-full menu md:px-9 md:py-5 bg-base-200 rounded-box pb-8">
            <li className="text-center mb-2 font-bold text-xl">Order's</li>
            {
              orderdata.map((data) => {
                return (
                  <li key={data._id}>
                    <a onClick={() => usethisdiscount(data._id)}>{data.number + "-" + data.name}</a>
                  </li>
                )
              })
            }
          </ul>
        </div>

        {/* <div className="Orders min-w-80 max-h-96 overflow-scroll">
          <ul className="menu bg-base-200 rounded-box">
          <li className="text-center mb-2 font-bold text-xl">Order's</li>
           {
            orderdata.map((data)=>{
              return(
                <li key={data._id}>
                  <a onClick={()=>usethisdiscount(data._id)}>{data.number+"-"+data.name}</a>
                </li>
              )
            })
           }
          </ul>
        </div> */}
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
                style={{ bottom: '0%', marginBottom: '1rem', right: '65%' }} // Adjust positioning
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


