import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpComponent from "../components/auth/OtpComponent";

function OtpInput() {
  const location = useLocation();
  const user_id = location.state.id;
  const email = location.state.email;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const regex = /^[0-9]*$/; // Regex untuk hanya menerima angka
  const [otp, setOtp] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/activation`,
        {
          user_id: user_id,
          otp: otp,
        }
      );

      navigate(`/berhasilverif`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.response.data.errors);
    }
  };

  const handleSubmitOtp = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/auth/sendotp`,
        {
          id: user_id,
        }
      );
      toast.success(response.data.message);
      disableResendButton();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const [countdown, setCountdown] = useState(30);
  const [showButton, setShowButton] = useState(false);

  const disableResendButton = () => {
    setCountdown(30);
    setShowButton(false);
  };

  useEffect(() => {
    let interval = null;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowButton(true);
    }

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden font-quickSand">
      <div className=" flex flex-col items-center px-10 py-11">
        <h1 className="text-2xl font-bold mb-5">Masukkan Kode OTP</h1>
        <p className="text-xs font-medium mb-5">
          Ketik 6 digit kode yang dikirimkan ke{" "}
          <span className="font-bold">{email}</span>
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="flex gap-2 md:gap-5 mb-5">
            <OtpComponent
              value={otp}
              onChange={(otp) => {
                if (regex.test(otp)) {
                  setOtp(otp);
                }
              }}
            />
          </div>
          <button
            type="submit"
            className="bg-red-700 text-white font-medium w-full rounded-xl py-4 my-10"
            disabled={otp.length !== 6}
          >
            {isLoading ? (
              <span className="loading loading-dots loading-sm"></span>
            ) : (
              "Verifikasi"
            )}
          </button>
          <div className="text-xs font-bold ">
            {countdown > 0 ? <p>Resend OTP in {countdown} seconds</p> : <p></p>}
            {showButton && (
              <button onClick={handleSubmitOtp}>Resend OTP</button>
            )}
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default OtpInput;
