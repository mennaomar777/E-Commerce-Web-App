import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './components/NotFound/NotFound';
import UserContextProvider from './Context/userContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import {  QueryClient , QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/cartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPass from './components/ResetPass/ResetPass';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './Context/wishListContext';



let client = new QueryClient()

const x = createBrowserRouter([
  {path:'',element:<Layout/>,children:[
    {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
    {path:'Categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
    {path:'Brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
    {path:'Cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
    {path:'Products',element:<ProtectedRoute><Products/></ProtectedRoute>},
    {path:'ProductDetails/:id/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
    {path:'Payment',element:<ProtectedRoute><Payment/></ProtectedRoute>},
    { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
    {path:'Login',element:<Login/>},
    {path:'Register',element:<Register/>},
    {path:'ForgetPassword',element:<ForgetPassword/>},
    {path:'VerifyCode',element:<VerifyCode/>},
    {path:'ResetPass',element:<ResetPass/>},
    {path:'WishList',element:<WishList/>},




    {path:'*',element:<NotFound/>}
  ]}
])

function App() {
  

  return (
    <>
    <QueryClientProvider client={client}>
     <UserContextProvider>
      <CartContextProvider>
        <WishListContextProvider>
        <RouterProvider router={x}></RouterProvider>
         <ReactQueryDevtools initialIsOpen={false} /> 
         <Toaster />
        </WishListContextProvider>
       </CartContextProvider> 
     </UserContextProvider>
    </QueryClientProvider>
    </>
  )
}

export default App
