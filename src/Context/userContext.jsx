import { createContext , useState ,useEffect } from "react";

export let UserContext = createContext('')

export default function UserContextProvider({children}){
    const [token, settoken] = useState(localStorage.getItem('userToken'))  

      const setUserToken = (newToken) => {
        localStorage.setItem('userToken', newToken);
        settoken(newToken);
    };

   return <UserContext.Provider value={{token, settoken: setUserToken}}>
    {children}
   </UserContext.Provider>
}
