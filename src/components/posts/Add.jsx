import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Textarea,
  TextInput,
} from "flowbite-react";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { MdInsertPhoto } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import AppButton from '../Shared/AppButton'
export default function Add() {
    const fileInputRef = useRef();
const queryClient = useQueryClient()
const {mutate,data,isPending} =useMutation({
mutationFn:addPost,
onSuccess:(data)=>{
  console.log(data)
  toast.success(data?.data?.message || "Posted successfully",{
    position:'top-right'
  })
  reset()
  queryClient.invalidateQueries(['all-posts'])
  queryClient.invalidateQueries(['user-posts'])
},
onError:(err)=>{
  toast.error(err?.response?.data?.message || "Something went wrong",{
    position:'bottom-right'
  })
}
})


  const { register, handleSubmit, reset } = useForm();

  async function addPost(data) {
    console.log(data.body, fileInputRef?.current?.files[0]);
    const formData = new FormData();
    formData.append('body',data.body)
    if(fileInputRef?.current?.files[0]){
      formData.append('image',fileInputRef?.current?.files[0])

    }
 
     return await axios.post(
        `${import.meta.env.VITE_BASE_URL}/posts`,
        formData,
        {
          headers:{
            token: localStorage.getItem("token")
          },
        }
      );
     


    }

  console.log(fileInputRef);
  return (
    
    <div className="container">
      <Card className="max-w-2xl mx-auto mt-5 dark:bg-gray-700">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutate)}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="comment">Post Something</Label>
            </div>
            <Textarea
              {...register("body")}
              id="comment"
              type="text"
              placeholder="create post ..."
            />
          </div>
          <input
            type="file"
            {...register("image")}
            className="hidden"
            ref={fileInputRef}
          />
          <div
            className="text-green-600 flex gap-3 items-center font-semibold cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          >
            <MdInsertPhoto fontSize={"30px"} /> Photo{" "}
          </div>

          <AppButton>{isPending?'Create Post.....':'Create Post'}</AppButton>
        </form>
      </Card>
    </div>
  );
}
