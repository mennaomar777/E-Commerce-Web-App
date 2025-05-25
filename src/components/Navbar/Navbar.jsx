import React, { useContext,useState } from 'react'
import style from './Navbar.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from "../../assets/freshcart-logo.svg";
import { UserContext } from '../../Context/userContext';
import { cartContext } from '../../Context/cartContext';

export default function Navbar() {
    const {token,settoken} = useContext(UserContext);
    const navigate = useNavigate();
    const {cart} = useContext(cartContext);
    const [menuOpen, setMenuOpen] = useState(false);
  
    function logout(){
        localStorage.removeItem('userToken')
        navigate('/Login')
        settoken(null)
        setMenuOpen(false);
    }
    
  return (
    <>
     <nav className='bg-slate-100 items-center lg:fixed top-0 left-0 right-0 z-50'>
        <div className="container flex mx-auto justify-between flex-col lg:flex-row py-2">
            <div className='flex flex-col lg:flex-row  ms-10 items-center'>
              <div className="flex items-center">
                <img src = {logo} alt="fresh-cart logo" width={140} className='me-4'/>
                <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-4 inline-flex lg:hidden items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
              </div>
              <div className={`w-full lg:flex lg:w-auto ${menuOpen ? 'block' : 'hidden'}`}>
               {token? <><ul className='flex flex-col lg:flex-row items-center'>
                    <li className='py-2'><NavLink to = '' className='mx-2 text-large'>Home</NavLink></li>
                    <li className='py-2'><NavLink to = 'Cart' className='mx-2 text-large'>Cart</NavLink></li>
                    <li className='py-2'><NavLink to = 'WishList' className='mx-2 text-large'>Wish-List</NavLink></li>
                    <li className='py-2'><NavLink to = 'Products' className='mx-2 text-large'>Products</NavLink></li>
                    <li className='py-2'><NavLink to = 'Categories' className='mx-2 text-large'>Categories</NavLink></li>
                    <li className='py-2'><NavLink to = 'Brands' className='mx-2 text-large'>Brands</NavLink></li>
                </ul></> :null}
              </div>
               

            </div>
            <div className={`w-full lg:w-auto flex flex-col lg:flex-row items-center lg:space-x-6 mt-4 lg:mt-0 ${menuOpen ? 'block' : 'hidden'} lg:block`}>
                <ul className='flex items-center'>
                    <li className='py-2'>
                        <NavLink to={'/Cart'} className='mx-2 py-4 text-lg text-slate-900 font-light cursor-pointer relative'>
                            <i className='fa-solid fa-cart-shopping text-xl text-black'></i>
                            <span className='bg-green-600 text-white text-sm px-1 rounded absolute top-0 right-[-5px]'>{cart?.numOfCartItems}</span>
                        </NavLink>
                    </li>
                    <li className='items-center'>
                        <i className="fab fa-instagram mx-2"></i>
                        <i className='fab fa-facebook mx-2'></i>
                        <i className='fab fa-tiktok mx-2'></i>
                        <i className='fab fa-twitter mx-2'></i>
                        <i className='fab fa-linkedin mx-2'></i>
                        <i className='fab fa-youtube mx-2'></i>
                    </li>
                    {token? <li className='py-2' onClick={logout}><span className="text-slate-500 text-lg mx-2 cursor-pointer ">SignOut</span></li>:<><li className='py-2'><NavLink to="Login" className="text-slate-500 text-lg mx-2">Login</NavLink></li>
                        <li className='py-2'><NavLink to="Register" className="text-slate-500 text-lg mx-2">Register</NavLink></li></>}
                </ul>
            </div>
        </div>
    </nav></>
  )
}
