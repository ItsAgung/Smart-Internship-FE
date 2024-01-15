import { useState } from "react";
import ParentLayout from "../components/ParentLayout";
import PosisiCardComp from "../components/home/PosisiCardComp";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import "animate.css";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export default function Posisi() {
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("user");
  const user = token
    ? jwtDecode(Cookies.get("user"))
    : useSelector((state) => state.myReducer.user);
  const [listPosisi, setListPosisi] = useState([]);
  const [check, setCheck] = useState(false);
  const [quotaFull, setQuotaFull] = useState(false);
  const [nodata, setNoData] = useState(false);

  async function getAllPosisi() {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/posisi`
      );

      if (response.data.data.length === 0) {
        setNoData(true);
      } else {
        setListPosisi(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.errors);
      setIsLoading(false);
    }
  }

  async function getPosisiById() {
    setIsLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/posisi?id=${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.data.length === 0) {
        setNoData(true);
      } else {
        setListPosisi(response.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.errors);
      const text = error.response.data.errors;
      // Gunakan ekspresi reguler untuk mencocokkan kata "profil"
      const regex = /\bkuota\b/i;

      // Gunakan metode test untuk memeriksa keberadaan kata "profil" dalam teks
      const isKuota = regex.test(text);

      if (isKuota) {
        setCheck(true);
        setQuotaFull(true);
      } else {
        setCheck(true);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!token) {
      getAllPosisi();
    } else {
      getPosisiById();
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <div className="flex w-full justify-center items-center min-h-screen">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <ParentLayout>
          <section className="max-w-full min-h-fit bg-gray-100">
            <div className="flex flex-col max-w-full justify-center py-12">
              <h1 className="text-3xl md:text-4xl font-extrabold text-center text-black ">
                Posisi Magang
              </h1>
              {nodata && (
                <div className="flex justify-center items-center rounded-xl py-6 shadow-sm bg-white my-14 mx-5 lg:mx-10">
                  <div className="flex flex-col gap-5 items-center px-16 py-10">
                    <img
                      src="assets/images/emptyico.png"
                      width="200px"
                      className="animate__animated animate__headShake"
                    />
                    <h1 className="font-bold text-2xl">
                      Belum Ada Posisi Tersedia
                    </h1>
                    <p>Silahkan Hubungi Admin!</p>
                  </div>
                </div>
              )}
              {check ? (
                quotaFull ? (
                  <div className="flex justify-center items-center rounded-xl py-6 shadow-sm bg-white my-14 mx-5 lg:mx-10">
                    <div className="flex flex-col gap-5 justify-center items-center px-16 py-10">
                      <img
                        src="assets/images/emptyico.png"
                        width="200px"
                        className="animate__animated animate__headShake"
                      />
                      <h1 className="font-bold text-2xl">
                        Kuota Instansi Anda Telah Penuh
                      </h1>
                      <p>Silahkan Hubungi Admin!</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center rounded-xl py-6 shadow-sm bg-white my-14 mx-5 lg:mx-10">
                    <div className="flex flex-col gap-5 items-center px-16 py-10">
                      <img
                        src="assets/images/emptyico.png"
                        width="200px"
                        className="animate__animated animate__headShake"
                      />
                      <h1 className="font-bold text-2xl">
                        Anda Belum Melengkapi Profil
                      </h1>
                      <p>Silahkan Lengkapi Profil Anda Terlebih Dahulu</p>
                      <Link
                        to="/lengkapiprofil"
                        className="btn capitalize bg-red-700 hover:bg-red-800 text-white w-52"
                      >
                        Lengkapi Profil
                      </Link>
                    </div>
                  </div>
                )
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center mx-5 lg:mx-20 py-10">
                  {listPosisi.map((data, index) => (
                    <PosisiCardComp
                      key={index}
                      content={data}
                      userid={user.id}
                      token={token}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
          <ToastContainer />
        </ParentLayout>
      )}
    </>
  );
}
