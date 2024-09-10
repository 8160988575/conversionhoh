// import { Navbar } from "./components/Navbar"

import { createBrowserRouter, Navigate, Outlet, RouterProvider } from 'react-router-dom';
import {Footer, Navbar} from './components'
import { Middleone } from './components/Middleone';
import { Yup } from './components/Settoken';
import { Login } from './components/Login';
import Navbar2  from './components/Navbar2';
import { Mainsearch } from './components/Mainsearch';




function App() {
  
  const token = localStorage.getItem('token')
  // const router = createBrowserRouter([
  //   {
  //     path:"/",
  //    element:<Navbar/>,
  //    children:[
  //      {
  //        path:"check",
  //        element:<Middleone/>,
  //      }
  //    ]

  //   }
  
  // ]);
  const Layout = () => (
    <>
      <Navbar />
      <div className="content">
        <Outlet /> {/* This renders the matching child route */}
      </div>
      {/* <Footer /> */}
    </>
  );



  const router = createBrowserRouter([
    {
      path: "/",
      element:  token?<Layout />: <Navigate to="/login" replace />, // Common layout for all routes
      children: [  
        {
          path: "/",
          element:<Mainsearch/>, // Public route
         
        },
        {
          path: "midone",
          element: <Middleone />, // Public route
         
        },
     
      ],
    },
    {
      path: "/login",
      element: <Login />, // Login page, does not include navbar and footer
    },
    {
      path: "/addremoveone",
      element: <Yup />, // Login page, does not include navbar and footer
    },
    {
      path: "/nav2",
      element: <Navbar2 />, // Login page, does not include navbar and footer
    },

  ]);

  return (
    <>
     <RouterProvider router={router}/>
     {/* <RouterProvider router={router}/>  */}
    </>
  )
}

export default App
