import ParentLayout from "../components/ParentLayout";
import axios from "axios";
import { Alert, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { HiInformationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const LupaPass = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [info, setInfo] = useState("");

  async function handlesubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const user = {
      email: e.target.email.value,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/forgotpassword`,
        user
      );
      setInfo(response.data.message);
      setIsError("");
      setIsLoading(false);
    } catch (error) {
      setIsError(error.response.data.errors);
      setInfo("");
      setIsLoading(false);
    }
  }

  return (
    <ParentLayout>
      <section className="flex justify-center items-center w-full h-fit py-24 bg-gray-100">
        <div className="rounded-xl w-[90%] lg:w-3/4 h-fit p-10 bg-white shadow-md">
          <h1 className="text-2xl font-bold mb-5">Lupa Kata Sandi</h1>
          {isError ? (
            <Alert className="mb-5" color="failure" icon={HiInformationCircle}>
              <span>
                <p>
                  <span className="font-medium capitalize">{isError}</span>
                </p>
              </span>
            </Alert>
          ) : (
            ""
          )}
          {info ? (
            <Alert className="mb-5" color="success" icon={HiInformationCircle}>
              <span>
                <p>
                  <span className="font-medium capitalize">{info}</span>
                </p>
              </span>
            </Alert>
          ) : (
            ""
          )}
          <form onSubmit={handlesubmit}>
            <Label htmlFor="email" value="Masukan Email Yang Terdaftar" />
            <TextInput
              id="email"
              name="email"
              placeholder="name@example.com"
              required
              type="email"
            />
            <div className="mt-7 flex flex-col gap-3 w-full justify-center items-center">
              <button
                type="submit"
                className="btn btn-ghost bg-red-700 hover:bg-red-800 w-full lg:w-1/3 text-white capitalize font-normal"
              >
                {isLoading ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Kirim"
                )}
              </button>
              <Link
                to="/"
                className="btn btn-ghost bg-white border border-gray-500 w-full lg:w-1/3 text-black capitalize font-normal"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </form>
        </div>
      </section>
    </ParentLayout>
  );
};

export default LupaPass;
