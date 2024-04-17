import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../store/userSlice";

function ChangeUserRole({ name, email, role, userId, onClose, callFunc }) {
  const [userRole, setUserRole] = useState(role);
  const dispatch=useDispatch()

  const [payload, setPayload] = useState({
    email: email,
    name: name,
    role: userRole,
    userId: userId,
  });

  const handleOnChangeSelect = (e) => {
    const selectedRole = e.target.value;
    setUserRole(selectedRole);
    setPayload((prevPayload) => ({
      ...prevPayload,
      role: selectedRole,
    }));
  };

  const updateUserRole = async () => {
   
    try {
      const response = await axiosInstance.patch(
        `/users/update-user`,
        {
          ...payload,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response)
      toast.success(response?.data?.message);
      dispatch(setUserDetails(response?.data?.data))
      onClose();
      callFunc();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-100 bg-opacity-60">
      <div className="w-full mx-auto bg-white shadow-md p-4 max-w-sm">
        <button className="block ml-auto hover:animate-spin" onClick={onClose}>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p>Name: {name} </p>
        <p>Email: {email} </p>
        <div className="flex justify-between items-center my-4">
          <p>Role: </p>

          <select
            className="border px-4 py-1 "
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            <option value="ADMIN">ADMIN</option>
            <option value="GENERAL">GENERAL</option>
          </select>
        </div>

        <button
          className="w-fit mx-auto block p-2 rounded-md bg-blue-600 text-white hover:bg-red-500"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
}

export default ChangeUserRole;
