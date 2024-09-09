import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Tasks } from './pages/tasks'
import { Login } from './pages/login'
import { Register } from './pages/register'
import { ProtectedLayout } from './layout/ProtectedLayout'

export const routes = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/login" />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/tasks',
      element: <ProtectedLayout />,
      children: [
        {
          path: '',
          element: <Tasks />
        }
      ]
    },
])