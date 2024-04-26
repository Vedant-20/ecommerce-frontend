import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Context from "./context";
import axiosInstance from "./axiosInstance/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const ForceLogOut = async () => {
    try {
      const response = await axiosInstance.post(`/users/logout`);

      localStorage.setItem("jwtToken", null);

      toast.success(response?.data?.message);

      dispatch(setUserDetails(null));
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/users/getuserdetails`);
      // console.log('User Details',response)

      toast.success(response.data.message);
      dispatch(setUserDetails(response.data.data));
      navigate(`/`);

      const token = localStorage.getItem("jwtToken");

      if (token === null) {
        ForceLogOut();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <>
      <Context.Provider value={{ fetchUserDetails }}>
        <ToastContainer
          position="top-center"
          autoClose={2}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Flip
        />
        <Header />
        <main className="min-h-[calc(100vh-100px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
