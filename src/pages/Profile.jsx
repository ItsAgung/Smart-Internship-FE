import ParentLayout from "../components/ParentLayout";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { FaEdit, FaExternalLinkAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { DateFormatIndo } from "../components/utils/DateFormatIndo";

const Profile = () => {
  const user = useSelector((state) => state.myReducer.user);
  const [name, setName] = useState("-");
  const [email, setEmail] = useState("-");
  const [userdata, setUserData] = useState({
    instansi: {
      name: "",
    },
    jurusan: {
      name: "",
    },
    periode: {
      tanggal_pengajuan: "",
      tanggal_selesai: "",
      jenis_pengajuan: "",
    },
  });

  const token = useSelector((state) => state.myReducer.token);
  const [isLoading, setIsLoading] = useState(false);

  async function profiledata() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsLoading(false);
      setName(response.data.data.name);
      setEmail(response.data.data.email);
      if (response.data.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.errors);
    }
  }

  useEffect(() => {
    if (token) {
      profiledata();
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
          <main className="flex flex-col gap-5 w-full mt-[73px] bg-gray-100 p-5 lg:px-20">
            <div className="flex justify-between items-end">
              <h1 className="text-3xl text-black font-bold">Profil</h1>
              <Link
                to="/lengkapiprofil"
                className="flex items-center btn btn-sm text-black capitalize font-normal"
              >
                <FaEdit />
                <span>Edit Profil</span>
              </Link>
            </div>
            <div className="rounded-lg border border-gray-300 bg-white w-full h-fit p-10">
              <div className="flex justify-between items-center">
                <h2 className="text-xl text-black font-bold mb-5">
                  Data Pribadi
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                <div>
                  <div className="">Nama:</div>
                  <div className="text-gray-500">{name}</div>
                </div>
                <div>
                  <div>Email:</div>
                  <div className="text-gray-500">{email}</div>
                </div>
                <div>
                  <div>NIM/NISN:</div>
                  <div className="text-gray-500">
                    {userdata.nim === null ? "-" : userdata.nim}
                  </div>
                </div>
                <div>
                  <div>Nomor Telepon:</div>
                  <div className="text-gray-500">
                    {userdata.phone === null ? "-" : userdata.phone}
                  </div>
                </div>
                <div>
                  <div>Jenis Kelamin:</div>
                  <div className="text-gray-500">
                    {userdata.gender === null ? "-" : userdata.gender}
                  </div>
                </div>
                <div>
                  <div>Agama:</div>
                  <div className="text-gray-500">
                    {userdata.religion === null ? "-" : userdata.religion}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-300 bg-white w-full h-fit p-10">
              <h2 className="text-xl text-black font-bold mb-5">
                Data Akademik
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                <div>
                  <div>Asal Instansi:</div>
                  <div className="text-gray-500">
                    {userdata.instansi === null ? "-" : userdata.instansi.name}
                  </div>
                </div>
                <div>
                  <div>Jurusan:</div>
                  <div className="text-gray-500">
                    {userdata.jurusan === null ? "-" : userdata.jurusan.name}
                  </div>
                </div>
                <div className="">
                  <div className="">Surat Instansi:</div>
                  <div className="text-gray-500">
                    <a
                      href={
                        userdata.surat === null
                          ? "-"
                          : import.meta.env.VITE_REACT_APP_API +
                            "/document/" +
                            userdata.surat
                      }
                      target="_blank"
                      rel="noreferrer"
                    >
                      {userdata.surat === null ? (
                        "-"
                      ) : (
                        <span className="flex items-center gap-2 hover:text-red-700">
                          {userdata.surat} <FaExternalLinkAlt />
                        </span>
                      )}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-gray-300 bg-white w-full h-fit p-10">
              <h2 className="text-xl text-black font-bold mb-5">
                Periode Magang
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                <div>
                  <div>Tanggal Mulai Magang:</div>
                  <div className="text-gray-500">
                    {userdata.periode === null
                      ? "-"
                      : DateFormatIndo(userdata.periode.tanggal_pengajuan)}
                  </div>
                </div>
                <div>
                  <div>Tanggal Selesai Magang:</div>
                  <div className="text-gray-500">
                    {userdata.periode === null
                      ? "-"
                      : DateFormatIndo(userdata.periode.tanggal_selesai)}
                  </div>
                </div>
                <div className="">
                  <div>Jenis Magang:</div>
                  <div className="text-gray-500 capitalize">
                    {userdata.periode === null
                      ? "-"
                      : userdata.periode.jenis_pengajuan}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </ParentLayout>
      )}
    </>
  );
};

export default Profile;
