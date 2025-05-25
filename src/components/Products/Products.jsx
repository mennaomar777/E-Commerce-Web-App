import style from './Products.module.css';
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../Context/wishListContext';

export default function Products() {
  const [allProducts, setAllProducts] = useState(null);
  const [currentProductId, setCurrentProductId] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const { addProductToCart, setCart } = useContext(cartContext);
  const { addProductToWishList, setWishList, deleteWishListItem, getLoggedUserWishList } = useContext(wishListContext);
  const [likedProducts, setLikedProducts] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  

  async function getAllProducts() {
    setLoading(true);
    try {
      const res = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setAllProducts(res.data.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load products.', { duration: 2000, position: 'top-right' });
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

  async function addProduct(productId) {
    setCurrentProductId(productId);
    setLoading(true);
    try {
      const response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        setCart(response.data);
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

  async function toggleWishList(productId) {
    setCurrentProductId(productId);
    setLoading(true);

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
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
    fetchWishList(); 
  }, []);

  const filteredProducts = allProducts?.filter(product =>
    product.category.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
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
      <div className="container mx-auto">
         <div className='flex justify-center my-5'>
       <input
         type="text"
         placeholder="Search products..."
         value={searchTerm}
         onChange={(e) => setSearchTerm(e.target.value)}
         className=" w-[60%] p-3 rounded-xl border border-gray-300 shadow-sm text-gray-700 placeholder-gray-400 transition duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-green-300 focus:border-transparent hover:shadow-md "
/>

         </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6">
          {filteredProducts?.map((product, index) => (
            <div className="px-4" key={index}>
              <div className="product py-4 rounded-md px-4 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-500">
                <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
                  <img src={product.imageCover} alt={product.title} className="w-full" />
                  <span className="block text-green-600 font-light">{product.category.name}</span>
                  <h3 className="text-lg font-normal text-gray-800 mb-4">
                    {product.title.split(' ').slice(0, 2).join(' ')}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span>{product.price} EGP</span>
                    <span className="text-black">
                      <i className="fas fa-star text-yellow-500"></i> {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  <button className="btn" onClick={() => addProduct(product._id)}>
                    {currentProductId === product._id && isLoading ? (
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