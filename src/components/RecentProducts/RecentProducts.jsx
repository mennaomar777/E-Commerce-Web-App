import React, { useContext, useState, useEffect } from 'react';
import style from './RecentProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FadeLoader } from 'react-spinners';
import { cartContext } from '../../Context/cartContext';
import { wishListContext } from '../../Context/wishListContext';
import toast from 'react-hot-toast';

export default function RecentProducts() {
  const [loading, setLoading] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false); 
  const [currentProductId, setCurrentProductId] = useState(0);
  const { addProductToCart, setcart } = useContext(cartContext);
  const { addProductToWishList, setWishList, deleteWishListItem, getLoggedUserWishList } = useContext(wishListContext);
  const [likedProducts, setLikedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');


  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        setcart(response.data);
        toast.success(response.data.message, {
          duration: 2000,
          position: 'top-right',
          style: { background: '#4ec33d', color: 'white' },
          iconTheme: { primary: '#fff', secondary: '#8bca67' },
        });
      } else {
        toast.error(response.data.message, { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      toast.error('Failed to add to cart.', { duration: 2000, position: 'top-right' });
    } finally {
      setLoading(false);
    }
  }

  async function fetchWishList() {
    try {
      const res = await getLoggedUserWishList();
      if (res.data.status === 'success') {
        const wishListItems = res.data.data;
        const liked = {};
        wishListItems.forEach((item) => {
          liked[item._id] = true;
        });
        setLikedProducts(liked);
        setWishList(res.data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load wishlist.', { duration: 2000, position: 'top-right' });
    }
  }

  async function toggleWishList(productId) {
    setCurrentProductId(productId);
    setHeartLoading(true); 

    try {
      if (likedProducts[productId]) {
        const response = await deleteWishListItem(productId);
        if (response.data.status === 'success') {
          setWishList(response.data.data);
          setLikedProducts((prev) => ({ ...prev, [productId]: false }));
          toast.success('Removed from wishlist', {
            duration: 2000,
            position: 'top-right',
            style: { background: '#e02424', color: 'white' },
            iconTheme: { primary: '#fff', secondary: '#ff7b7b' },
          });
        } else {
          toast.error(response.data.message, { duration: 2000, position: 'top-right' });
        }
      } else {
        const response = await addProductToWishList(productId);
        if (response.data.status === 'success') {
          setWishList(response.data.data);
          setLikedProducts((prev) => ({ ...prev, [productId]: true }));
          toast.success('Added to wishlist', {
            duration: 2000,
            position: 'top-right',
            style: { background: '#4ec33d', color: 'white' },
            iconTheme: { primary: '#fff', secondary: '#8bca67' },
          });
        } else {
          toast.error(response.data.message, { duration: 2000, position: 'top-right' });
        }
      }
    } catch (error) {
      toast.error('An error occurred.', { duration: 2000, position: 'top-right' });
    } finally {
      setHeartLoading(false);
    }
  }

  function getRecentProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getRecentProducts,
  });

  useEffect(() => {
    if (!isLoading && !isError && data) {
      fetchWishList();
    }
  }, [isLoading, isError, data]);

  if (isLoading || heartLoading) { 
    return (
      <>
        <div className="w-full flex justify-center items-center bg-white bg-opacity-70 min-h-[70vh]">
          <FadeLoader color="green" />
        </div>
      </>
    );
  }

  if (isError) {
    console.log(error);
    return (
      <>
        <h2 className="text-green-600 text-center">ERROR!!!</h2>
      </>
    );
  }
  const filteredProducts = data?.data.data.filter(product =>
    product.category.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
  
  return (
    <>
      <div className="container mx-auto">
        <div className="flex justify-center my-6">
        <input
         type="text"
         placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" w-[60%] p-3 rounded-xl border border-gray-300 shadow-sm text-black placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-transparent hover:shadow-md "
        />
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6">
          {filteredProducts.map((product, index) => (
            <div className="px-4" key={index}>
              <div className="relative product py-4 rounded-md px-4 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-500 shadow">
                <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
                  <img src={product.imageCover} alt={product.title} className="w-full" />
                  <span className="block text-green-600 font-light">{product.category.name}</span>
                  <h3 className="text-lg font-normal text-gray-800 mb-4">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between items-center">
                    {product.priceAfterDiscount?<div>
                      <span className='line-through text-red-600 text-xs me-2'>{product.price} EGP</span>
                      <span>{product.priceAfterDiscount} EGP</span>
                    </div> : <span>{product.price} EGP</span>} 
                    <span className="text-black">
                      <i className="fas fa-star text-yellow-500"></i> {product.ratingsAverage}
                    </span>
                  </div>
                   {product.priceAfterDiscount?<span className='absolute m-1 top-0 bg-red-600 text-white end-0 px-2 py-2 rounded-md'>Sale</span>:null}
                </Link>
                <div className="flex justify-between items-center">
                  <button className="btn" onClick={() => addProduct(product._id)}>
                    {currentProductId === product._id && loading ? (
                      <i className="fas fa-spin fa-spinner"></i>
                    ) : (
                      '+ Add'
                    )}
                  </button>
                  <i
                    className={`fa-solid fa-heart ps-2 cursor-pointer transition-colors duration-300 ${
                      likedProducts[product._id] ? 'text-red-600' : 'text-gray-900'
                    }`}
                    onClick={() => toggleWishList(product._id)}
                  ></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
