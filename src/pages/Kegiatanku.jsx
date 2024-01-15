import { useState } from "react";
import StatusComponent from "../components/kegiatanku/StatusComponent";
import KegiatanComponent from "../components/kegiatanku/KegiatanComponent";
import ParentLayout from "../components/ParentLayout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Kegiatanku = () => {
  const [openTab, setOpenTab] = useState("status");
  const isLogin = useSelector((state) => state.myReducer.isLogin);

  const handleTabStatus = () => {
    setOpenTab("status");
  };

  const handleTabKegiatan = () => {
    setOpenTab("kegiatan");
  };

  return (
    <ParentLayout>
      <section className="bg-gray-100 py-8">
        <div className="tabs flex rounded-xl py-6 mb-6 shadow-sm bg-white mx-5 lg:mx-10">
          <div className="flex gap-5 w-full justify-around lg:justify-evenly">
            <button
              onClick={handleTabStatus}
              className={`tab tab-bordered text-xs sm:text-sm font-semibold ${
                openTab === "status" ? "tab-active" : ""
              }`}
            >
              Status Pendaftaran
            </button>
            <button
              onClick={handleTabKegiatan}
              className={`tab tab-bordered text-xs sm:text-sm font-semibold ${
                openTab === "kegiatan" ? "tab-active" : ""
              }`}
            >
              Kegiatan Aktif
            </button>
          </div>
        </div>
        {isLogin ? (
          openTab === "status" ? (
            <StatusComponent />
          ) : (
            <KegiatanComponent />
          )
        ) : (
          <div className="flex justify-center items-center rounded-xl py-6 shadow-sm bg-white mx-5 lg:mx-10">
            <div className="flex flex-col gap-5 justify-center items-center text-center px-16 py-5">
              <img
                src="assets/images/emptyico.png"
                width="200px"
                className="animate__animated animate__headShake"
              />
              <h1 className="font-bold text-xl">Anda Belum Masuk!</h1>
              <p>Silahkan Masuk ke Akun Anda Terlebih Dahulu</p>
              <Link
                to="/masuk"
                className="btn  bg-red-700 hover:bg-red-800 text-white w-52"
              >
                Masuk
              </Link>
            </div>
          </div>
        )}
      </section>
    </ParentLayout>
  );
};

export default Kegiatanku;
