import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { adddiscount, deletediscount, fetchTodos, todohandle, updateTodo } from '../features/discount/DiscountSlice';
import { Bounce, toast } from 'react-toastify';
import { MdDelete } from "react-icons/md";
import { MdOutlineCloseFullscreen } from "react-icons/md";



export const Adddiscountmodal = ({isOpen,setIsOpen}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({name: "",
        number: "",
        Discount_type: "",
        email: "yup",
        reference_name: "",
        reference_number: "",
        current_use: false,
        self_giving: false,
        status:"",       
      });
    const { todo } = useSelector((state) => state.discount);



  
      const [defaultref, setdefaultref] = useState({
        name: "Owner",
        number: "1234567891",
      });
      const modalRef = useRef(null);

      useEffect(() => {    
        todo && (
        setFormData({
        name: todo.name,
        number: todo.number,
        Discount_type: todo.Discount_type,
        email: todo.email,
        reference_name: todo.reference_name,
        reference_number: todo.reference_number,
        current_use: todo.current_use,
        self_giving:todo.self_giving,
        status:todo.status,
        _id:todo._id,
        }))
     
    }, [todo])
    
   
      const handleSubmit = async (e) => {        
       
        e.preventDefault();
      // for the time and date
        Date.prototype.today = function () { 
          return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
      }
       // For the time now
      Date.prototype.timeNow = function () {
           return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
      }
      var newDate = new Date();
    
      let finalrepond = {
        ...formData,
        addingdate:newDate.today(),
        addingtime:newDate.timeNow(),
        status:"notused",
        did:todo.name?todo.did: Math.floor(Math.random() * 1000000000)
                
      }
      if (formData.current_use) {
        finalrepond = {...finalrepond,usingtime:finalrepond.addingtime,usingdate:finalrepond.addingdate}
    
        
      }   
        console.log("finalrepond",finalrepond); // Here, you can handle the form submission, such as sending the data to the server
      let  finaldata;
        
        //  for the updates and add fresh 
        if (todo.name) {
            console.log("finalrepond update",finalrepond)
          finaldata = dispatch(updateTodo(finalrepond));
             
         }
        else
        {
          finaldata=  dispatch(adddiscount(finalrepond));

        }

        console.log("updated data from console",await finaldata);
        // dispatch(fetchTodos());
        setFormData({
          name: "",
          number: "",
          Discount_type: "",
          email: "",
          reference_name: "",
          reference_number: "",
          current_use: false,
          self_giving: false,
        });
        setIsOpen(false);
        toast.success('Discount Added Sucessfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          });
    
      };


      const handleChange = (e) => {
        const { id, value } = e.target; // Destructure to get field id and its value
        setFormData((prevData) => ({
          ...prevData, // Spread the previous data
          [id]: value, // Update the specific field
        }));
    
        // console.log({...formData,[id]: value});
      };
    
  return (
    <div>
           { isOpen && <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div
            ref={modalRef}
            className="bg-white rounded-lg md:w-1/3 h-3/4 p-6 relative shadow-lg overflow-y-auto scrollbar-hide"
          >
           <div className='flex justify-between'>
            <p className="pointer-cursor" onClick={() => {
                setIsOpen(false)
                dispatch(todohandle({}))
            }}><MdOutlineCloseFullscreen /></p>
            <p onClick={()=>{
                dispatch(deletediscount(todo))
                setIsOpen(false)
                }}><MdDelete /></p>
           </div>
      <form onSubmit={handleSubmit} className="mx-2 my-3 md:mx-0">
        <div>
       
        </div>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="John Doe"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Number
          </label>
          <input
            type="text"
            id="number"
            value={formData.number}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="1234567890"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="discount_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Discount Type
          </label>
          <input
            type="text"
            id="Discount_type"
            value={formData.Discount_type}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Discount Type"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Email
          </label>
          <input
            type="text"
            id="email"
            value={formData.email || "hi"}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>

        <div className="flex gap-3">
          <input
            type="checkbox"
            id="currentuse"
            value={formData.current_use}
            onChange={() =>{
              setFormData({ ...formData, current_use: !formData.current_use })

            }}
            className="shadow-sm mb-2"
            placeholder="CurrentUse"
          />{" "}
          <label
            htmlFor="refname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Currently Use
          </label>
        </div>

        <div className="flex gap-3">
          <input
            type="checkbox"
            id="selfgiving"
            value={formData.self_giving}
            onChange={() => {
              setFormData({
                ...formData,
                self_giving: !formData.self_giving,
                reference_name: !formData.self_giving ? defaultref.name : "",
                reference_number: !formData.self_giving
                  ? defaultref.number
                  : "",
              });
            }}
            className="shadow-sm mb-2"
            placeholder="Self Giving"
          />{" "}
          <label
            htmlFor="refname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Self Giving
          </label>
        </div>

        <div className="mb-5">
          <label
            htmlFor="reference_name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reference Name
          </label>
          <input
            type="text"
            id="reference_name"
            value={formData.reference_name}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Reference Name"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="reference_number"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Reference Number
          </label>
          <input
            type="text"
            id="reference_number"
            value={formData.reference_number}
            onChange={handleChange}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Reference Number"
            required
          />
        </div>

 
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Register new account
          </button>
        </div>
      </form>
      </div>
      </div>
      </>}
    </div>
  )
}
