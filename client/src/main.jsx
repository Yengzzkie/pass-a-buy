import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/Root';
import NewUser from './routes/NewUser';
import App from './routes/App';

const router = createBrowserRouter([
  {path: "/", element: <Root />, children: [
    {path: "/", element: <App />},
    {path: "/newuser", element: <NewUser />}
  ]},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
