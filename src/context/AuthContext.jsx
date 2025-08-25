import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null)


export default function AuthContextProvider({children}) {
    const [userData,setUserData] = useState(null)
    const [token,setToken] = useState(null)
    useEffect(()=>{
        if(localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
        getProfileData(localStorage.getItem('token'))
       
    },[token])
  
    async function getProfileData(token){
        try{
         const{data} = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data
`,{
            headers:{
                token
            }
         }) 
         if(data.message=='success'){
            setUserData(data.user)
            console.log(data)
         }
         else if(data.error){
            throw new Error (data.error)
         }
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <AuthContext.Provider value={{token,setToken,userData,getProfileData}}>
        {children}
        </AuthContext.Provider>
  )
}
