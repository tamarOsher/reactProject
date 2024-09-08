import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './context/user.context';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import { SignIn } from './components/signIn.component.tsx';
import { UserHome } from './components/userHome.component.tsx';
import { SignUp } from './components/singUp.component.tsx';
import { ManagerrHome } from './components/managerHome.component.tsx';
import { Meeting } from './components/meeting.component.tsx';
import AboutUs from './components/AboutUs.tsx';
import Services from './components/Services.tsx';
import FAQ from './components/FAQ.tsx';
import Contact from './components/Contact.tsx';
import Layout from './components/Layout.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/signIn",
        element: <SignIn />
      },
      {
        path: "/signUp",
        element: <SignUp />
      },
      {
        path: "/aboutUs",
        element: <AboutUs />
      },
      {
        path: "/services",
        element: <Services />
      },
      {
        path: "/FAQ",
        element: <FAQ />
      },
      {
        path: "/contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/home",
    element: <UserHome />,
  },
  {
    path: "/admin",
    element: <ManagerrHome />,
  },
  {
    path: "/meeting",
    element: <Meeting />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
);
