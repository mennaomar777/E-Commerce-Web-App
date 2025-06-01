import React, { useContext } from 'react'
import style from './Register.module.css'
import { useFormik } from "formik";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useState } from "react";
import { UserContext } from '../../Context/userContext';


export default function Register() {
  let {settoken} = useContext(UserContext)

  let validation = Yup.object().shape({
    name:Yup.string().min(3,'name min length is 3').max(10,'name max length is 10').required('name is required'),
    email:Yup.string().email('email is invalid').required('email pattern is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password').required('password is required'),
    rePassword:Yup.string().oneOf([Yup.ref('password')],'re-Password pattern is inavalid').required('rePassword is required'),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'invalid Phone').required('phone is required')
  })

  let navigate = useNavigate()  
  const [apiError, setapiError] = useState('')
  const [isLoading, setisLoading] = useState(false)

  async function handleRegister(formValues){
    setisLoading(true)
    
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,formValues)
    .then((response)=>{
      setisLoading(false)
      console.log(response.data);
      
      
      if(response.data.message==='success'){
        settoken(response.data.token)
        localStorage.setItem('userToken',response.data.token)
        navigate('/')
      }
    })
    .catch((apiResponse)=>{
      setisLoading(false)
      setapiError(apiResponse?.response?.data?.message)
    })
    
  }
 
  
  let formik = useFormik({
    initialValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      phone:''
    },
    validationSchema:validation,
    onSubmit:handleRegister
  })
  return (
    <>
    <div className='max-w-xl py-6 mx-auto'>
    {apiError? <div className="flex items-center p-4 mb-4 text-sm  border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
        <span className="font-medium">{apiError}</span> 
        </div>
        </div> :null}
      <form onSubmit={formik.handleSubmit}>
        <h2 className='text-3xl font-bold mb-6'>Register Now</h2>
        <div className="relative z-0 w-full mb-5 group">
         <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name: </label>
        </div>

        {formik.errors.name && formik.touched.name ? <div className="flex items-center p-4 mb-4 text-sm  border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
        <span className="font-medium">{formik.errors.name}</span> 
        </div>
        </div>: null}

        <div className="relative z-0 w-full mb-5 group">
         <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email:</label>
        </div>
        {formik.errors.email && formik.touched.email ?  <div className="flex items-center p-4 mb-4 text-sm  border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
        <span className="font-medium">{formik.errors.email}</span> 
        </div>
        </div> : null}


        <div className="relative z-0 w-full mb-5 group">
         <input type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password:</label>
        </div>
        {formik.errors.password && formik.touched.password ?  <div className="flex items-center p-4 mb-4 text-sm  border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
        <span className="font-medium">{formik.errors.password}</span> 
        </div>
        </div> : null}


        <div className="relative z-0 w-full mb-5 group">
         <input type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your rePassword:</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword ?  <div className="flex items-center p-4 mb-4 text-sm  border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
        <span className="font-medium">{formik.errors.rePassword}</span> 
        </div>
        </div> : null}


        <div className="relative z-0 w-full mb-5 group">
         <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
         <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your phone:</label>
        </div>
        {formik.errors.phone && formik.touched.phone ?  <div className="flex items-center p-4 mb-4 text-sm  border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
        
        <span className="sr-only">Info</span>
        <div>
        <span className="font-medium">{formik.errors.phone}</span> 
        </div>
        </div> : null}

        <button disabled={!formik.isValid || !formik.dirty ? true:false} type="submit" className="text-white bg-transparent hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading?<i className='fas fa-spinner fa-spin'></i> :'Register Now'}</button>
       </form>
    </div>
    </>
  )
}



