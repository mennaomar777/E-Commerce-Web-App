import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();


export default function CartContextProvider({children}){
      const [cartId, setcartId] = useState(null)
      const [cart, setcart] = useState(null)
       let headers = {
            token:localStorage.getItem('userToken')
        }

      async function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        })
        .then((res)=> {
          setcartId(res.data.cartId)
          return res
        })
        .catch((err)=>err)
      }
      async function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId:productId},{headers})
        .then((res)=>res)
        .catch((err)=>err)
      }
      async function updateCartItemCount(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:count},{headers})
        .then((res)=>res)
        .catch((err)=>err)
      }
      async function deleteProductItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
      }
      async function deleteCartItems(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
      }

    // cartItems in cart Icon
    async function getCart(){
    let response =  await getLoggedUserCart()
    setcart(response.data)
     }
     useEffect(() => {
      getCart()    
     }, [])
     
      
    return <cartContext.Provider value={{cart,setcart,cartId,getLoggedUserCart,addProductToCart,updateCartItemCount,deleteProductItem,deleteCartItems}}>
         {children}
           </cartContext.Provider>
}