import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const username = watch('username');
  const password = watch('password');

  const onSubmit = (data) => {
    console.log(data);

    if (!username && !password) {
      console.log("username",username)
      toast.error('Both fields are empty!');
    }
  };

  const handleerrors = (errors) => {
    console.log(errors)
    toast.error(errors.username?.message);
    toast.error(errors.password?.message);
  }

  return (
    <div className='bg-red-100 flex justify-center content-center items-center h-screen'>
      <div className='flex flex-col gap-6'>
        <p className='text-center font-bold underline'>Login here</p>

        {/* Toast container */}
        <ToastContainer />

        {/* Form start */}
        <form onSubmit={handleSubmit(onSubmit,handleerrors)} className='flex flex-col gap-6'>
          {/* Username field */}
          <input 
            type="text" 
            placeholder="Enter your username" 
            className="input input-bordered w-full max-w-xs"
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^\d+$/, // Ensure the username is numeric
                message: 'Username must be a number'
              }
            })}
          />
          {/* <p className={`font-bold ${errors.username ? 'text-red-500' : 'font-bold'}`}>
            {errors.username ? errors.username.message : "\u00A0"}
          </p> */}

          {/* Password field */}
          <input 
            type="password" 
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
          {/* <p className={`font-bold ${errors.password ? "text-red-500" : "font-bold"}`}>
            {errors.password ? errors.password.message : "\u00A0"}
          </p> */}

          {/* Submit button */}
          <p className='text-right font-bold'><Link to='/register'>Signup?</Link></p>
          <button type='submit' className='bg-slate-700 p-3 text-white rounded-2xl'>Submit</button>
        </form>
        {/* Form end */}
      </div>
    </div>
  );
};
