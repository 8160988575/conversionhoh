import React, { useState } from 'react';

const AddDiscount = () => {
  // Define a state variable with the form fields
 
  const [defaultref, setdefaultref] = useState({
    name:"Owner",
    number:"1234567891",
  })

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    discount_type: '',
    email: '',
    reference_name: '',
    reference_number: '',
    current_use:false,
    self_giving:false,
  });


  

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target; // Destructure to get field id and its value
    setFormData((prevData) => ({
      ...prevData, // Spread the previous data
      [id]: value, // Update the specific field
    }));

    // console.log({...formData,[id]: value});
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formData); // Here, you can handle the form submission, such as sending the data to the server
    const finaldata = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/discount/adddiscount`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token')
      },
      body: JSON.stringify(formData),
    })
    console.log(await finaldata.json())

  };

  return (
    <form onSubmit={handleSubmit} className="mx-9 my-7 md:mx-72">
      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
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
        <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Number</label>
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
        <label htmlFor="discount_type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Type</label>
        <input
          type="text"
          id="discount_type"
          value={formData.discount_type}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="Discount Type"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <input
          type="text"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          placeholder="name@flowbite.com"
          required
        />
      </div>

      <div className='flex gap-3'>
       
      <input
          type="checkbox"
          id="currentuse"
          value={formData.current_use}
          onChange={()=>setFormData({...formData,current_use:!formData.current_use})}
          className="shadow-sm mb-2"
          placeholder="CurrentUse"  
        />   <label htmlFor="refname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Currently Use</label>
    
      </div>

      
      <div className='flex gap-3'>
       
      <input
          type="checkbox"
          id="selfgiving"
          value={formData.self_giving}
          onChange={()=>{setFormData({...formData,self_giving:!formData.self_giving,reference_name:!formData.self_giving?defaultref.name:"",reference_number:!formData.self_giving?defaultref.number:""})
        }}
          className="shadow-sm mb-2"
          placeholder="Self Giving"  
        />   <label htmlFor="refname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Self Giving</label>
    
      </div>

      <div className="mb-5">
        <label htmlFor="reference_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reference Name</label>
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
        <label htmlFor="reference_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Reference Number</label>
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

      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>
        </label>
      </div>

      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Register new account
      </button>
    </form>
  );
};

export {AddDiscount};
