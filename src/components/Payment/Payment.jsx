import React, { useContext } from 'react'
import style from './Payment.module.css'
import { useFormik } from "formik";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { cartContext } from '../../Context/cartContext';

export default function Payment() {

  let navigate = useNavigate() 
  let token = localStorage.getItem('userToken') 
  let {cartId} = useContext(cartContext)
  const [cash, setcash] = useState(false)

  async function handleCachPayment(apiObj){
   await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{apiObj},{headers:{token}})
   .then((res)=>{
    navigate('/allorders')
    return res
   })
   .catch((err) => err)
    
  }

  async function handleOnlinePayment(apiObj) {
    
     await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{apiObj},{headers:{token},params:{url:'http://localhost:5173'}})
     .then((res)=>{
      window.open(res.data.session.url)
      return res
     })
     .catch((err) => err)
  }
  function handlePayment(formValues){
    let apiObj = {
      shippingAddress:formValues
     }
     if(cash) {
      handleCachPayment(apiObj)
     }
     else {
      handleOnlinePayment(apiObj)
     }
    
  }
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:'',
    },
    onSubmit:handlePayment
  })
  return (
    <>
    <div className='max-w-xl py-6 mx-auto px-4'>

      <form onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl font-bold mb-6'>Payment Now</h2>

        <div className="relative z-0 w-full mb-5 group">
         <input type="text" name="details" id="details" value={formik.values.details} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Shipping Address Details:</label>
        </div>
       
        <div className="relative z-0 w-full mb-5 group">
         <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone:</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
         <input type="text" name="city" id="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City:</label>
        </div>
       
      
       <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <button onClick={()=>{setcash(true)}} disabled={!formik.isValid || !formik.dirty ? true:false} type="submit" className="text-white bg-transparent hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">Cash Payment</button>      
          <button onClick={()=>{setcash(false)}} disabled={!formik.isValid || !formik.dirty ? true:false} type="submit" className="text-white bg-transparent hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">Online Payment</button>      

       </div>

     
       </form>
    </div>
    </>
  )
}

