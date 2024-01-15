import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import BackComponent from "../utils/BackComponent";
import { useNavigate } from "react-router-dom";

const RegisterComp = () => {
  const [show, setShow] = useState(false);
  const [confirmshow, setconfirmShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function register(e) {
    setIsLoading(true);
    e.preventDefault();

    const user = {
      name: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmpassword: e.target.confpassword.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/register`,
        user
      );
      const datas = {
        id: response.data.data.id,
        email: response.data.data.email,
      };
      navigate(`/verify`, { state: datas });
    } catch (error) {
      setIsLoading(false);
      const result = error.response.data.errors.split(".");
      result.forEach((element) => {
        toast.error(element);
      });
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <BackComponent props="/" />
      </div>
      <Link className="flex justify-center mb-5" to="/">
        <img src="assets/images/logo.png" className="w-1/2" alt="GCI Logo" />
      </Link>
      <h3 className="flex text-2xl font-medium text-gray-900 dark:text-white">
        Daftar
      </h3>

      <form onSubmit={register}>
        <div>
          <div className="block">
            <Label htmlFor="nama" value="Nama Lengkap" />
          </div>
          <TextInput
            placeholder="Masukan Nama Anda"
            id="nama"
            name="fullname"
            required
          />
        </div>

        <div>
          <div className="block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            name="email"
            placeholder="example@gmail.com"
            required
          />
        </div>

        <div>
          <div className="block">
            <Label htmlFor="password" value="Sandi" />
          </div>

          <div className="relative">
            <TextInput
              id="password"
              name="password"
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
        <div>
          <div className="block">
            <Label htmlFor="confpassword" value="Konfirmasi Sandi" />
          </div>

          <div className="relative">
            <TextInput
              id="confpassword"
              name="confpassword"
              type={confirmshow ? "text" : "password"}
              required
            />
            {confirmshow ? (
              <FaRegEye
                onClick={() => setconfirmShow(!confirmshow)}
                className="cursor-pointer transform hover:scale-90 absolute top-3 right-3"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setconfirmShow(!confirmshow)}
                className="cursor-pointer transform hover:scale-90 absolute top-3 right-3"
              />
            )}
          </div>
        </div>

        <ToastContainer />

        <button
          type="submit"
          className="btn btn-ghost bg-red-700 w-full hover:bg-red-800 text-white capitalize !mt-6"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Daftar"
          )}
        </button>
      </form>

      <span className="text-sm  w-full inline-block mx-auto text-black font-medium text-center">
        Sudah memiliki akun?{" "}
        <Link className="text-red-600" to="/masuk">
          Masuk
        </Link>
      </span>
    </div>
  );
};

export default RegisterComp;
