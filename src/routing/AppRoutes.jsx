import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from '../pages/auth/Login/Login'
import Register from '../pages/auth/Register/Register'
import Layout from '../components/Layout/Layout'
import Posts from '../pages/Posts/Posts'
import Notfound from '../pages/Notfound/Notfound'
import ProtectedRoutes from './ProtectedRoutes'
import ProductDetails from '../pages/PostDetails/PostDetails'
import Profile from '../pages/auth/Profile/Profile'
import PostsList from '../components/posts/PostsList'
import ProtectedAuthRoutes from './ProtectedAuthRoutes'


export let routes = createBrowserRouter([
{path:'',element:<Layout/>,children:[
{index:true,element:<ProtectedRoutes><Posts/></ProtectedRoutes>},
{path:'postDetails/:id',element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes>},
{path:'profile',element:<ProtectedRoutes><Profile/></ProtectedRoutes>},
{path:'posts',element:<ProtectedRoutes><PostsList/></ProtectedRoutes>},
{path:'/login',element:<ProtectedAuthRoutes><Login/></ProtectedAuthRoutes>},
{path:'/register',element:<ProtectedAuthRoutes><Register/></ProtectedAuthRoutes>},
{path:'*',element:<Notfound/>}

]}
      ])

