import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import ProtectedRoute from './pages/ProtectedRoute';
import Home from './pages/Home';
import SignIn from './pages/Users/SignIn';
import SignUp from './pages/Users/SignUp';
import Update from './pages/Users/Update';
import Store from './pages/Stores/View/Store';
import StoreRegister from './pages/Stores/StoreRegister';
import StoreUpdate from './pages/Stores/StoreUpdate';
import StoreDetail from './pages/Stores/StoreDetail';
import UserMain from './pages/Users/View/UserMain';
import OwnerMain from './pages/Users/View/OwnerMain';
import Address from './pages/Users/View/Address';
import MenuRegister from './pages/Menus/MenuRegister';
import MenuUpdate from './pages/Menus/MenuUpdate';
import Order from './pages/Order/View/Order';
import StoreSearch from './pages/Stores/StoreSearch';

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
      { path: 'StoreDetail/:storeId', element: <StoreDetail />},
      { path: 'MenuRegister/:storeId', element: <MenuRegister />},
      { path: 'MenuUpdate', element: <MenuUpdate />},
      { path: 'MenuUpdate/:menuId', element: <MenuUpdate />},
      { path: 'UserMain', element: <UserMain />,},
      { path: 'OwnerMain', element: <OwnerMain />},
      { path: 'Order', element: <Order />},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();