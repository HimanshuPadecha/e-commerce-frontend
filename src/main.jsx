import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {  createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import { AddProduct, Cart, ChangePassword, Deliver, EditDetails, Home, Login, MyProducts, Ordered, Product, Signup, VerifyOtp } from './components/index.js'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"
import { ToastContainer } from 'react-toastify'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/ordered' element={<Ordered />} />
      <Route path='/deliver' element={<Deliver/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/add-product' element={<AddProduct type="Add"/>}/>
      <Route path='/edit-product' element={<AddProduct type="Edit"/>}/>
      <Route path='/change-password' element={<ChangePassword/>}/>
      <Route path='/my-products' element={<MyProducts/>}/>
      <Route path='/edit-details' element={<EditDetails/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/verify-otp' element={<VerifyOtp/>}/>
      <Route path='/product/:id' element={<Product/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    <ToastContainer />
    </Provider>
  </StrictMode>,
)
