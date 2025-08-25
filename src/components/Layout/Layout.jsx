import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterApp from './Footer/Footer'
import AppNavbar from './Navbar/Navbar'
import { Offline, Online } from "react-detect-offline";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiX } from "react-icons/hi";

export default function Layout() {
  return (
   <div className='min-h-screen flex justify-between flex-col'>
   <AppNavbar/>
 <div className='flex-grow-1'>
  <Online> <Toast className='fixed right-5 top-20 z-20'>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">You are Online !</div>
          <ToastToggle />
        </Toast></Online>
    <Offline>  <Toast className='fixed right-5 top-20 z-20'>
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
          <HiX className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">You are Offline !</div>
        <ToastToggle />
      </Toast></Offline>
 <Outlet/>
 </div>
   <FooterApp/>
   </div>
  )
}
