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
import AllUser from './assets/components/Page/AllUser';
import AllParcel from './assets/components/Page/AllParcel';
import AllDeliveryMen from './assets/components/Page/AllDeliveryMen';
import MyDeliverItems from './assets/components/Page/MyDeliverItems';
import MyReview from './assets/components/Page/MyReview';
import Statistics from './assets/components/Page/Statistics';
import Update from './assets/components/Page/Update';
import Payment from './assets/components/Page/Payment';
import PrivateRoute from './assets/components/Route/PrivateRoute';
import AdminRoute from './assets/components/Admin/AdminRoute';
import DeliverRoute from './assets/components/DeliveryRoute/DeliverRoute';
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
        element: <PrivateRoute><Book></Book></PrivateRoute>
      },
      {
        path: '/dashboard/my-book',
        element: <PrivateRoute><MyItems></MyItems></PrivateRoute>,
        
      },
      {
        path: '/dashboard/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: '/dashboard/parcels',
        element: <AdminRoute><AllParcel></AllParcel></AdminRoute>
      },
      {
        path: '/dashboard/all-user',
        element: <AdminRoute><AllUser></AllUser></AdminRoute>
      },
      {
        path: '/dashboard/delivery-men',
        element: <AdminRoute><AllDeliveryMen></AllDeliveryMen></AdminRoute>
      },
      {
        path: '/dashboard/my-delivery',
        element: <DeliverRoute><MyDeliverItems></MyDeliverItems></DeliverRoute>,
        
      },
      {
        path: '/dashboard/my-review',
        element: <DeliverRoute><MyReview></MyReview></DeliverRoute>
      },
      {
        path: '/dashboard/statistics',
        element: <AdminRoute><Statistics></Statistics></AdminRoute>
      },
      {
        path:'/dashboard/update/:id',
        element:<PrivateRoute><Update></Update></PrivateRoute>,
        loader:({params})=> fetch(`https://parcel-management-server-steel.vercel.app/order/${params.id}`)
      },
      {
        path:'/dashboard/payment/:id',
        element:<PrivateRoute><Payment></Payment></PrivateRoute>,
        loader:({params})=> fetch(`https://parcel-management-server-steel.vercel.app/order/${params.id}`)
      }
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
