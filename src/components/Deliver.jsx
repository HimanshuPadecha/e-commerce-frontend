import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import axios  from 'axios';
import { url } from '../url';
import { useLoaderData } from 'react-router-dom';

function Deliver() {

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(products);

  }, []);

  const products = useLoaderData()
  return (
    <div className='container bg-black mt-12 min-h-screen w-[70%] mx-auto flex items-center justify-start flex-col text-white p-8'>
     {products.map(product => (
      <div key={product._id} className='w-full card p-4 h-[100px] rounded-lg flex items-center justify-around'>
        <div>
        <h1 className='text-xl mb-2'>Product to deliver : {product.Product["title"]}</h1>
        <h2>Price : ${product.Product['price']}</h2>
        </div>
        <div>
          <h1 className='mb-1'>Customer : {product.Customer['username']}</h1>
          <h1 className='mb-1'>Email : {product.Customer['email']}</h1>
          <h1 className='mb-1'>Address : {product.Customer['address']}</h1>
        </div>
      </div>
     ))}
    </div>
  )
}

export default Deliver

export const getOrderedItemsToDeliver = async()=>{
  try {
    const response = await axios.get(`${url}/users/get-orders-to-deliver`,{withCredentials:true,timeout:5000})
    if(response){
      console.log(response);
      return response.data["data"]
    }
  } catch (error) {
    if (error.response && error.response.data) {
      // Display server error message
      console.log(error.response.data);

      toast.success(`${error.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
    } else if (error.code == "ECONNABORTED") {
      toast.success("Request timed out...", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
    } else {
      // Fallback to generic error message if no response data
      toast.success("Unexpected error occoured !!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
    }
    console.log(error);
    return null
  }
}
