import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../reducer/myReducer";
import jwtDecode from "jwt-decode";

const LoginComp = () => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function login(e) {
    setIsLoading(true);
    e.preventDefault();

    const dataForm = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/login`,
        dataForm
      );

      if (result.data.id) {
        const datas = {
          id: result.data.id,
          email: result.data.email,
        };
        navigate(`/verify`, { state: datas });
      } else {
        Cookies.set("user", result.data.data.token, {
          expires: 1,
        });
        dispatch(setUser(jwtDecode(Cookies.get("user"))));
        dispatch(setToken(Cookies.get("user")));
        const role = jwtDecode(Cookies.get("user"));
        if (role.role === "USER") {
          window.location.href = "/";
        } else if (role.role === "ADMIN" || role.role === "SUPERADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/unauthorized");
        }
      }
    } catch (error) {
      const result = error.response.data.errors.split(".");
      result.forEach((element) => {
        toast.error(element);
      });
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={login}>
      <div className="space-y-6">
        <Link className="flex justify-center mb-5" to="/">
          <img src="assets/images/logo.png" className="w-1/2" alt="GCI Logo" />
        </Link>
        <h3 className="flex text-xl font-bold justify-center text-gray-900 dark:text-white">
          Masuk
        </h3>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput id="email" placeholder="name@company.com" required />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Sandi" />
          </div>

          <div className="relative">
            <TextInput
              id="password"
              type={show ? "text" : "password"}
              required
            />
            {show ? (
              <FaRegEye
                onClick={() => setShow(!show)}
                className="cursor-pointer transform hover:scale-90 absolute top-3 right-3"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setShow(!show)}
                className="cursor-pointer transform hover:scale-90 absolute top-3 right-3"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to="/lupasandi"
            className="text-sm text-cyan-700 hover:underline dark:text-cyan-500"
          >
            Lupa sandi?
          </Link>
        </div>
        <div className="w-[85%] grid grid-cols-2 gap-4 mx-auto ">
          <Link
            to="/daftar"
            className="btn btn-ghost bg-gray-100 hover:bg-white text-black border border-gray-100 hover:border-gray-100 capitalize"
          >
            Daftar
          </Link>
          <button
            type="submit"
            className="btn btn-ghost bg-red-700 hover:bg-red-800 text-white capitalize"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Masuk"
            )}
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default LoginComp;
