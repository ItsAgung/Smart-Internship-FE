import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DateFormatIndo } from "../utils/DateFormatIndo";

const StatusComponent = () => {
  const [carddata, setCardData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setIsCheck] = useState(false);
  const token = useSelector((state) => state.myReducer.token);

  async function getKegiatan() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/kegiatan?is_active=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data.length) {
        setCardData(response.data.data);
      } else {
        setIsCheck(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.data);
      setIsLoading(false);
    }
  }

  const Card = ({ content }) => {
    const currentDate = new Date();

    switch (content.status) {
      case "administrasi":
        return (
          <div className="flex relative rounded-xl flex-col lg:flex-row items-center bg-white border border-gray-300 shadow-md gap-3 lg:gap-5 h-fit">
            <img
              src="assets/images/cardbg.png"
              className="object-cover w-full h-24 lg:h-44 lg:w-44 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg border-t-gray-300 border-b-gray-300 border-l-gray-300"
            />

            <div className="grid grid-cols-1 gap-3 w-full lg:gap-7 px-2 lg:pr-10">
              <h1 className="text-base lg:text-xl font-bold capitalize">
                {content.posisi}
              </h1>
              <p className="text-[11px] sm:text-xs">
                Tunggulah hasil seleksi dokumen Anda untuk melanjutkan ke tahap
                seleksi selanjutnya.
              </p>
            </div>

            <div className="flex flex-row w-full my-3 mr-10 justify-end lg:absolute lg:top-0 lg:right-0 lg:mt-4 ">
              <p className="capitalize lg:w-[18%] text-center bg-yellow-200  rounded-md text-[10px] lg:text-xs lg:mt-1 font-semibold px-4">
                administrasi
              </p>
            </div>
          </div>
        );
      case "tes_kemampuan":
        const tesDate = new Date(content.tanggal_tes_kemampuan);

        return (
          <div className="flex relative rounded-xl flex-col lg:flex-row items-center bg-white border border-gray-300 shadow-md gap-3 lg:gap-5 h-fit">
            <img
              src="assets/images/cardbg.png"
              className="object-cover w-full h-24 lg:h-44 lg:w-44 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg border-t-gray-300 border-b-gray-300 border-l-gray-300"
            />

            <div className="grid grid-cols-1 gap-3 w-full px-5 lg:pr-10">
              <h1 className="text-base lg:text-xl font-bold capitalize">
                {content.posisi}
              </h1>
              <p className="text-[11px] sm:text-xs">
                Selamat, Anda lolos ke tahap tes kemampuan. Pastikan Anda
                mengikuti tahap tes kemampuan sesuai jadwal yang ditentukan
                untuk melanjutkan ke tahap seleksi berikutnya.
              </p>
              <span className="text-[11px] sm:text-xs text-gray-500">
                Tanggal Pelaksanaan Tes :{" "}
                {content.tanggal_tes_kemampuan
                  ? DateFormatIndo(content.tanggal_tes_kemampuan)
                  : "-"}
              </span>
              <a
                href={content.link_tes_kemampuan}
                target="_blank"
                rel="noreferrer"
                className={`${
                  content.link_tes_kemampuan ? "" : "btn-disabled"
                } ${
                  currentDate < tesDate ? "hidden" : ""
                } btn font-light place-self-center bg-red-700 hover:bg-red-800 text-white w-1/2 lg:w-1/4 btn-xs mt-3 lg:mt-0 lg:btn-xs justify-self-center capitalize`}
              >
                Link Tes
              </a>
            </div>

            <div className="flex flex-row w-full my-3 mr-10 justify-end lg:absolute lg:top-0 lg:right-0 lg:mt-4 ">
              <p className="capitalize lg:w-[18%] text-center bg-yellow-200 rounded-md text-[10px] lg:text-xs lg:mt-1 font-semibold px-4">
                Tes Kemampuan
              </p>
            </div>
          </div>
        );

      case "wawancara":
        const wawancaraDate = new Date(content.tanggal_wawancara);
        return (
          <div className="flex relative rounded-xl flex-col lg:flex-row items-center bg-white border border-gray-300 shadow-md gap-3 lg:gap-5 h-fit">
            <img
              src="assets/images/cardbg.png"
              className="object-cover w-full h-24 lg:h-44 lg:w-44 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg border-t-gray-300 border-b-gray-300 border-l-gray-300"
            />

            <div className="grid grid-cols-1 gap-3 w-full px-5 lg:pr-10">
              <h1 className="text-base lg:text-xl font-bold capitalize">
                {content.posisi}
              </h1>
              <p className="text-[11px] sm:text-sm">
                Selamat, Anda lolos ke tahap wawancara. Pastikan Anda mengikuti
                tahap wawancara sesuai jadwal yang ditentukan untuk melanjutkan
                ke tahap seleksi akhir.
              </p>
              <span className="text-[11px] sm:text-xs text-gray-500">
                Tanggal Pelaksanaan Tes :{" "}
                {content.tanggal_wawancara
                  ? DateFormatIndo(content.tanggal_wawancara)
                  : "-"}
              </span>
              <a
                href={content.link_wawancara}
                target="_blank"
                rel="noreferrer"
                className={`${content.link_wawancara ? "" : "btn-disabled"} ${
                  currentDate < wawancaraDate ? "hidden" : ""
                } btn font-light place-self-center bg-red-700 hover:bg-red-800 text-white w-1/2 lg:w-1/4 btn-xs mt-3 lg:mt-0 lg:btn-xs justify-self-center capitalize`}
              >
                Link Wawancara
              </a>
            </div>

            <div className="flex flex-row w-full my-3 mr-10 justify-end lg:absolute lg:top-0 lg:right-0 lg:mt-4 ">
              <p className="capitalize lg:w-[18%] text-center bg-yellow-200 rounded-md text-[10px] lg:text-xs lg:mt-1 font-semibold px-4">
                Wawancara
              </p>
            </div>
          </div>
        );
      case "ditolak":
        const periode = content.periode_ditolak.split(" - ");
        return (
          <div className="flex relative rounded-xl flex-col lg:flex-row items-center bg-white border border-gray-300 shadow-md gap-3 lg:gap-5 h-fit">
            <img
              src="assets/images/cardbg.png"
              className="object-cover w-full h-24 lg:h-44 lg:w-44 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg border-t-gray-300 border-b-gray-300 border-l-gray-300"
            />

            <div className="grid grid-cols-1 w-full lg:gap-3 px-2 lg:pr-10">
              <h1 className="text-base lg:text-xl font-bold capitalize">
                {content.posisi}
              </h1>
              <p className="text-[11px] sm:text-sm">
                Mohon maaf, Anda belum berhasil lulus seleksi. Terima kasih atas
                partisipasinya.
              </p>
              <span className="text-[11px] sm:text-sm text-gray-500">
                Tanggal ditolak :{" "}
                {content.tanggal_ditolak
                  ? DateFormatIndo(content.tanggal_ditolak)
                  : "-"}
              </span>
              <span className="text-[11px] sm:text-sm text-gray-500">
                Periode :{" "}
                {content.periode_ditolak
                  ? `${DateFormatIndo(periode[0])} - ${DateFormatIndo(
                      periode[1]
                    )}`
                  : "-"}
              </span>
            </div>

            <div className="flex flex-row w-full my-3 mr-10 justify-end lg:absolute lg:top-0 lg:right-0 lg:mt-4 ">
              <p className="capitalize lg:w-[18%] text-center bg-error rounded-md text-[10px] lg:text-xs lg:mt-1 font-semibold px-4">
                Ditolak
              </p>
            </div>
          </div>
        );

      default:
        return <div>Error</div>;
    }
  };

  async function checkKegiatanAktif() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/kegiatan?is_active=true`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.data.length) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }

  useEffect(() => {
    if (token) {
      checkKegiatanAktif();
      getKegiatan();
    }
  }, [token]);

  return (
    <div className="flex flex-col lg:flex-row mx-5 lg:mx-10 my-2 gap-2">
      {isLoading ? (
        <div className="flex rounded-xl justify-center gap-8 px-5 lg:px-14 py-10 bg-white shadow-md w-full h-fit">
          <span className="flex justify-center items-center loading loading-dots loading-md"></span>
        </div>
      ) : !check ? (
        <div className="flex flex-col rounded-xl justify-center gap-8 px-5 lg:px-14 py-10 bg-white shadow-md w-full h-fit">
          {carddata.map((data, index) => (
            <Card key={index} content={data} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col rounded-xl justify-center gap-8 px-5 lg:px-14 py-10 bg-white shadow-md w-full h-fit">
          <div className="flex flex-col gap-5 justify-center items-center px-16 py-8">
            <img
              src="assets/images/emptyico.png"
              width="200px"
              className="animate__animated animate__headShake"
            />
            <h1 className="font-bold text-center text-2xl">
              Belum Ada Pendaftaran
            </h1>
            <p>Silahkan Mendaftar!</p>
            <Link
              to="/posisi"
              className={`btn ${
                isActive ? "btn-disabled" : ""
              } bg-red-700 hover:bg-red-800 text-white w-52 capitalize`}
            >
              Daftar Magang
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusComponent;
