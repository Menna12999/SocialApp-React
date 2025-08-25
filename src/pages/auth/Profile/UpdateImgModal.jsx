import React, { useContext } from 'react'
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { FileInput, Label } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppButton from '../../../components/Shared/AppButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext';
import { profileImageSchema } from '../../../schema/profileImage.scheme';
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from '../../../components/Shared/ValidationError';



export default function UpdateImgModal({openModal,setOpenModal}) {
 const {register,handleSubmit,formState:{isSubmitting,isValid,errors}} =  useForm({
  mode:'onChange',
  resolver:zodResolver(profileImageSchema)
 })
  let{token,setToken,userData,setUserData }=useContext(AuthContext)
 async function changeProfilePhoto(data) {
    console.log(data)
    const formData = new FormData()
    formData.append('photo',data.photo[0])
    return await axios.put(`${import.meta.env.VITE_BASE_URL}/users/upload-photo`,formData,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
 }
 const {mutate,isPending} =useMutation({
 mutationFn:changeProfilePhoto,
        onSuccess:()=>{
            setOpenModal(false)
            toast.success('profile photo upload successfully')
            getProfileData(localStorage.getItem('token'))

        },
        onError:()=>{
            toast.error('profile photo upload failed')
        }
 })

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className='border-b-0'></ModalHeader>

        <ModalBody>
        {errors.photo && <ValidationError error={errors.photo.message} className='mb-4'/>}

        <form onSubmit={handleSubmit(mutate)} className="flex flex-col w-full items-center justify-center mt-4">
          
      <Label
        htmlFor="dropzone-file"
        className="flex h-64  mb-3 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <FileInput id="dropzone-file" className="hidden" {...register("photo")} />
      </Label>
      <AppButton isLoading={isPending} disabled={!isValid}>Upload</AppButton>
    </form>
        </ModalBody>
     
      </Modal>
  )
}
