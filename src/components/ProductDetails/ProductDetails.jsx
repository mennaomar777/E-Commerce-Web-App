import React, { useEffect, useState, useContext } from 'react';
import style from './ProductDetails.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { cartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';
import { wishListContext } from '../../Context/wishListContext';
import { FadeLoader } from 'react-spinners';

export default function ProductDetails() {
  let { id, category } = useParams();
  const [relProducts, setrelProducts] = useState([]);
  const [productDetails, setproductDetails] = useState(null);
  let { addProductToCart, setcart } = useContext(cartContext);
  const [currentProductId, setcurrentProductId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);
  const [heartLoading, setHeartLoading] = useState(false);
  let { addProductToWishList, setWishList, deleteWishListItem, getLoggedUserWishList } = useContext(wishListContext);
  const [likedProducts, setLikedProducts] = useState({});

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async function getProductDetails(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setproductDetails(data.data);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load product details', { duration: 2000, position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }

  async function getRecentProducts(category) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      let res = data.data.filter((product) => product.category.name === category);
      setrelProducts(res);
    } catch (error) {
      console.log(error);
      toast.error('Failed to load related products', { duration: 2000, position: 'top-right' });
    } finally {
      setIsLoading(false);
    }
  }

  async function addProduct(productId) {
    setcurrentProductId(productId);
    setCartLoading(true);
    try {
      let response = await addProductToCart(productId);
      if (response.data.status === 'success') {
        setcart(response.data);
        toast.success(response.data.message, {
          duration: 2000,
          position: 'top-right',
          style: {
            background: '#4ec33d',
            color: 'white',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#8bca67',
          },
        });
      } else {
        toast.error(response.data.message, { duration: 2000, position: 'top-right' });
      }
    } catch (error) {
      toast.error('Failed to add to cart', { duration: 2000, position: 'top-right' });
    } finally {
      setCartLoading(false);
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
    setcurrentProductId(productId);
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

  useEffect(() => {
    getProductDetails(id);
    getRecentProducts(category);
  }, [id]);

  useEffect(() => {
    fetchWishList();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
        <FadeLoader color="green" />
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-500">Failed to load product details.</p>
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="w-1/4">
            <Slider {...settings}>
              {productDetails?.images.map((src) => (
                <img src={src} alt={productDetails?.title} className="w-full" />
              ))}
            </Slider>
          </div>
          <div className="w-3/4 p-6">
            <h1 className="text-[29px] font-bold text-black">{productDetails?.title}</h1>
            <p className="text-gray-800 font-light mt-4">{productDetails?.description}</p>
            <div className="flex justify-between items-center my-3">
              <span className="">{productDetails?.price} EGP</span>
              <span className="text-black">
                <i className="fas fa-star text-yellow-500"></i> {productDetails?.ratingsAverage}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => addProduct(productDetails.id)}
                className="px-4 py-2 w-[60%] rounded-lg text-white bg-green-500 cursor-pointer mt-4 mx-auto"
              >
                {cartLoading && currentProductId === productDetails.id ? (
                  <i className="fas fa-spin fa-spinner"></i>
                ) : (
                  '+ Add'
                )}
              </button>
              <div className="flex items-center">
                <i
                  className={`fa-solid fa-heart ps-2 cursor-pointer text-3xl transition-colors duration-300 ${likedProducts[productDetails?._id] ? 'text-red-600' : 'text-gray-900'}`}
                  onClick={() => toggleWishList(productDetails?._id)}
                ></i>
                {heartLoading && currentProductId === productDetails?._id && (
                  <i className="fas fa-spin fa-spinner ml-2 text-gray-500"></i>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6">
          {relProducts.map((product) => (
            <div className="px-4" key={product.id}>
              <div className="product py-4 rounded-md px-4 hover:shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] transition-shadow duration-500">
                <Link to={`/ProductDetails/${product.id}/${product.category.name}`}>
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
                <div className="flex justify-between items-center mt-2">
                  <button className="btn" onClick={() => addProduct(product.id)}>
                    {cartLoading && currentProductId === product.id ? (
                      <i className="fas fa-spin fa-spinner"></i>
                    ) : (
                      '+ Add'
                    )}
                  </button>
                  <div className="flex items-center">
                    <i
                      className={`fa-solid fa-heart ps-2 cursor-pointer text-3xl transition-colors duration-300 ${likedProducts[product._id] ? 'text-red-600' : 'text-gray-900'}`}
                      onClick={() => toggleWishList(product._id)}
                    ></i>
                    {heartLoading && currentProductId === product._id && (
                      <i className="fas fa-spin fa-spinner ml-2 text-gray-500"></i>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}