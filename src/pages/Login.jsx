import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginComp from "../components/auth/LoginComp";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ParentLayout from "../components/ParentLayout";

const Login = () => {
  const location = useLocation();
  const message = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get("user")) {
      navigate("/");
    } else {
      navigate("/masuk");
      toast.success(message);
    }
  }, [Cookies.get("user")]);
  return (
    <ParentLayout>
      <section className="max-w-full h-fit py-24 bg-gray-100 flex justify-center items-center">
        <main className="rounded-xl md:w-1/3 w-[90%] h-fit p-6 bg-white shadow-md">
          <LoginComp />
        </main>
        <ToastContainer />
      </section>
    </ParentLayout>
  );
};

export default Login;
