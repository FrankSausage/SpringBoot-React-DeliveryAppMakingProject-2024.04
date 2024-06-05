import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
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
// Dibs
import Dibs from './pages/Dibs/View/Dibs';
import TossChackOut from './pages/Order/Toss/TossCheckOut';
import { Success } from './pages/Order/Toss/SuccessPage';
import { Fail } from './pages/Order/Toss/FailPage';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Signin', element: <SignIn />},
      { path: 'SignUp', element: <SignUp />},
      { path: 'Update', element: <ProtectedRoute><Update /></ProtectedRoute>},
      { path: 'Address', element: <Address />},
      { path: 'Store', element: <ProtectedRoute><Store /></ProtectedRoute>},
      { path: 'Store/:category', element: <ProtectedRoute><Store /></ProtectedRoute>},
      { path: 'StoreSearch', element: <ProtectedRoute><StoreSearch /></ProtectedRoute>},
      { path: 'StoreRegister', element: <StoreRegister />},
      { path: 'StoreUpdate', element: <StoreUpdate />},
      { path: 'StoreUpdate/:storeId', element: <StoreUpdate />},
      { path: 'StoreDetail/:storeId', element: <StoreDetail />},
      { path: 'MyReviews', element: <MyReviews />},
      { path: 'StoreReviews', element: <StoreReviews />},
      { path: 'MenuRegister/:storeId', element: <MenuRegister />},
      { path: 'MenuUpdate', element: <MenuUpdate />},
      { path: 'UserMain', element: <UserMain />,},
      { path: 'OwnerMain', element: <OwnerMain />},
      { path: 'Order', element: <Order />},
      { path: 'OrderList', element: <OrderList />},
      { path: 'OwnerOrderList', element: <OwnerOrderList />},
      { path: 'Dibs', element: <Dibs />},
      { path: 'CheckOut', element: <TossChackOut />},
      { path: 'success', element: <Success />},
      { path: 'fail', element: <Fail />},

    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
