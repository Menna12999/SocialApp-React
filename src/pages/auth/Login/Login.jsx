
import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import {  Radio } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import { zodResolver } from "@hookform/resolvers/zod";
import ValidationError from "../../../components/Shared/ValidationError";
import AppButton from "../../../components/Shared/AppButton";
import { useContext, useState } from "react";
import{ AuthContext } from "../../../context/AuthContext";
import { Helmet } from "react-helmet";


const schema = z.object({
  email:z.email({message:'email is invalid'}),
  password:z.string().min(8,{message:'password must be at least 8 characters'}).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,{message:'Contain at least one uppercase letter,Contain at least one lowercase lette,Contain at least one digit,Contain at least one special character'}),
 
  })

export default function Register() {
 const {register,handleSubmit,formState:{errors,isSubmitting,disabled,isValid}} =  useForm(
  {
    defaultValues:{
      email:"",
      password:"",
    
    },
    resolver: zodResolver(schema)

  }
 )
 const navigate = useNavigate()
 const [apiError,setApiError] = useState(null)
 let {setToken}=useContext(AuthContext)

 async function onSubmit(data) {
  try{
 const {data:response,statusText} = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin
`,data)
  
  if(response.message=='success'){
    setApiError(null)
    localStorage.setItem('token',response.token)
    setToken(response.token)
   navigate('/')
  }
  else{
    throw new Error("Error",statusText)
  }
}
  catch(err){
    console.log(err)
    setApiError(err?.response?.data?.error)

  }
  console.log(data);
 }
  return (

<section className="container my-20  bg-white p-5  max-w-md rounded-xl shadow-2xl  dark:bg-gray-700 dark:text-white'">
<Helmet>
                <title>Sociala. | Login</title>
            </Helmet>
  <h1 className="text-center text-2xl text-sky-700 font-bold">Login</h1>
<form className="flex max-w-md flex-col gap-4 mx-auto " onSubmit={handleSubmit(onSubmit)}>
      {apiError&&<ValidationError error={apiError}/>}
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email2">Your email</Label>
        </div>
        <TextInput id="email2" type="email" placeholder="name@flowbite.com"  shadow {...register('email')}/>
      </div>
      <div>
      {errors.email&& <ValidationError error={errors.email.message}/>}
        <div className="mb-2 block">
          <Label htmlFor="password2">Your password</Label>
        </div>
        <TextInput id="password2" type="password"  shadow {...register('password')}/>
      </div>
      {errors.password&&  <ValidationError error={errors.password.message}/>}  
     
      <AppButton isLoading={isSubmitting} disabled={!isValid}>Login</AppButton>
    </form>
</section>
  );
}
