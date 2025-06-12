import React from 'react'
import style from './NotFound.module.css'
import error from "../../assets/error.svg";

export default function NotFound() {
  return (
    <>
       <div className='flex justify-center items-center flex-col w-full h-dvh'>
        <img src={error} alt="" />
       </div>
    </>
  )
}
