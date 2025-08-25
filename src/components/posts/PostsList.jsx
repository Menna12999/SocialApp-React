import React, { useContext, useEffect, useState } from 'react'
import { PostIem } from './PostItem'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import {useQuery} from '@tanstack/react-query'
import useFetch from '../../hooks/useFetch'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { GrPrevious } from "react-icons/gr";
import AppButton from '../Shared/AppButton'
import { MdNavigateNext } from 'react-icons/md'


export default function PostsList({isHome=true}) {
  
    const {userData}=useContext(AuthContext)
    const [page,setPage] = useState(1)
   const queryKey = isHome?['all-posts',page]:['user-posts'];
   const apiUrl =  isHome?`/posts?limit=10&sort=-createdAt&page=${page}`:
   `/users/${userData?._id}/posts`;
    const {data,isLoading,isError,error} = useFetch(queryKey,apiUrl,userData)
   function handlePrevPage(){
   if(data?.paginationInfo?.currentPage > 1){
    setPage((prev)=>prev-1)
   }
   }
   function handleNextPage(){
   if(data?.paginationInfo?.currentPage < data?.paginationInfo?.numberOfPages){
    setPage((prev)=>prev+1)
   }
   }
   console.log(data?.posts?.length)
    
  return (
   <section className='py-12'>
    <div className="container">
    {isLoading&&<div className='max-w-2xl mx-auto mb-8'><Skeleton baseColor='#d1d5db' count={5} className='h-80 mb-5'/></div>}
    {error&&<p>{error.response?.data?.message}</p>}
    {data&&data.posts.map((post)=><PostIem key={post._id} post={post}/>)}
    {data&&isHome&&<div className="flex justify-center items-center">
     <AppButton className='cursor-pointer me-2'disabled={data?.paginationInfo?.currentPage === 1} onClick={handlePrevPage}>< GrPrevious fontSize={'25px'}/></AppButton>
     <span className='font-bold text-2xl'> {page}
     </span>
     <AppButton className='cursor-pointer ms-2'   disabled={data?.paginationInfo?.currentPage === data?.paginationInfo?.numberOfPages}
     onClick={handleNextPage}><MdNavigateNext fontSize={'25px'}/></AppButton>

    </div>}
    </div>
   </section>
  )
}
