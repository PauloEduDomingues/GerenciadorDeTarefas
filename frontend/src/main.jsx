import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { AuthProvider } from './contexts/auth'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={routes}/>
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        theme="light"
      />
    </AuthProvider>
  </StrictMode>,
)
