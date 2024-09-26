import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { url } from '../url';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {login} from "../store/auth.reducer"
import Loader from './Loader';

const Product = () => {

  const product = useLoaderData()
  const userData = useSelector(state => state.auth.userData)
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const [feedbacks,setFeedbacks] = useState(product.feedbacks)
  const [input,setInput] = useState("")

  useEffect(() => {
    // Scroll to the top of the page when this component mounts
    window.scrollTo(0, 0);

    const getData = async()=>{
      const userData = await axios.get(`${url}/users/get-current-user`,{withCredentials:true,timeout:5000})
      if(userData){
        dispatch(login(userData.data))
        console.log(product);
        
      }
    }
    getData()
  }, []);


  const handleBuyNow = async()=>{
      if(userData.balance < product.price){
        toast.success("You don't have enough money to buy this product",{
          position:"bottom-right",
          autoClose:3000,
          hideProgressBar:false,
          closeOnClick:true,
          pauseOnHover:true,
          draggable:true,
          progress:undefined,
          className:"toast"
        })
        return
      }    
      setLoading(true)
      try {
        const response = await axios.post(`${url}/users/place-order/${product._id}`,{},{withCredentials:true,timeout:7000 })
        if(response){
          toast.success("Order placed successfully 🎉",{
            position:"bottom-right",
            autoClose:3000,
            hideProgressBar:false,
            closeOnClick:true,
            pauseOnHover:true,
            draggable:true,
            progress:undefined,
            className:"toast"
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
        console.log(error);
      }
      setLoading(false)
  }

  const handleAddToCart = async () =>{
    setLoading(true)
    try {
      const response = await axios.post(`${url}/users/add-to-cart/${product._id}`,{},{withCredentials:true,timeout:5000})
      if(response){
        toast.success("Product added to your cart !!", {
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
    }
    setLoading(false)
  }

  const handleAddFeedback = async () =>{
    if(!input){
      toast.success("Content for feedback is empty", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
      return
    }

    try {
      const response = await axios.post(`${url}/feedbacks/add-feedback/${product._id}`,{content:input},{withCredentials:true,timeout:5000})
      if(response){
        toast.success("Your feedback is added", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast",
        });
        setFeedbacks([...feedbacks,{content:input,owner:{username:userData.username}}])
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
    }
  } 

  return (
    <div className="min-h-screen bg-black mt-12 p-8 flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 flex w-full max-w-5xl mb-8">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={product.picture}
            alt={product.title}
            className="w-full h-auto object-cover rounded-md"
          />
        </div>

        {/* Product Info */}
        <div className="w-1/2 pl-8 flex flex-col justify-between">
          {/* Product Title */}
          <h2 className="text-3xl font-bold mb-4">{product.title}</h2>

          {/* Product Description */}
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          {/* Product Price */}
          <p className="text-2xl font-semibold text-green-600 mb-6">${product.price}</p>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition flex items-center justify-center addToCart" disabled={loading} onClick={handleAddToCart}>
            {loading ? <Loader /> : "Add to cart"}
              
            </button>
            <button className="bg-green-500 text-white rounded-md hover:bg-green-600 transition buynow flex items-center justify-center" onClick={handleBuyNow} disabled={loading}>
              {loading ? <Loader /> : "Buy Now"}
            </button>
          </div>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="card text-white rounded-lg p-6 w-full max-w-5xl">
        <h3 className="text-2xl font-bold mb-4">Customer Feedback</h3>
        
        {/* Example Feedbacks */}
        <div className="space-y-4">
          {feedbacks.map((feedback,index) => (
              <div className="bg-gray-700 p-4 rounded-lg" key={index}>
              <p className="text-gray-300 mb-2"><strong>{feedback.owner["username"]}</strong></p>
              <p>{feedback.content}</p>
            </div>
          ))}

         
        </div>

        <div className="flex items-center space-x-4 mt-10">
          <input
            type="text"
            placeholder="Add your feedback..."
            className="w-96 p-2 rounded-md bg-white text-black border-none focus:outline-none"
            value={input}
            onChange={e=>setInput(e.target.value)}
          />
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition" onClick={handleAddFeedback}>
            Add 
          </button>
        </div>

      </div>
    </div>
  );
};

export default Product;


export const loadDetails = async ({params})=>{
  const {id} = params
  try {
    const response = await axios.get(`${url}/products/get-product-by-id/${id}`,{withCredentials:true,timeout:5000})
    if(response){
      // console.log(response.data["data"]);
     
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


