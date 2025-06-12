import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

export default function VerifyCode() {
  const navigate = useNavigate();
  const [resetCode, setResetCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  async function handleVerify(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode });
      setMessage(res.data.message);
      setTimeout(() => {
        navigate('/ResetPass');
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
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center">
          <FadeLoader color="green" />
        </div>
      )}

      <div className="min-h-screen flex justify-center items-center py-6 px-4 bg-gray-50">
        <div className="bg-white p-6 sm:p-8 rounded-lg w-[350px] max-w-md sm:max-w-lg border border-gray-200 shadow-lg mt-10">
          <div className="text-center">
            <div className="inline-flex justify-center items-center w-12 h-12 rounded-full bg-green-200 mb-4">
              <i className="fa-solid fa-envelope text-2xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold mb-1">Verify Code</h2>
            <p className="text-gray-500 mb-6 text-sm">
              Please enter the verification code sent to your email.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4 text-center">
            <div className="text-left">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="code"
                  onChange={(e) => setResetCode(e.target.value)}
                  value={resetCode}
                  id="code"
                  className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-green-600 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="code"
                  className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-green-600"
                >
                  Enter Verification Code:
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-1/2 mx-auto block bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Verify
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
