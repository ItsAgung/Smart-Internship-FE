import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import KegiatanRightComponent from "./KegiatanRightComponent";

const KegiatanComponent = () => {
  const [carddata, setCardData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [check, setIsCheck] = useState(false);
  const [avail, setIsAvail] = useState(false);
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.myReducer.token);

  async function getKegiatanAktif() {
    setIsLoading(true);
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
        setCardData(response.data.data);
      } else {
        setIsAvail(true);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setIsLoading(false);
    }
  }

  const Card = ({ content }) => {
    function setFormat(value) {
      const date = new Date(value);
      const result = date.toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      return result;
    }

    function handleClick() {
      setIsCheck(true);
      setContent(content);
    }

    return (
      <div
        onClick={handleClick}
        className="flex relative rounded-xl flex-col lg:flex-row items-center bg-white border border-gray-300 shadow-sm gap-3 lg:gap-5 h-fit cursor-pointer hover:contrast-[0.8] active:contrast-[0.7] hover:drop-shadow-md"
      >
        <img
          src="assets/images/cardbg.png"
          className="object-cover w-full h-24 lg:h-36 lg:w-24 rounded-t-lg lg:rounded-tr-none lg:rounded-l-lg border-t-gray-300 border-b-gray-300 border-l-gray-300"
        />

        <div className="flex flex-col gap-3 w-full lg:gap-4 text-justify lg:pr-4 px-6 lg:px-0">
          <h1 className="text-base lg:text-xl font-bold capitalize">
            {content.posisi}
          </h1>
          <p className="text-[11px] sm:text-xs">
            Pastikan Anda mencatat kemajuan proyek magang Anda dan terbuka
            terhadap umpan balik.
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400">
            {setFormat(content.tanggal_pengajuan)} -{" "}
            {setFormat(content.tanggal_selesai)}
          </p>
        </div>

        <div className="flex flex-row w-full my-3 mr-5 justify-end lg:absolute lg:top-0 lg:right-0 lg:mt-4 ">
          <p
            className={`${
              content.status === "diterima" ? "bg-[#67CE67]" : "bg-yellow-300"
            }  border border-gray-100 rounded-md text-[10px]  lg:mt-1 font-normal px-2 capitalize`}
          >
            {content.status}
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (token) {
      getKegiatanAktif();
    }
  }, [token]);

  return (
    <>
      {isLoading ? (
        <div className="flex rounded-xl justify-center mx-5 lg:mx-10 mt-2 bg-white py-5">
          <span className="flex justify-center items-center loading loading-dots loading-md"></span>
        </div>
      ) : !avail ? (
        <div className="flex flex-col lg:flex-row mx-5 lg:mx-10 my-2 gap-2">
          <div className="flex flex-col rounded-xl justify-center gap-2 w-full h-fit basis-[60%] ">
            {carddata.map((data, index) => (
              <Card key={index} content={data} />
            ))}
          </div>

          {check ? (
            <KegiatanRightComponent content={content} />
          ) : (
            <div className="hidden lg:flex items-center rounded-xl justify-center gap-8 px-5 lg:px-14 py-10 bg-white shadow-md w-full h-96">
              <h1 className="italic text-gray-500 text-base">
                Silakan pilih aktivitas untuk melihat detailnya
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center rounded-xl py-6 shadow-sm bg-white my-7 mx-5 lg:mx-10">
          <div className="flex flex-col gap-5 justify-center items-center text-center px-16 py-10">
            <img
              src="assets/images/emptyico.png"
              width="200px"
              className="animate__animated animate__headShake"
            />
            <h1 className="font-bold text-xl">Belum Ada Kegiatan Aktif</h1>
            <p>Silahkan Mengikuti Seleksi Magang Terlebih Dahulu</p>
            <Link
              to="/posisi"
              className="btn capitalize  bg-red-700 hover:bg-red-800 text-white w-52"
            >
              Daftar Magang
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default KegiatanComponent;
