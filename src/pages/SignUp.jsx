import React, { useState } from 'react'
import signin from "../assets/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from '../helpers/imageToBase64';
import axios from 'axios';
import { toast } from 'react-toastify';



function SignUp() {
  const navigate=useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword:"",
    profilePic:""
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

  const handleUploadPic=async(e)=>{
      e.preventDefault();
      const file=e.target.files[0]

      const imagePic=await imageToBase64(file)

      setData((prev)=>{
        return {
          ...prev,
          profilePic:imagePic
        }
      })

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();

    if(data.password===data.confirmPassword){
      const signupdata=JSON.stringify(data)

      try {
        const response=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users/signup`,signupdata,{
          withCredentials:true,
          headers:{
            "Content-Type": 'application/json'
          }
        })

        // console.log('Signup response',response)

        toast.success(response.data.message)

        navigate(`/login`)
      } catch (error) {
        
        toast.error(error.message)
      }
    } else{
      
      toast.error('Password and Confirm Password does not match')
    }
    
    
  }


 
  return (
    <section id="signup">
      <div className="mx-auto container p-4 ">
        <div className="bg-white p-4 w-full max-w-sm mx-auto rounded-md">
        <div className="w-20 h-20 mx-auto relative  overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || signin} alt="signin logo" />
            </div>
            <form >
            <label >
            <div className="text-xs bg-opacity-80 cursor-pointer bg-slate-200 pb-4 pt-1 text-center absolute bottom-0 w-full">
              Upload Photo
            </div>
              <input className='hidden' accept='image/*' type="file" onChange={handleUploadPic} />
            </label>
            
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
          <div className="grid">
              <label>Name: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  required
                  value={data.name}
                  onChange={handleOnChange}
                  placeholder="Enter Name ..."
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div className="grid">
              <label>Email: </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  required
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
                  required
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
              
            </div>
            <div>
              <label>Confirm Password: </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  placeholder="Enter Confirm Password ..."
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <span>{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              
            </div>

            <button type="submit" className="px-6 py-2 w-full max-w-[150px]  border-2 font-bold border-gray-600 hover:border-gray-900 bg-white/85 hover:bg-slate-400 rounded-md hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>
          </form>

          <p className="my-5">
            Already have an account ?{" "}
            <Link
              className="text-red-500 hover:text-red-700 hover:underline "
              to={`/login`}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}

export default SignUp