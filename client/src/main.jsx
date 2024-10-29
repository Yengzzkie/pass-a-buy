import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import RegisterForm from './routes/RegisterForm';
import App from './routes/App';
import Home from './routes/Home';

const router = createBrowserRouter([
  {path: "/", element: <Root />, children: [
    {path: "/", element: <App />},
    {path: "/register", element: <RegisterForm />},
    {path: "/home", element: <Home />}
  ]},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
