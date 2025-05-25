import React from 'react'
import style from './Footer.module.css'
export default function Footer() {
  return (
    <>
    <div className='bg-slate-200  py-10'>
      <div className="container mx-auto px-4">
      <h3 className='text-2xl mb-1'>Get The FreshCart app.</h3>
      <p className='text-slate-500 text-sm mb-4'>We will send you a link, open it on your phone to download the app</p>
      <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4 my-4 justify-between'>
      <div className="relative w-full sm:w-[80%] mb-3 sm:mb-0">
        <input type="email" id="email" placeholder="Enter Your Email "className=" w-full p-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-transparent hover:shadow-md"
        />
     </div>

        <div className=''>
           <button className='bg-green-500 text-white rounded px-4 py-1 w-full sm:w-auto text-center cursor-pointer hover:bg-green-600 transition'>ShareApp Link</button>
        </div>
        
      </div>
      <hr className='border border-slate-300 my-4'/>
      <div className='flex flex-col md:flex-row justify-between items-center gap-4 pt-2'>
        <div className=' text-center md:text-left'>
        <h3 className='font-light text-base'>Payment Partners</h3>
        <div></div>
        </div>
        <div className='flex justify-between items-center text-center md:text-right'>
        <h3 className='font-light text-base'>Get deliveries with FreshCart</h3>

        </div>
      </div>
      <hr className='border border-slate-300 mt-6'/>
      </div>
      
    </div>
    
    </>
  )
}











