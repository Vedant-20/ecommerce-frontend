import React, { useContext, useState } from "react";
import signin from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Context from "../context";

function Login() {
  const navigate=useNavigate()
  const {fetchUserDetails}=useContext(Context)
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signin`,data,{withCredentials:true})
      // console.log(response)
      localStorage.setItem('jwtToken',response?.data?.data)
      
      toast.success(response?.data?.message)
      
      navigate(`/`)
      fetchUserDetails()
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <section id="login">
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-4 w-full max-w-sm mx-auto rounded-md">

        <div className="w-20 h-20 mx-auto ">
            <img src={signin} alt="signin logo" />
          </div>
          

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  placeholder="Enter Email ..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password ..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={`/forgot-password`}
                className="w-fit block ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>

            <button
              type="submit"
              className="px-6 py-2 w-full max-w-[150px]  border-2 font-bold border-gray-600 hover:border-gray-900 bg-white/85 hover:bg-slate-400 rounded-md hover:scale-110 transition-all mx-auto block mt-6"
            >
              Login
            </button>
          </form>

          <p className="my-5">
            Don't have an account ?{" "}
            <Link
              className="text-red-500 hover:text-red-700 hover:underline "
              to={`/sign-up`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
