import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './store.js';
import { Provider } from 'react-redux';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './pages/Home.jsx';
import Notes from './pages/Notes.jsx';
import ViewNote from './pages/ViewNote.jsx';
import {Toaster} from 'react-hot-toast'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />}></Route>
      <Route path='notes' element={<Notes />}></Route>
      <Route path='notes/:id' element={<ViewNote/>}></Route>
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
      <RouterProvider router={router}>
        <App />
        
      </RouterProvider>
      <Toaster/>
    </Provider>
    
  </StrictMode>,
)
