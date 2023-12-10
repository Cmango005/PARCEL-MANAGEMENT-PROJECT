import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Root from './assets/components/Root/Root';
import Home from './assets/components/Home/Home';
import AuthProvider from './Providers/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import Login from './assets/components/Login/Login';
import Registration from './assets/components/Registration/Registration';
import Dashboard from './assets/components/Dashboard/Dashboard';
import Menu from './assets/components/Page/Menu';
import Book from './assets/components/Page/Book';
import MyItems from './assets/components/Page/MyItems';
import Profile from './assets/components/Page/Profile';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [

      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/registration',
        element: <Registration></Registration>
      },

    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/menu',
        element: <Menu></Menu>
      },
      {
        path: '/dashboard/book',
        element: <Book></Book>
      },
      {
        path: '/dashboard/my-book',
        element: <MyItems></MyItems>,
        
      },
      {
        path: '/dashboard/profile',
        element: <Profile></Profile>
      },
      
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <div className='max-w-screen-xl bg-white mx-auto'>
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
      </AuthProvider>
    </div>
  </React.StrictMode>,
)
