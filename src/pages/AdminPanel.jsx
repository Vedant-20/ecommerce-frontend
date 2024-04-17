import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";

function AdminPanel() {
  const user = useSelector((state) => state?.user?.user);
  const navigate=useNavigate()


  useEffect(()=>{
    if(user?.role !=='ADMIN'){
      navigate(`/`)
    }
  },[user])
  return (
    <div className="min-h-[calc(100vh-100px)]  flex">
      <aside className="bg-white min-h-full w-full max-w-32 md:max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-blue-600 text-4xl cursor-pointer relative flex justify-center">
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
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
        </div>

        <div>
          <nav className="grid p-4">
            <Link
              to={`all-users`}
              className="px-2 border-2 py-1 text-xl font-semibold text-center bg-lime-300 hover:bg-yellow-300"
            >
              All Users
            </Link>
            <Link to={`all-products`} className="px-2 py-1 text-xl font-semibold text-center bg-lime-300 hover:bg-yellow-300">
              Products
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-4 ">
        <Outlet/>
      </main>
    </div>
  );
}

export default AdminPanel;
