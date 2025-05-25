import React, { useContext, useEffect, useState } from 'react';
import style from './Wishlist.module.css';
import { wishListContext } from '../../Context/wishListContext';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/cartContext';


export default function WishList() {
  const { getLoggedUserWishList, deleteWishListItem, setWishList } = useContext(wishListContext);
  const [wishListDetails, setWishListDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(0);
  const { addProductToCart, setcart } = useContext(cartContext);
  
  

  async function getWishListItems() {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getLoggedUserWishList();
      if (res.data.status === 'success') {
        setWishListDetails(res.data.data);
      } else {
        setError('Failed to load wish list.');
      }
    } catch (err) {
      setError('An error occurred while fetching your wish list.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteWishItem(productId) {
    setIsLoading(true);
    setError(null);
    try {
      const res = await deleteWishListItem(productId);
      if (res.data.status === 'success') {
        setWishListDetails(prev => prev.filter(item => item._id !== productId));
        toast.success("Item removed from wishlist",{
           duration: 2000,
                    position: 'top-right',
                    style: { background: '#4ec33d', color: 'white' },
                    iconTheme: { primary: '#fff', secondary: '#8bca67' },
        });
      } else {
        setError("Failed to remove item from wish list.");
      }
    } catch (err) {
      setError('Failed to remove item from wish list.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  
  async function addProduct(productId) {
    setCurrentProductId(productId);
    console.log("Adding product with id:", productId);
    setIsLoading(true);
    try {
      const response = await addProductToCart(productId);
      console.log("Response from addProductToCart:", response);
      if (response.data.status === 'success') {
        setcart(response.data);
        toast.success(response.data.message, {
          duration: 2000,
          position: 'top-right',
          style: { background: '#4ec33d', color: 'white' },
          iconTheme: { primary: '#fff', secondary: '#8bca67' },
        });
      } else {
        console.log("Add to cart failed response:", response.data);
        toast.error(response.data.message || "Failed to add to cart.", { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      console.error("Error in addProductToCart:", error);
      toast.error('Failed to add to cart.', { duration: 2000, position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }
  

  useEffect(() => {
    getWishListItems();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold p-5 text-green-600">My Wish List</h2>
          </div>
        </div>

        {isLoading && (
           <div className='fixed inset-0 flex justify-center items-center bg-black/50 z-50'>
           <FadeLoader color='green'/>
        </div>
        )}

        {error && (
          <div className="text-center py-4 text-red-600">
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && wishListDetails && wishListDetails.length === 0 && (
          <div className="text-center py-4">
            <p className="text-gray-500">Your wish list is empty.</p>
          </div>
        )}

        {!isLoading && !error && wishListDetails && wishListDetails.length > 0 && (
          <table className="w-full sm:w-3/4 mx-auto my-6 text-sm text-left rtl:text-right text-gray-500 block sm:table">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 hidden sm:table-header-group">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Add To Cart
                </th>
              </tr>
            </thead>
            <tbody className='block sm:table-row-group text-center'>
              {wishListDetails.map((product) => (
                <tr
                  key={product._id} 
                  className="text-center bg-white border-b border-gray-200 hover:bg-gray-50 block sm:table-row sm:mb-0"
                >
                  <td className="p-4 flex justify-center sm:table-cell sm:flex-none">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full "
                      alt={product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 block sm:table-cell">{product.title}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900 block sm:table-cell">{product.price} EGP</td>
                  <td className="px-6 py-4 block sm:table-cell">
                    <span
                      onClick={() => deleteWishItem(product._id)}
                      className="cursor-pointer text-red-500 hover:text-red-600 transition-all duration-300"
                    >
                      Remove
                    </span>
                  </td>
                  <td className="px-6 py-4 block sm:table-cell">
                    <span
                       onClick={() => addProduct(product._id)}
                       className="cursor-pointer text-green-500 hover:text-green-600 transition-all duration-300 "
                    >
                      + Add
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
