import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { url } from '../url'
import Loader from './Loader'

function AddProduct({type}) {

  const [title,setTitle] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState(0)
  const [picture,setPicture] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) =>{

    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.startsWith('image/')) {
      toast.error("Please upload a valid image file",{
          position: "bottom-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className:"toast"
        }
      );
      setPicture(null); // Reset the file if it's not a valid image
  } else {
      setPicture(selectedFile);  // Set the file if valid
  }
     console.log(picture);
  }

  const handleSubmit  = async(e) =>{
    e.preventDefault()
    

    if(!title || !description || !price ){
      toast.error("Please enter all the details for your product",{
        position: "bottom-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className:"toast"
      })
      return
    }
      console.log(picture);
      
      if(picture == null){
        toast.error("Please select image file for your product",{
          position: "bottom-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className:"toast"
        })
        return 
      }
      console.log(picture);
      

      setLoading(true)
      try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("picture", picture);
        const response = await axios.post(`${url}/products/add-product`,formData,{withCredentials:true,timeout:7000,headers:{

          "Content-Type":"multipart/form-data"
        }})
        if(response){
          toast.success("Your product added successfully",{
            position: "bottom-right",
            autoClose: 3000, 
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
      }
      setLoading(false)

    

  }

  return (
    <div className=" bg-black text-white p-4 mt-12">
    <div className="form-box m-auto mt-12 ">
      <form className="form" onSubmit={handleSubmit}>
        <span className="title">Add Product</span>
        <span className="subtitle">People will be able to buy it after you {type} the product</span>

        <div className="form-container">
          <input 
          type="text" 
          className="input mb-5" 
          placeholder="Title" 
          value={title}
          onChange={e=>setTitle(e.target.value)}
          />
          <input 
          type="text" 
          className="input mb-5" 
          placeholder="Description" 
          value={description}
          onChange={e=>setDescription(e.target.value)}
          />
          <input 
          type="number" 
          className="input mb-5" 
          placeholder="Price" 
          value={price}
          onChange={e=>setPrice(e.target.value)}
          />
          <span className="subtitle mb-3">Add the photo for the product</span>
          <input 
          type="file"
          className="input mb-5" 
          placeholder="Photo" 
          onChange={handleFileChange}
          />
        </div>

        <button type="submit" className='flex items-center justify-center' disabled={loading}>
          {loading ? <Loader /> : type}
        </button>
      </form>

    </div>
    </div>
  )
}

export default AddProduct
