import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Button, Label, Textarea } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { IoSend } from "react-icons/io5";
import { toast } from 'react-toastify';

export default function AddComment({post}) {
    const {register,handleSubmit,reset,formState:{isValid}} = useForm()
    const queryClient = useQueryClient()
    const {mutate,data,isPending} = useMutation({
        mutationFn:addComment,
        onSuccess:(data)=>{
            reset()
            toast.success(data.data.message)
            queryClient.invalidateQueries(['post-details',post])

        },
        onError:(error)=>{
            toast.error('comment connection failed')
        }
    })
    async function addComment (data){
    const commentData = {...data,post}
    console.log(commentData)
    return axios.post(`${import.meta.env.VITE_BASE_URL}/comments`,commentData,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
    }
  return (
     
    <form className="relative w-full" onSubmit={handleSubmit(mutate)}>
    <Textarea
     {...register('content',{required:true})}
      id="comment"
      rows={4}
      placeholder="Add Comment ..."
      className=" w-full bg-gray-100 resize-none"
    />
    <Button type='submit' disabled={!isValid} className="bg-transparent  hover:bg-transparent outline-0 border-0 focus:ring-0 absolute bottom-2 right-2 text-gray-500 cursor-pointer">
    <IoSend size={20} className='text-sky-700'/>
    </Button>
  </form>
  )
}
