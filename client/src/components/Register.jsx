import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash, FaMailBulk } from 'react-icons/fa';
import { addregistrationreq } from '../features/register/RegisterSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Register = () => {

  const dispatch = useDispatch();
  const {addsucess,error} = useSelector((state) => state.hoh_req)
    const defaultValues = {
        name: 'John Doe',
        username: '9876543210', // Mobile number
        email:'yup@mail.com',
        businessName: 'Doe Enterprises',
        businessAddress: '123 Business Street, City',
        referredBy: 'Jane Doe',
        password: 'Password123!', // Should match the validation rules
        repeatPassword: 'Password123!' // Should match the password
      };
      
  const { register, handleSubmit, formState: { errors }, watch , reset } = useForm({
    defaultValues: defaultValues});

//   useEffect(() => {
//    reset(defaultValues)  
//   }, [])
  
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const password = watch('password');
  const repeatPassword = watch('repeatPassword');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRepeatPasswordVisibility = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const onSubmit = async(data) => {
    console.log(data);
    const response =await dispatch(addregistrationreq(data))
    console.log("response",response)
    reset({
      name: '',
      username: '',
      businessName: '',
      businessAddress: '',
      referredBy: '',
      password: '',
      repeatPassword: '',
      email:'',
    });
   
    // reset({});
  };


  useEffect(() => {
  
 console.log("first time called")
  }, [])
  

useEffect(() => {

  if (addsucess) {
    toast.success('Registration Successful');
  }
  if (error) {
 
    toast.error(error.message);
  }
}, [addsucess,error])

  const handleErrors = (errors) => {
    console.log(errors);
    Object.values(errors).forEach(error => {
      toast.error(error?.message);
    });
  };

  return (
    <div className='bg-red-100 flex justify-center content-center items-center  pb-80 pt-20'>
      <div className='flex flex-col gap-6'>
        <p className='text-center font-bold underline'>Register here</p>

        {/* Toast container */}
        <ToastContainer />

        {/* Form start */}
        <form onSubmit={handleSubmit(onSubmit, handleErrors)} className='flex flex-col gap-6'>

          {/* Your Name field */}
          <input 
            type="text" 
            placeholder="Enter your name" 
            className="input input-bordered w-full max-w-xs"
            {...register('name', { required: 'Name is required' })}
          />

          {/* Mobile Number (Username) field */}
          <input 
            type="text" 
            placeholder="Enter your mobile number" 
            className="input input-bordered w-full max-w-xs"
            {...register('username', {
              required: 'Mobile number is required',
              pattern: {
                value: /^\d+$/, // Ensure the username is numeric
                message: 'Mobile number must be numeric'
              }
            })}
          />

          {/* Business Name field */}
          <input 
            type="text" 
            placeholder="Enter your business name" 
            className="input input-bordered w-full max-w-xs"
            {...register('businessName', { required: 'Business name is required' })}
          />

          {/* email  field */}
            <input 
            type="email" 
            placeholder="Enter your email" 
            className="input input-bordered w-full max-w-xs"
            {...register('email', { required: 'email is required' })}
           />

          {/* Business Address field */}
          <input 
            type="text" 
            placeholder="Enter your business address" 
            className="input input-bordered w-full max-w-xs"
            {...register('businessAddress', { required: 'Business address is required' })}
          />

          {/* Referred By field */}
          <input 
            type="text" 
            placeholder="Referred by" 
            className="input input-bordered w-full max-w-xs"
            {...register('referredBy')}
          />

          {/* Password field with eye icon */}
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password" 
              className="input input-bordered w-full max-w-xs"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 10,
                  message: 'Password must be at least 10 characters'
                },
                validate: (value) => {
                  if (!/[a-z]/.test(value)) {
                    return 'Password must contain at least one lowercase letter';
                  } else if (!/[A-Z]/.test(value)) {
                    return 'Password must contain at least one uppercase letter';
                  } else if (!/\d/.test(value)) {
                    return 'Password must contain at least one number';
                  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                    return 'Password must contain at least one special character';
                  }
                  return true;
                }
              })}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button type="button" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Repeat Password field with eye icon */}
          <div className="relative">
            <input 
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat your password" 
              className="input input-bordered w-full max-w-xs"
              {...register('repeatPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === password || 'Passwords do not match'
              })}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button type="button" onClick={toggleRepeatPasswordVisibility}>
                {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <p className='text-right font-bold'><Link to='/register'>Login?</Link></p>
          <button type='submit' className='bg-slate-700 p-3 text-white rounded-2xl'>Submit</button>
        </form>
        {/* Form end */}
      </div>
    </div>
  );
};
