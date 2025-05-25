import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { cartContext } from '../../Context/cartContext'
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';


export default function Cart() {
  let {getLoggedUserCart,updateCartItemCount,deleteProductItem,deleteCartItems,setcart} = useContext(cartContext);
  const [cartDetails, setcartDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function getCartItems() {
    setIsLoading(true);
    try {
      let response = await getLoggedUserCart();
      if (response.data.status === 'success') {
        setcartDetails(response.data.data);
      } else {
        toast.error('Failed to load cart.', { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching your cart.', { duration: 2000, position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }
  async function UpdateCartCount(productId, count) {
    setIsLoading(true);
    try {
      let response = await updateCartItemCount(productId, count);
      if (response.data.status === 'success') {
        setcartDetails(response.data.data);
        toast.success('Cart updated successfully.', {
          duration: 2000,
          position: 'top-right',
          style: { background: '#4ec33d', color: 'white' },
          iconTheme: { primary: '#fff', secondary: '#8bca67' },
        });
      } else {
        toast.error(response.data.message, { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update cart.', { duration: 2000, position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteItem(productId) {
    setIsLoading(true);
    try {
      let response = await deleteProductItem(productId);
      if (response.data.status === 'success') {
        setcartDetails(response.data.data);
        setcart(response.data);
        toast.success('Item removed from cart.', {
          duration: 2000,
          position: 'top-right',
          style: { background: '#e02424', color: 'white' },
          iconTheme: { primary: '#fff', secondary: '#ff7b7b' },
        });
      } else {
        toast.error(response.data.message, { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to remove item from cart.', { duration: 2000, position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }
   async function deleteAllItems(){
    setIsLoading(true);
    try {
        let response = await deleteCartItems()
    if (response.data.message === 'success') {
        setcartDetails(null)
        console.log(response.data);
        toast.success('All items removed from cart.', {
        duration: 2000,
        position: 'top-right',
        style: { background: '#e02424', color: 'white' },
        iconTheme: { primary: '#fff', secondary: '#ff7b7b' },
  }); 
}else {
    toast.error(response.data.message, { duration: 2000, position: 'top-right' });
  }
    } catch (error) {
        console.error(error);
        toast.error('Failed to remove item from cart.', { duration: 2000, position: 'top-right' });
    }finally {
        setIsLoading(false);
      }
   }


  useEffect(() => {
    getCartItems()
  }, [])
  
  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
          <FadeLoader color="green" />
        </div>
      </>
    );
  }
  return (
    <>
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
  <div className='flex justify-between items-center'>
 <div>
 <h2 className='text-3xl font-bold p-5 text-green-600'>Cart Shop</h2>
 <h3 className='px-5 text-lg'>Total price: <span className='text-green-600'>{cartDetails?.totalCartPrice}</span> EGP</h3>
 </div>
  <button className='bg-green-500 text-white me-5 py-1 px-3 rounded cursor-pointer hover:bg-green-600' onClick={()=>deleteAllItems()}>Clear Cart</button>
  </div>
    <table className="w-full sm:w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 overflow-x-auto block sm:table">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 hidden sm:table-header-group  ">
            <tr>
                <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product
                </th>
                <th scope="col" className="px-6 py-3">
                    Qty
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        
        <tbody className='block sm:table-row-group'>
        {cartDetails?.products.map((product)=><React.Fragment key={product.product.id}>
          <tr  className="bg-white border-b  border-gray-200 hover:bg-gray-50 block sm:table-row sm:mb-0">
                <td className="p-4 block sm:table-cell">
                    <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.product.title}/>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 block sm:table-cell sm:text-left">
                {product.product.title}
                </td>
                <td className="px-6 py-4 block sm:table-cell">
                    <div className="flex items-center justify-center sm:justify-start">
                        <button onClick={()=>{UpdateCartCount(product.product.id,product.count-1)}} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                            </svg>
                        </button>
                        <div>
                          <span>{product.count}</span>
                        </div>
                        <button onClick={()=>{UpdateCartCount(product.product.id,product.count+1)}} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 " type="button">
                            <span className="sr-only">Quantity button</span>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round"strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                            </svg>
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 block sm:table-cell sm:text-left">
                    {product.price} EGP
                </td>
                <td className="px-6 py-4 block sm:table-cell ">
                   <span onClick={()=>deleteItem(product.product.id)} className="cursor-pointer text-red-600  hover:underline">Remove</span>

                </td>
            </tr>
        
        </React.Fragment>)}
           
            
        </tbody>
    </table>
    <div className='text-center'>
   <Link to={'/Payment'}> <button  type="submit" className="btn1 mb-5">Checkout</button></Link>
    </div>
    
</div>

    </>
  )
}
