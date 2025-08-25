import React, { useState } from 'react'
import PostsList from '../../../components/posts/PostsList'
import Add from '../../../components/posts/Add'
import { Avatar, Card } from "flowbite-react";
import { useContext } from "react";
import{ AuthContext } from "../../../context/AuthContext";
import { Link } from 'react-router-dom';
import { FaRegEdit } from "react-icons/fa";
import UpdateImgModal from './UpdateImgModal';
import { Helmet } from 'react-helmet';
import AppButton from '../../../components/Shared/AppButton';
import ChangePasswordModal from './ChangePasswordModal';


export default function Profile() {
    let{userData }=useContext(AuthContext)
    const [openModal, setOpenModal] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);

  
  return (
    <div> 
        <Helmet>
                <title>Sociala. | Profile</title>
            </Helmet>
       <Card className="max-w-md mx-auto mt-5 dark:bg-gray-700">
    <div className="flex justify-end px-4 pt-4">
     
    </div>
    <div className="flex flex-col items-center pb-10">
<div className='relative'>
{userData? <Avatar img={userData?.photo} rounded size='lg' bordered />:  <Avatar rounded size='lg' bordered />
}   
<FaRegEdit fontSize={'25px'} className='text-primary-700 hover:text-primary-800 absolute end-[-15px] bottom-0 cursor-pointer ' onClick={() => setOpenModal(true)}/>

</div>
      <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.name}</h5>
      <span className=" text-gray-500 dark:text-gray-400 text-lg">{userData?.email}</span>
      <span className=" text-gray-500 dark:text-gray-400 text-lg">{userData?.dateOfBirth}</span>
      <span className=" text-gray-500 dark:text-gray-400 text-lg">{userData?.gender}</span>
      <div className="mt-4 flex space-x-3 lg:mt-6">
        <AppButton 
          onClick = {()=>setChangePasswordModal(true)}
          className="inline-flex items-center rounded-lg bg-primary-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
        >
          Change Password
        </AppButton>
       
      </div>
    </div>
  </Card><Add/><PostsList isHome={false}/>
  {openModal && <UpdateImgModal openModal={openModal} setOpenModal={setOpenModal}/>}
  {changePasswordModal&&<ChangePasswordModal openModal={changePasswordModal} setOpenModal={setChangePasswordModal}/>}
  
  </div>
  )
}

