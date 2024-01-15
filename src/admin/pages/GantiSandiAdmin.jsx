import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Alert, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

const GantiSandiAdmin = ({ title }) => {
  const [passnow, setPassNow] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmshow, setconfirmShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.myReducer.token);

  async function handlesubmit(e) {
    setIsLoading(true);
    e.preventDefault();

    const data = {
      password: e.target.passwordnow.value,
      new_password: e.target.password.value,
      new_confirmpassword: e.target.confpassword.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/user/changepassword`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const message = "Kata Sandi Berhasil Dirubah!";
      setIsLoading(false);
      toast.success(message);
      setTimeout(() => {
        Cookies.remove("user");
        navigate(0);
      }, 2000);
    } catch (error) {
      setMessage(error.response.data.errors.split("."));
      setIsLoading(false);
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h1 className="text-2xl font-bold mb-5 text-black dark:text-white">
        {title}
      </h1>

      {message
        ? message.map((data, index) => (
            <Alert
              className="mb-5"
              color="failure"
              icon={HiInformationCircle}
              key={index}
            >
              <span>
                <p>
                  <span className="font-medium capitalize">
                    {message[index]}
                  </span>
                </p>
              </span>
            </Alert>
          ))
        : ""}
      <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
        <div>
          <div className="block">
            <Label htmlFor="passwordnow" value="Kata Sandi Sekarang" />
          </div>

          <div className="relative">
            <TextInput
              id="passwordnow"
              name="passwordnow"
              type={passnow ? "text" : "password"}
              required
            />
            {passnow ? (
              <FaRegEye
                onClick={() => setPassNow(!passnow)}
                className="cursor-pointer transform hover:scale-90 absolute top-3 right-3"
              />
            ) : (
              <FaRegEyeSlash
                onClick={() => setPassNow(!passnow)}
                className="cursor-pointer transform hover:scale-90 absolute top-3 right-3"
              />
            )}
          </div>
        </div>
        <div>
          <div className="block">
            <Label htmlFor="password" value="Kata Sandi Baru" />
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
            <Label
              htmlFor="confpassword"
              value="Masukan ulang Kata Sandi Baru"
            />
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
        <div className="flex justify-center">
          <button
            type="submit"
            className="btn btn-ghost bg-[#4F6079] hover:bg-[#384252] w-full lg:w-1/4 text-white capitalize font-normal"
          >
            {isLoading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default GantiSandiAdmin;
