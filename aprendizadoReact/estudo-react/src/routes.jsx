import { createBrowserRouter } from 'react-router-dom'
import { Tasks } from './pages/tasks/index.jsx'
import { Login } from './pages/login/index.jsx'

export const routes = createBrowserRouter([
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/tasks',
      element: <Tasks />
    },
])