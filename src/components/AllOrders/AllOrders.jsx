import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './AllOrders.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';



export default function AllOrders() {
      const [isLoading, setIsLoading] = useState(false);
      const [message, setMessage] = useState(null);
      const navigate = useNavigate();
  
  return (
    <>
       {isLoading && (
         <div className="w-full flex justify-center items-center bg-white bg-opacity-70 min-h-[70vh]">
           <FadeLoader color="green" />
         </div>
       )}
   
       <div className="max-h-screen flex justify-center items-center py-4 my-5">
         <div className="bg-white p-8 rounded-lg w-[350px] mx-4 max-w-md sm:max-w-md md:max-w-lg lg:max-w-xl border border-gray-200 shadow-lg mt-10">
           <div className="text-center">
             <div className="animate-bounce inline-flex justify-center items-center w-[50px] h-[50px] rounded-full bg-green-200 p-6 outline-8 outline-green-100/60 mb-3">
               <i className="fa-solid fa-circle-check text-4xl text-green-600"></i>
             </div>
             <h2 className="text-2xl font-bold mb-1">Order Confirmed!</h2>
             <p className="text-gray-600 mb-6 text-sm">
              Thank you for shopping with us. We’re getting your order ready for delivery.
             </p>
           </div>
   
           {message && (
             <p className="text-center mt-4 text-sm text-green-600">{message}</p>
           )}
           <div className="text-center my-2 ">
             <Link to="/" className="text-center text-sm">
               <div>
                 <i className="fa-solid fa-arrow-left text-gray-500 "></i>{' '}
                 <span className="text-gray-500">Back to Home</span>
               </div>
             </Link>
           </div>
         </div>
       </div>
     </>
  );
}
