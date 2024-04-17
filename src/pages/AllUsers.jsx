import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance/axiosInstance";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id:""
  });

  const fetchAllUsers = async () => {
    try {
      const response = await axiosInstance.get(`/users/get-all-users`);
      // console.log(response)
      setAllUsers(response?.data?.data);

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="bg-black text-white">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registration Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.role}</td>
              <td>{moment(user?.createdAt).format("LL")}</td>
              <td>
                <button
                  className="bg-lime-400 rounded-full p-2 cursor-pointer text-3xl hover:bg-lime-600 hover:text-white"
                  onClick={() => {
                    setUpdateUserDetails(user)
                    setOpenUpdateRole(true)
                  }}
                >
                  <MdModeEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails?.name}
          email={updateUserDetails?.email}
          role={updateUserDetails?.role}
          userId={updateUserDetails?._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
}

export default AllUsers;
