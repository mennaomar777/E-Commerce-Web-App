import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

export default function ResetPass() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [newPass, setnewPass] = useState('');
    const navigate = useNavigate();
    let [email, setEmail] = useState('')

    async function handleReset(e) {
        e.preventDefault(); 
         email = localStorage.getItem('email');
        if (!email) {
            setMessage('Email not found. Please try again.');
            setIsLoading(false);
            return;
          }

        try {
            setIsLoading(true);
            const res = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
                email:email,
                newPassword:newPass,
            });
            console.log(res);
            setTimeout(() => {
                navigate('/Login'); 
              }, 2000);        
        } catch (error) {
            console.error('Error:', error);
            setMessage('Something went wrong. Please try again.');
        } finally{
            setIsLoading(false);
        }
    }

  return (
    <>
    {isLoading && (
      <div className="w-full flex justify-center items-center bg-white bg-opacity-70 min-h-[70vh]">
        <FadeLoader color="green" />
      </div>
    )}

    <div className="max-h-screen flex justify-center items-center py-4">
      <div className="bg-white p-8 rounded-lg w-[350px] mx-4 max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-200 shadow-lg mt-10">
        <div className="text-center">
          <div className="inline-flex justify-center items-center w-[50px] h-[50px] rounded-full bg-green-200 p-6 outline-8 outline-green-100/60 mb-3">
            <i className="fa-solid fa-lock text-2xl text-green-600"></i>
          </div>
          <h2 className="text-2xl font-bold mb-1">Reset Password</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Please enter your new password.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4 text-center">
          <div className="text-left">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter Your Email:
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="newPass"
                onChange={(e) => setnewPass(e.target.value)}
                value={newPass}
                id="newPass"
                className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="newPass"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Enter New Password:
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-[50%] my-3 cursor-pointer bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {message && (
          <p className="text-center mt-4 text-sm text-green-600">{message}</p>
        )}
        <div className="text-center my-2 ">
          <Link to="/Login" className="text-center text-sm">
            <div>
              <i className="fa-solid fa-arrow-left text-gray-500 "></i>{' '}
              <span className="text-gray-500">Back to log in</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </>
  );
}
