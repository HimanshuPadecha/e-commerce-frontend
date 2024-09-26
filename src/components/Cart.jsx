import React,{useEffect, useState} from 'react'
import { url } from '../url';
import { useLoaderData } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

function Cart() {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(products);
    
  }, []);

  const handleDelete = async(id) =>{

    try {
      const response = await axios.get(`${url}/users/remove-from-cart/${id}`,{withCredentials:true,timeout:5000})
      if(response){
        let products = productsLocal.filter(item => item._id !== id)
        setProductsLocal(products)
        toast.success("Product deleted from cart", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast",
        })
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
      
    }
    
  }
  const products = useLoaderData()
  const [productsLocal,setProductsLocal] = useState(products)
  return (
    <div className="container bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[70%] mx-auto mt-12 pt-16 ">
      
    {productsLocal.map((item, index) => (
      <Link to={`/product/${item._id}`}>
      <div
        key={item._id}
        className="card rounded-lg shadow-lg overflow-hidden w-[300px] mx-auto relative"
      >
        {/* Product Image */}
        <div className="w-full h-[200px]">
          <img
            src={item.picture}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <button className='minus' onClick={(e) => {
            e.preventDefault()
            handleDelete(item._id)
          }}>
          <div>
            <FaTrash /> {/* Trash icon */}
        </div>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-2 text-white">
            {item.title}
          </h2>
          <p className=" mb-4 text-white">{item.description}</p>
          <p className="text-lg font-semibold text-white mb-2">
            $ {item.price}
          </p>
        </div>
      </div>
    </Link>
    ))}
  </div>
  )
}

export default Cart

export const getCartItems = async()=>{
  try {
    const response = await axios.get(`${url}/users/get-cart`,{withCredentials:true,timeout:5000})
    if(response){
      // console.log(response);
      console.log(response.data["data"].Products);
      
      return response.data["data"].Products
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
