import React, { useContext } from 'react'
import style from './Login.module.css'
import { useFormik } from "formik";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { UserContext } from '../../Context/userContext';

export default function Login() {
  let {settoken} = useContext(UserContext)
  let validation = Yup.object().shape({
    email:Yup.string().email('email is invalid').required('email pattern is required'),
    password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'invalid password').required('password is required'),
  })

  let navigate = useNavigate()  
  const [apiError, setapiError] = useState('')
  const [isLoading, setisLoading] = useState(false)

  async function handleLogin(formValues){
    setisLoading(true)
   
    await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',formValues)
    .then((response)=>{
      setisLoading(false)
      console.log(response.data);
      
      if(response.data.message==='success'){
        settoken(response.data.token);
        localStorage.setItem('userToken',response.data.token);
        getLoggedUserCart()
        getLoggedUserWishList()
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
      email:'',
      password:'',
    },
    validationSchema:validation,
    onSubmit:handleLogin
  })
  return (
    <>
    <div className="max-w-xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {apiError ? (
        <div className="flex items-center p-4 mb-4 text-sm border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
          <span className="sr-only">Info</span>
          <div><span className="font-medium">{apiError}</span></div>
        </div>
      ) : null}

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold mb-6 text-center sm:text-left">Login Now</h2>

        <div className="relative z-0 w-full group">
          <input
            type="email"
            name="email"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Email:
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div className="flex items-center p-4 mb-4 text-sm border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
            <span className="sr-only">Info</span>
            <div><span className="font-medium">{formik.errors.email}</span></div>
          </div>
        ) : null}

        <div className="relative z-0 w-full group">
          <input
            type="password"
            name="password"
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-red-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your Password:
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div className="flex items-center p-4 mb-4 text-sm border rounded-lg bg-red-100 text-red-600 border-red-300" role="alert">
            <span className="sr-only">Info</span>
            <div><span className="font-medium">{formik.errors.password}</span></div>
          </div>
        ) : null}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            disabled={!formik.isValid || !formik.dirty}
            type="submit"
            className="w-full sm:w-auto text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login Now'}
          </button>

          <p className="text-center sm:text-left">
            Didn’t have account yet?
            <span className="font-semibold">
              <Link to={'/Register'}>Register Now</Link>
            </span>
          </p>
        </div>

        <div className="font-semibold text-center sm:text-right">
          <Link to={'/ForgetPassword'}>Forget your password ?</Link>
        </div>
      </form>
    </div>
    </>
  )
}
