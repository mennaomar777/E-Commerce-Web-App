import { createContext , useState ,useEffect } from "react";

export let UserContext = createContext('')

export default function UserContextProvider({children}){
    const [token, settoken] = useState(localStorage.getItem('userToken'))
    
    

   return <UserContext.Provider value={{token , settoken}}>
    {children}
   </UserContext.Provider>
}