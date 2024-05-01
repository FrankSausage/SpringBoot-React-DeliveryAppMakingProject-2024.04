import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Store from './pages/Store';
import Update from './pages/Update';
import ProtectedRoute from './pages/ProtectedRoute';
import StoreRegister from './pages/StoreRegister';
import StoreUpdate from './pages/StoreUpdate';
import StoreDetail from './pages/StoreDetail';
// import StoreInto from './pages/StoreInto';
import UserMain from './components/UserMain';
import OwnerMain from './components/OwnerMain';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'Signin', element: <SignIn />},
      { path: 'SignUp', element: <SignUp />},
      { path: 'Store', element: <Store />},
      { path: 'Store/:category', element: <Store />},
      { path: 'Update', element: <ProtectedRoute><Update /></ProtectedRoute>},
      { path: 'StoreRegister', element: <StoreRegister />},
      { path: 'StoreUpdate', element: <StoreUpdate />},
      { path: 'StoreDetail', element: <StoreDetail />},
      // { path: 'StoreInto', element: <StoreInto />,},
      { path: 'UserMain', element: <UserMain />,},
      { path: 'OwnerMain', element: <OwnerMain />},
      
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