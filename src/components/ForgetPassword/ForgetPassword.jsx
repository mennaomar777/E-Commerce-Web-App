import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  async function forgetPass(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email }
      );
      localStorage.setItem('email', email);
      setMessage('A reset link has been sent to your email.');
      setTimeout(() => {
        navigate('/VerifyCode');
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong. Please try again.');
    } finally {
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

      <div className="min-h-screen flex justify-center items-center py-6 px-4 bg-gray-50">
        <div className="bg-white p-6 sm:p-8 rounded-lg w-[350px] max-w-md sm:max-w-lg border border-gray-200 shadow-lg mt-10">
          <div className="text-center">
            <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-green-200 mb-4">
              <i className="fa-solid fa-key text-2xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold mb-1">Forgot Password?</h2>
            <p className="text-gray-500 mb-6 text-sm">
              No worries, enter the email associated with your account.
            </p>
          </div>

          <form onSubmit={forgetPass} className="space-y-4 text-center">
            <div className="text-left">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  id="email"
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600"
                >
                  Enter Your Email:
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 mx-auto cursor-pointer block bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Send
            </button>
          </form>

          {message && (
            <p className="text-center mt-4 text-sm text-green-600">{message}</p>
          )}

          <div className="text-center my-4">
            <Link to="/Login" className="text-sm text-gray-500 hover:text-green-600">
              <i className="fa-solid fa-arrow-left mr-1"></i> 
              <span className="text-gray-500">Back to log in</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
