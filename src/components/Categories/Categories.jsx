import React, { useEffect, useState } from 'react'
import style from './Categories.module.css'
import axios from 'axios';
import { FadeLoader } from "react-spinners";

export default function Categories() {
  
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [specificSubCategories, setSpecificSubCategories] = useState(null);
    const [isSubCategoryModalOpen, setIsSubCategoryModalOpen] = useState(false);
    const [isCategoriesLoading, setIsCategoriesLoading] = useState(true);
    const [isSubCategoriesLoading, setIsSubCategoriesLoading] = useState(false);
    const [isSpecificSubCategoryLoading, setIsSpecificSubCategoryLoading] = useState(false);




  async function getAllCategories(){
    try {
      setIsCategoriesLoading(true);
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
     console.log(res.data.data);
     setCategories(res.data.data);
    } catch (error) {
     console.error("Error fetching categories:", error);
    }
    finally{
      setIsCategoriesLoading(false);
    }
     
   }

   async function getSubCategories(id){
    try {
      setIsSubCategoriesLoading(true);
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
     console.log(res.data.data);
     setSubCategories(res.data.data);
    } catch (error) {
     console.error("Error fetching categories:", error);
    }
    finally{
      setIsSubCategoriesLoading(false);
    }
     
   }

   async function getSpecificSubCategories(id){
    try {
      setIsSpecificSubCategoryLoading(true);
      let res = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories/${id}`);
     console.log(res.data.data);
     setSpecificSubCategories(res.data.data);
     setIsSubCategoryModalOpen(true);
    } catch (error) {
     console.error("Error fetching categories:", error);
    }
    finally{
      setIsSpecificSubCategoryLoading(false);
    } 
   }

   useEffect(() => {
     getAllCategories();
   }, [])

   if (isCategoriesLoading || isSubCategoriesLoading) {
    return (
      <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
         <FadeLoader color='green' />
      </div>
    );
  }
  

  return (
    <>
    <div className='container mx-auto'>
      <div className='text-center grid md:grid-cols-3 gap-6 sm:grid-cols-1 mt-6'>
       {categories.map((category)=>{
        return(
          <>
           <div onClick={()=>{setSelectedCategory(category);getSubCategories(category._id)}} className='cursor-pointer border border-gray-300 rounded-md  hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-500'>
          <div className='w-full h-[305px] overflow-hidden '>
            <img src={category.image} alt="category-image" className='w-full h-full object-cover object-center rounded-md' />
          </div>
          <div>
            <h2 className='my-4 text-green-600 text-[28px] font-lg'>{category.name}</h2>
          </div>
        </div>
        </>
        )
       })}
      </div>

      {/* subCategories */}
      {subCategories &&(
        <div>
          <h2 className='text-center text-3xl text-green-600 my-2'>{selectedCategory?.name} subcategories</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 items-start my-5'>
  {isSubCategoriesLoading ? (
    <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
      <FadeLoader color='green' />
    </div>
  ) : (
    subCategories?.map((subCategory) => (
      <div
        key={subCategory._id}
        onClick={() => {
          getSpecificSubCategories(subCategory._id);
        }}
        className='cursor-pointer text-center border border-gray-200 py-4 rounded-md px-4 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-500'
      >
        <h3 className='font-semibold text-2xl'>{subCategory.name}</h3>
      </div>
    ))
  )}
      </div>
        </div>
      )}

{isSpecificSubCategoryLoading && (
  <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
    <FadeLoader color='green' />
  </div>
)}

{/* Modal */}
{isSubCategoryModalOpen && specificSubCategories && (
  <>
    <div className="fixed inset-0 bg-black/50 z-40"></div>
    <div id="default-modal" tabIndex="-1" aria-hidden="true"
      className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="relative p-4 w-full max-w-fit max-h-full">
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between py-2 px-4 md:px-5 border-b border-gray-200 rounded-t">
            <button
              onClick={() => setIsSubCategoryModalOpen(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg className="w-3 h-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            <div className="grid grid-cols-1 text-center md:grid-cols-2 items-center">
              <div>
                <h2 className="text-green-600 text-4xl font-semibold">{specificSubCategories.name}</h2>
                <h3 className="text-gray-700 text-xl">{specificSubCategories.slug}</h3>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              onClick={() => setIsSubCategoryModalOpen(false)}
              className="text-white bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
)}


    </div>
    </>
  )
}
