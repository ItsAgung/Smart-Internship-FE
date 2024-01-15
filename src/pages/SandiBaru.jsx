import ParentLayout from "../components/ParentLayout";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { Alert, Label, TextInput } from "flowbite-react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { HiInformationCircle } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SandiBaru = () => {
  const [show, setShow] = useState(false);
  const [confirmshow, setconfirmShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  async function handlesubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      new_password: e.target.password.value,
      new_confirmpassword: e.target.confpassword.value,
      token: token,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/resetpassword`,
        data
      );

      const message = "Kata Sandi Berhasil Dirubah!";
      setIsLoading(false);
      navigate("/masuk", { state: message });
    } catch (error) {
      setMessage(error.response.data.errors);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/error");
    }
  }, [token]);

  return (
    <ParentLayout>
      <section className="flex justify-center items-center w-full min-h-screen bg-gray-100">
        <div className="rounded-xl w-[90%] lg:w-3/4 h-fit p-10 bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-5">Ubah Kata Sandi</h1>
          {message ? (
            <Alert className="mb-5" color="failure" icon={HiInformationCircle}>
              <span>
                <p>
                  <span className="font-medium capitalize">{message}</span>
                </p>
              </span>
            </Alert>
          ) : (
            ""
          )}
          <form className="flex flex-col gap-5" onSubmit={handlesubmit}>
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
                className="btn btn-ghost bg-red-700 hover:bg-red-800 w-full lg:w-1/3 text-white capitalize font-normal"
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Simpan"
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </ParentLayout>
  );
};

export default SandiBaru;
