import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function useFetch(queryKey,endPoint,userData) {
    
    const { data, isLoading, error, isError } = useQuery({
      queryKey:queryKey,
      queryFn: getPost,
      select:(data)=>data.data,
      enabled:!!userData
    });
  
    async function getPost() {
      return axios.get(`${import.meta.env.VITE_BASE_URL}${endPoint}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
    }
    return{
        data,isLoading,isError,error
    }
}
