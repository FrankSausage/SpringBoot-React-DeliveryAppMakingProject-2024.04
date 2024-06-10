import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './Route/ProtectedRoute';
import Home from './pages/Home';
// Users
import UserMain from './pages/Users/View/UserMain';
import OwnerMain from './pages/Users/View/OwnerMain';
import Address from './pages/Users/View/Address';
import SignIn from './pages/Users/SignIn';
import SignUp from './pages/Users/SignUp';
import Update from './pages/Users/Update';
// Stores
import Store from './pages/Stores/View/Store';
import StoreRegister from './pages/Stores/StoreRegister';
import StoreUpdate from './pages/Stores/StoreUpdate';
import StoreDetail from './pages/Stores/StoreDetail';
import StoreSearch from './pages/Stores/StoreSearch';
// Reviews
import MyReviews from './pages/Review/View/MyReviews';
import StoreReviews from './pages/Review/View/StoreReviews';
// Menus
import MenuRegister from './pages/Stores/Menus/MenuRegister';
import MenuUpdate from './pages/Stores/Menus/MenuUpdate';
// Order
import Order from './pages/Order/View/Order';
import OrderList from './pages/Order/OrderList';
import OwnerOrderList from './pages/Order/OwnerOrderList';
import { Success } from './pages/Order/Toss/SuccessPage';
import { Fail } from './pages/Order/Toss/FailPage';
// Dibs
import Dibs from './pages/Dibs/View/Dibs';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Signin', element: <SignIn />},
      { path: 'SignUp', element: <SignUp />},
      { path: 'Update', element: <ProtectedRoute><Update /></ProtectedRoute>},
      { path: 'Address', element: <ProtectedRoute><Address /></ProtectedRoute>},
      { path: 'Store', element: <ProtectedRoute><Store /></ProtectedRoute>},
      { path: 'Store/:category', element: <ProtectedRoute><Store /></ProtectedRoute>},
      { path: 'StoreSearch', element: <ProtectedRoute><StoreSearch /></ProtectedRoute>},
      { path: 'StoreRegister', element: <ProtectedRoute><StoreRegister /></ProtectedRoute>},
      { path: 'StoreUpdate', element: <ProtectedRoute><StoreUpdate /></ProtectedRoute>},
      { path: 'StoreUpdate/:storeId', element: <ProtectedRoute><StoreUpdate /></ProtectedRoute>},
      { path: 'StoreDetail/:storeId', element: <ProtectedRoute><StoreDetail /></ProtectedRoute>},
      { path: 'MyReviews', element: <ProtectedRoute><MyReviews /></ProtectedRoute>},
      { path: 'StoreReviews', element: <ProtectedRoute><StoreReviews /></ProtectedRoute>},
      { path: 'MenuRegister/:storeId', element: <ProtectedRoute><MenuRegister /></ProtectedRoute>},
      { path: 'MenuUpdate', element: <ProtectedRoute><MenuUpdate /></ProtectedRoute>},
      { path: 'UserMain', element: <UserMain />,},
      { path: 'OwnerMain', element: <OwnerMain />},
      { path: 'Order', element: <ProtectedRoute><Order /></ProtectedRoute>},
      { path: 'OrderList', element: <ProtectedRoute><OrderList /></ProtectedRoute>},
      { path: 'OwnerOrderList', element: <ProtectedRoute><OwnerOrderList /></ProtectedRoute>},
      { path: 'Dibs', element: <ProtectedRoute><Dibs /></ProtectedRoute>},
      { path: 'success', element: <Success />},
      { path: 'fail', element: <Fail />},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

reportWebVitals();
