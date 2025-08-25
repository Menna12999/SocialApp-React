import React, { useContext } from 'react'
import { Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { FileInput, Label } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppButton from '../../../components/Shared/AppButton';
import axios from 'axios';
import { toast } from 'react-toastify';
import ValidationError from '../../../components/Shared/ValidationError';
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

const changePasswordSchema = z.object({
    password:z.string().min(8,{message:'password must be at least 8 characters'}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{message:'Contain at least one uppercase letter,Contain at least one lowercase lette,Contain at least one digit,Contain at least one special character'}),
    newPassword:z.string().min(8,{message:'password must be at least 8 characters'}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{message:'Contain at least one uppercase letter,Contain at least one lowercase lette,Contain at least one digit,Contain at least one special character'}),
 
  })

export default function ChangePasswordModal({openModal,setOpenModal}) {
    const {setToken}=useContext(AuthContext)
   const navigate = useNavigate()
  const {register,handleSubmit,formState:{errors,isSubmitting,disabled,isValid}} =  useForm(
   {
     defaultValues:{
       password:"",
       newPassword:"",
     
     },
     resolver: zodResolver(changePasswordSchema)
 
   }
  )
 async function changePassword(data) {
   
    return await axios.patch(`${import.meta.env.VITE_BASE_URL}/users/change-password`,data,{
        headers:{
            token:localStorage.getItem("token")
        }
    })
 }
 const {mutate,isPending,isError,error} =useMutation({
 mutationFn:changePassword,
        onSuccess:()=>{
            setOpenModal(false)
            toast.success('Password updated successfully')
            localStorage.removeItem('token')
            navigate('/login')


        },
        onError:()=>{
            console.log(error)
            toast.error('Password updated failed')
        }
 })

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader className='border-b-0 pb-0 mb-0'></ModalHeader>

        <ModalBody className='pt-0'>
<form className="flex max-w-md flex-col gap-4 mx-auto" onSubmit={handleSubmit(mutate)}>
{isError && <ValidationError error={error?.response?.data?.error
} className='mb-4'/>}
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password">Old Password</Label>
        </div>
        <TextInput id="password" type="password" placeholder="old password ...."  shadow {...register('password')}/>
      </div>
            {errors.password&& <ValidationError error={errors.password.message}/>}
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password2">New Password</Label>
        </div>
        <TextInput id="password2" type="password" placeholder="new password ...."  shadow {...register('newPassword')}/>
      </div>
      {errors.newPassword&& <ValidationError error={errors.newPassword.message}/>}

      <AppButton isLoading={isSubmitting}>Change</AppButton>
    </form>
        
        </ModalBody>
     
      </Modal>
  )
}
