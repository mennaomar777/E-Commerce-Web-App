import axios from "axios";
import { createContext, useEffect, useState,useContext } from "react";
import { UserContext } from "./userContext";


export let wishListContext = createContext();

export default function WishListContextProvider({children}){

    let headers = {
        token:localStorage.getItem('userToken')
    }
    const [wishListId, setWishListId] = useState(null);
    const [wishList, setWishList] = useState(null);
    const { token } = useContext(UserContext)



    async function getLoggedUserWishList(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        })
        .then((res)=> {
            setWishListId(res.data.cartId)
          return res
        })
        .catch((err)=>err)
      }

      async function addProductToWishList(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId:productId},{headers})
        .then((res)=>res)
        .catch((err)=>err)
      } 
      
      async function deleteWishListItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
      }  

       useEffect(() => {
        if (token) {
            getLoggedUserWishList();
        }
    }, [token]);

     return <wishListContext.Provider value={{wishListId,wishList,setWishList,getLoggedUserWishList,addProductToWishList,deleteWishListItem}}>
             {children}
            </wishListContext.Provider>

}
