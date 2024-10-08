import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {  createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './index.css'
import { AddProduct, Cart, ChangePassword, Deliver, EditDetails, Home, Login, MyProducts, Ordered, Product, Signup, VerifyOtp } from './components/index.js'
import { Provider } from 'react-redux'
import {store} from "./store/store.js"
import { ToastContainer } from 'react-toastify'
import { loadDetails } from './components/Product.jsx'
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import { getOrderedItems } from './components/Ordered.jsx'
import { getOrderedItemsToDeliver } from './components/Deliver.jsx'
import { getMyProducts } from './components/MyProducts.jsx'
import { getCartItems } from './components/Cart.jsx'



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/verify-otp/:email' element={<VerifyOtp/>}/>
      <Route path='/product/:id' element={<Product/>} loader={loadDetails}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/change-password-otp/:email' element={<ChangePassword type={false}/>} />
      <Route path='login' element={<Login/>}/>
      <Route element={<ProtectedRoutes/>}>
      <Route path='/ordered' element={<Ordered />} loader={getOrderedItems} />
      <Route path='/deliver' element={<Deliver/>} loader={getOrderedItemsToDeliver}/>
      <Route path='/add-product' element={<AddProduct type="Add"/>}/>
      <Route path='/edit-product' element={<AddProduct type="Edit"/>}/>
      <Route path='/change-password' element={<ChangePassword type={true}/>}/>
      <Route path='/my-products' element={<MyProducts/>} loader={getMyProducts}/>
      <Route path='/edit-details' element={<EditDetails/>}/>
      <Route path='/cart' element={<Cart/>} loader={getCartItems}/>
      </Route>
      
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
