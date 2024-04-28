import React, { useContext, useState } from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import Context from "../context";

function Header() {
  const user = useSelector((state) => state?.user?.user);

  const dispatch = useDispatch();
  const context = useContext(Context);
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post(`/users/logout`);

      localStorage.setItem("jwtToken", null);

      toast.success(response?.data?.message);

      dispatch(setUserDetails(null));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;

    if (value) {
      navigate(`/search?q=${value}`);
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed z-40 w-full">
      <div className="h-full container mx-auto flex items-center justify-between px-4">
        <Link to={"/"}>
          <div className="cursor-pointer">
            <img src={logo} className="w-[70px] h-[70px]" alt="logo" />
          </div>
        </Link>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow  pl-2">
          <input
            type="text"
            placeholder="Search Product Here..."
            className="w-full outline-none"
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] h-8 flex items-center justify-center bg-blue-600 rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative  flex justify-center">
            {user?._id && (
              <div
                className="text-blue-600 text-3xl cursor-pointer"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    className="w-10 h-10 rounded-full"
                    src={user?.profilePic}
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {user?.role === "ADMIN" && menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded ">
                <nav>
                  <Link
                    to={`admin-panel/all-products`}
                    className="whitespace-nowrap hover:bg-slate-100 p-2"
                    onClick={() => setMenuDisplay((prev) => !prev)}
                  >
                    Admin Panel
                  </Link>
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={`/cart`} className="text-2xl relative">
              <span>
                <FaShoppingCart />
              </span>
              <div className="bg-red-500 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-2 py-1 border-2 font-bold border-gray-600 hover:border-gray-900 bg-white/85 hover:bg-slate-400 rounded-md"
              >
                Logout
              </button>
            ) : (
              <Link
                to={`/login`}
                className="px-2 py-1 border-2 font-bold border-gray-600 hover:border-gray-900 bg-white/85 hover:bg-slate-400 rounded-md"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
