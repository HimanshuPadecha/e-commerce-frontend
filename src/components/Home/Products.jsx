import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../url";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Products() {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const privious = () =>{
    if(page > 1 ){
        setPage(page - 1)
    }else{
        toast.success("No privious page", {
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

  const next = ()=>{
    if(page < totalPages){
        setPage(page + 1 )
    }else{
        toast.success("No next page", {
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
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${url}/products/get-products?page=${page}&limit=${limit}`
        );
        // console.log(response.data["data"].products);
        if (response) {
          setProducts(response.data["data"].products);
          setTotalPages(response.data["data"].totalPages);
          // console.log(products);
        }
      } catch (error) {
        if (error.response && error.response.data) {
          // Display server error message
        //   console.log(error.response.data);

          // setError(error.response.data.message || "An error occurred. Please try again.");

          toast.success(`${error.response.data.message}`, {
            position: "bottom-right",
            autoClose: 3000,
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
    };

    fetchProducts();
  }, [page]);

  return (
    <>
      <div className="container bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <Link to={`/product/${item._id}`}>
            <div
              key={item._id}
              className="card rounded-lg shadow-lg overflow-hidden w-[300px] mx-auto"
            >
              {/* Product Image */}
              <div className="w-full h-[200px]">
                <img
                  src={item.picture}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
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
      <div className="flex items-center justify-center mt-7">
        <button className="mr-5" onClick={privious}>Privious</button>
        <span>{page}/{totalPages}</span>
        <button className="ml-5" onClick={next}>Next</button>
      </div>
    </>
  );
}

export default Products;
