import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './app/store';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import SuccessSignup from './pages/SuccessSignup';
import 'bootstrap/dist/css/bootstrap.min.css';
import EmailValidation from './pages/EmailValidation';
import Product from './pages/Product';
import ProtectedRoute from './components/features/ProtectedRoute';
import MyProducts from './pages/MyProducts';
import Layout from './components/features/Layout';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <Profile />
          }
        ]
      },
      {
        path: '/product/:productID',
        element: <Product />
      },
      {
        path: '/my-products',
        element: <ProtectedRoute />,
        children: [
          {
            path: '',
            element: <MyProducts />
          }
        ]
      },
      {
        path: '/sign-in',
        element: <Signin />
      },
      {
        path: '/sign-up',
        element: <Signup />
      },
      {
        path: '/sign-up/success',
        element: <SuccessSignup />
      },
      {
        path: '/signup-validation',
        element: <EmailValidation />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
