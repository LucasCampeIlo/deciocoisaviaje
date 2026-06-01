// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router/dom"

import './index.css'

import App from './App.jsx'
import Inclusao from './Inclusao.jsx';
import Pesquisa from './Pesquisa.jsx';
import Favoritos from './favoritos.jsx';

const router = createBrowserRouter([
  { path: "/", Component: App },
  { path: "inclusao", Component: Inclusao },
  { path: "pesquisa", Component: Pesquisa },
  { path: "favoritos", Component: Favoritos },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)