import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import axios from "axios";
import { url } from "../../url";
import Loader from "../Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Products from "./Products";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {login, logout} from "../../store/auth.reducer"

const Home = () => {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);

    const checkForLogin = async ()=>{
      console.log(isLoggedIn);
      
      if(isLoggedIn){
        return
      }else{
        
        const userData = await axios.get(`${url}/users/get-current-user`,{withCredentials:true,timeout:5000})
        console.log(userData);
        if(userData){
          dispatch(login(userData.data))
        }else{
          dispatch(logout())
        }
        
      }
    }
    checkForLogin()
  }, []);


  const handleSearch = async () => {
    setError("");

    if (search === "") {
      toast.success(`Search bar is empty`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: "toast",
      });
      return
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${url}/users/search-product`,
        { query: search },
        { withCredentials: true, timeout: 5000 }
      );
      console.log(response);

      if (response) {
        const products = response.data["data"];
        if (!products.length) {
          toast.success(`No product exits`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
        } else {
          toast.success(`Products found`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className: "toast",
          });
          setProducts(products);
        }
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
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="w-full max-w-5xl mx-auto pt-20">
        {/* Search Bar with Button */}

        <div className="flex justify-center mb-12 mt-10 space-x-8">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full max-w-xl p-2 text-white bg-transparent border-2 border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 "
            onClick={handleSearch}
          >
            Search
          </button>
          {loading ? <Loader /> : ""}
        </div>

        <div className="container bg-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item, index) => (
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

        <Hero />

        {/* New Arrivals Heading */}
        <h2 className="text-3xl font-italic text-white mb-12 text-center mt-12">
          -- products --
        </h2>

        <Products />
      </div>
    </div>
  );
};

export default Home;
