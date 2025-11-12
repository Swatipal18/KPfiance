import React from 'react';
import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom';
import App from '../App';
import Login from '../Component/Login/Login';
import PageNotFound from '../Component/pages/PageNotFound/PageNotFound';
import Customers from '../Component/Customers/CustomerPage';
import Dashboard from '../Component/Dashboard/Dashboard';
import AddCustomer from '../Component/Customers/AddCustomer/AddCustomer';
import Loans from '../Component/Loans/Loans';
import EMIManagement from '../Component/EMIManagement/EMIManagement';
import Receipt from '../Component/Receipt/Receipt';
import Reports from '../Component/Reports/Reports';
import Settings from '../Component/Settings/Settings';
const router = createHashRouter([
  {
    path: "*",
    element: <PageNotFound />
  },
  {
    path: "/Login",
    element: <Login />
  },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/Dashboard" replace /> },
      { path: '/Dashboard', element: <Dashboard /> },
      { path: '/Customers', element: <Customers /> },
      { path: '/AddCustomer', element: <AddCustomer /> },
      { path: '/Loans', element: <Loans /> },
      { path: '/EMIManagement', element: <EMIManagement /> },
      { path: '/Receipt', element: <Receipt /> },
      { path: '/Reports', element: <Reports /> },
      { path: '/Settings', element: <Settings /> },

    ],
  }
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
