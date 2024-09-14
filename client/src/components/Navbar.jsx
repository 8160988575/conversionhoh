import React, { useState } from "react";
import './css/navcss.css'
import { Link } from "react-router-dom";


const Navbar = () => {
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
 
    const yup = <>
    <li><Link to='/'>Order's</Link></li>
    <li><Link to='/'>Customer's</Link></li>
    <li><Link to='/Discountshow' onClick={toggleDropdown}>Discount's</Link></li>
    <li><Link to='/contactus'>ConactUs</Link></li>
    <li><a>Login/Logout</a></li> </>

  const [dropdownOpen, setDropdownOpen] = useState(false);
  
 

  return (
    <div>
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to='/' className="btn btn-ghost text-xl">BusinessName</Link>
      </div>
      <div className="flex-none">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
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
  </div>
  );
};

export {Navbar};
