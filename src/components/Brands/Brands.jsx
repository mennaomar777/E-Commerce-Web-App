import React, { useEffect, useState } from 'react'
import style from './Brands.module.css'
import { FadeLoader } from "react-spinners";

import axios from 'axios'
export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specificBrand, setSpecificBrand] = useState(null)
  


  async function getAllBrands(){
   try {
    setIsLoading(true)
    let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    console.log(res.data.data);
    setBrands(res.data.data);
   } catch (error) {
    console.error("Error fetching brands:", error);
   }
   finally{
    setIsLoading(false);
   }
    
  }
  useEffect(() => {
    getAllBrands();
  }, [])
  
  async function getSelectedBrand(id){
    try {
     setIsLoading(true);
     let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
     console.log(res.data.data);
     setSpecificBrand(res.data.data);
    } catch (error) {
     console.error("Error fetching categories:", error);
    }
    finally{
     setIsLoading(false);
    }
     
   }
  if (isLoading) {
  return (
    <div className="w-full flex justify-center items-center bg-white bg-opacity-70 min-h-[70vh]">
      <FadeLoader color="green" />
    </div>
  );
}

  return (
    <>
<div className="container mx-auto">
  <h1 className='text-center text-4xl font-semibold py-10 text-green-600'>All Brands</h1>
      <div className=" text-center grid md:grid-cols-4 gap-6 sm:grid-cols-1 ">
        {brands.map((brand)=>{
           return (
           <div onClick={() =>{ setIsModalOpen(true) ; getSelectedBrand(brand._id)}} className='border border-gray-300 rounded-md py-5 px-2 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-500 cursor-pointer'>
             <img src={brand.image} alt="grand-image" />
             <h2 className='py-3'>{brand.name}</h2>
          </div>
          )
         })}           
        </div>

        {isModalOpen && specificBrand ? (
  <>
    {/* Overlay */}
    <div className="fixed inset-0 bg-black/50 z-40"></div>

    {/* Modal */}
    <div className="fixed inset-0 z-50 flex justify-center items-center px-4">
      <div className="bg-white rounded-lg shadow-md w-[50%] max-w-2xl relative">
        {/* Modal header */}
        <div className="flex items-center justify-between py-2 px-4 border-b border-gray-200 rounded-t">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
          >
            <svg
              className="w-3 h-3"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Modal body */}
        <div className="p-4 md:p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 text-center items-center">
            <div>
              <h2 className="text-green-600 text-4xl font-semibold">{specificBrand.name}</h2>
              <h3>{specificBrand.slug}</h3>
            </div>
            <div>
              <img src={specificBrand.image} alt="brand" className="w-52 mx-auto" />
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex justify-end p-4 border-t border-gray-200 rounded-b">
          <button
            onClick={() => setIsModalOpen(false)}
            type="button"
            className="text-white bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </>
) : null}


</div>
      
    </>
  )
}

 
