import React, { useContext, useEffect, useState } from 'react'
import {
    Avatar,
    Dropdown,
    DropdownDivider,
    DropdownHeader,
    DropdownItem,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
  } from "flowbite-react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { Detector } from 'react-detect-offline';
import { HiBolt } from "react-icons/hi2";
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa";




export default function AppNavbar() {
  let{token,setToken,userData,setUserData }=useContext(AuthContext)
  const [darkMode,setDarkMode] = useState(localStorage.getItem('theme')=='dark'||false)

  let navigate=useNavigate()
  const handleLogout =()=>{
          localStorage.removeItem('token')
          setToken(null)
          navigate('/login')
          setUserData(null)
  
      }

  useEffect(()=>{
    if(darkMode){
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme','dark')
    }
    else{
      document.documentElement.classList.remove('dark')
      localStorage.removeItem('theme','dark')


    }
  },[darkMode])
  return (
     <Navbar  className='shadow-sm text-sky-600 dark:bg-gray-700 dark:text-white'>
        <NavbarBrand as={Link} to="/">
          <span className="self-center whitespace-nowrap  font-semibold dark:text-white text-3xl flex items-center"> <HiBolt color='#10D876'/>
          Sociala</span>
        </NavbarBrand>
        <div className="flex md:order-2">
        <button onClick={()=>setDarkMode(!darkMode)}>{darkMode?<FaSun className='self-center me-3 cursor-pointer' fontSize={'25px'}/>
  :        <IoMoon className='self-center me-3 cursor-pointer' fontSize={'25px'}/>
      }</button>
          <Dropdown
            arrowIcon={false}
            inline
            
            label={
              <div className="relative">
              {userData ? (
                <Avatar alt="User settings" img={userData?.photo} rounded />
              ) : (
                <Avatar alt="User settings" rounded />
              )}

              {/* ✅ Online/Offline Indicator */}
              {token &&<Detector
                render={({ online }) => (
                  <span
                    className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full border-2 border-white ${
                      online ? "bg-green-500" : "bg-gray-400"
                    }`}
                  />
                )}
              />}
            </div>             
            }
          >
        {token?(
        <>
        {userData&&
           (
            <DropdownHeader>
            <span className="block text-sm">{userData?.name}</span>
            <span className="block truncate text-sm font-medium">{userData?.email}</span>
          </DropdownHeader>
           )
          }
           </>):''}
          
  
            {!token &&<>
              <DropdownItem as={Link} to='/login'>Login</DropdownItem>
              <DropdownItem as={Link} to='/Register'>Register</DropdownItem>
            </>}
           {token&&<>
            <DropdownItem as={Link} to='/profile'>Profile</DropdownItem>
            <DropdownDivider />
            <DropdownItem as='button' onClick={handleLogout}>Sign out</DropdownItem>
           </>}
          </Dropdown>
          <NavbarToggle />
        </div>
     {token&&   <NavbarCollapse>
          <NavbarLink as={NavLink} to={'/'}>
            Home
          </NavbarLink>
          <NavbarLink as={NavLink} to={'/posts'}>
            Posts
          </NavbarLink>

       
        </NavbarCollapse>}

      </Navbar>
    )
}
