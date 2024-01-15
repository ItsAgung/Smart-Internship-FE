import ParentLayout from "../components/ParentLayout";
import { useState } from "react";
import { Label, TextInput } from "flowbite-react";
import Select from "react-select";
import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";
import "animate.css";
import { ToastContainer, toast } from "react-toastify";

const AddProfile = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isSearchable, setIsSearchable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const token = useSelector((state) => state.myReducer.token);
  const user = useSelector((state) => state.myReducer.user);
  const [userdata, setUserData] = useState({
    instansi: {
      id: "",
      name: "",
    },
    jurusan: {
      id: "",
      name: "",
    },
    periode: {
      tanggal_pengajuan: "",
      tanggal_selesai: "",
      jenis_pengajuan: "",
    },
  });

  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Checking if the file type is allowed or not
    const allowedTypes = ["application/pdf"];
    if (!allowedTypes.includes(selectedFile?.type)) {
      toast.error("Only PDF are allowed.");
      return;
    }

    setFile(selectedFile);
  };

  const startDateHandler = (startDate) => {
    setStartDate(startDate);
  };

  const endDateHandler = (endDate) => {
    setEndDate(endDate);
  };

  const pengajuanOpt = [
    {
      value: "online",
      label: "Online",
    },
    {
      value: "offline",
      label: "Offline",
    },
  ];

  const genderOpt = [
    {
      value: "Laki - Laki",
      label: "Laki - Laki",
    },
    {
      value: "Perempuan",
      label: "Perempuan",
    },
  ];

  const agamaOpt = [
    {
      value: "Islam",
      label: "Islam",
    },
    {
      value: "Protestan",
      label: "Protestan",
    },
    {
      value: "Katolik",
      label: "Katolik",
    },
    {
      value: "Buddha",
      label: "Buddha",
    },
    {
      value: "Hindu",
      label: "Hindu",
    },
    {
      value: "Konghucu",
      label: "Konghucu",
    },
  ];

  const [jurusan, setJurusan] = useState([
    {
      value: "",
      label: "",
    },
  ]);
  const [instansi, setInstansi] = useState([
    {
      value: "",
      label: "",
    },
  ]);

  const showAlert = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Apakah Anda Yakin?",
      text: "Harap Periksa Data Anda Dengan Benar!",
      showCancelButton: true,
      confirmButtonText: "Simpan",
      showClass: {
        popup: "animate__animated animate__bounceInDown",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handlesubmit(e);
      }
    });
  };

  async function getUserdata() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/user/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUserData(response.data.data);
    } catch (error) {
      console.log(error.response.data.errors);
      // setIsLoading(false);
    }
  }

  async function getInstansi() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/jurusan_instansi`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInstansi(
        response.data.data.instansi.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
      setJurusan(
        response.data.data.jurusan.map((d) => ({
          value: d.id,
          label: d.name,
        }))
      );
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.errors);
      // setIsLoading(false);
    }
  }

  async function handlesubmit(e) {
    const tanggal_pengajuan = startDate.startDate;
    const tanggal_selesai = endDate.endDate;

    const user = {
      name: e.target.nama.value,
      nim: e.target.nim.value,
      religion: e.target.agama.value,
      gender: e.target.jeniskelamin.value,
      phone: e.target.telp.value,
      jurusan_id: e.target.jurusan.value,
      instansi_id: e.target.instansi.value,
      periode_id:
        e.target.periode_id.value !== "" ? e.target.periode_id.value : 0,
      tanggal_pengajuan:
        tanggal_pengajuan === undefined
          ? userdata.periode.tanggal_pengajuan
          : tanggal_pengajuan,
      tanggal_selesai:
        tanggal_selesai === undefined
          ? userdata.periode.tanggal_selesai
          : tanggal_selesai,
      jenis_pengajuan: e.target.jenis.value,
      file: file,
    };

    try {
      await axios.put(`${import.meta.env.VITE_REACT_APP_API}/user`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsLoading(false);
      Swal.fire({
        timer: 3000,
        icon: "success",
        title: "Data Anda Tersimpan!",
        showClass: {
          popup: "animate__animated animate__bounceInDown",
        },
        hideClass: {
          popup: "animate__animated animate__bounceOut",
        },
      });
      navigate("/profil");
    } catch (error) {
      setIsLoading(false);
      const message = error.response.data.errors.split(".");
      message.forEach((element) => {
        toast.error(element);
      });
      console.log(error.response.data.errors);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    if (token) {
      getUserdata();
      getInstansi();
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
            <h1 className="text-3xl text-black font-bold">
              Lengkapi Data Diri Anda
            </h1>
            <form
              onSubmit={showAlert}
              encType="multipart/form-data"
              className="flex flex-col gap-5"
            >
              <input
                type="hidden"
                name="periode_id"
                value={userdata.periode?.id}
              />
              <div className="rounded-lg border border-gray-300 bg-white w-full h-fit p-10">
                <h2 className="text-xl text-black font-bold mb-5">
                  Data Pribadi
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                  <div>
                    <Label htmlFor="nama" value="Nama:" />
                    <span className="text-red-700">*</span>
                    <TextInput
                      id="nama"
                      name="nama"
                      defaultValue={userdata.name}
                      onChange={(e) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            name: e.target.value,
                          };
                        })
                      }
                      required
                      className="w-full md:w-3/4 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" value="Email:" />
                    <span className="text-red-700">*</span>
                    <TextInput
                      id="email"
                      name="email"
                      defaultValue={userdata.email}
                      onChange={(e) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            email: e.target.value,
                          };
                        })
                      }
                      className="w-full md:w-3/4 mt-2"
                      readOnly
                      disabled
                    />
                  </div>
                  <div>
                    <Label htmlFor="nim" value="NIM/NISN:" />
                    <span className="text-red-700">*</span>
                    <TextInput
                      placeholder="Masukan NIM atau NISN Anda"
                      id="nim"
                      name="nim"
                      defaultValue={userdata.nim}
                      onChange={(e) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            nim: e.target.value,
                          };
                        })
                      }
                      required
                      className="w-full md:w-3/4 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="telp" value="Nomor Telepon:" />
                    <span className="text-red-700">*</span>
                    <TextInput
                      placeholder="Masukan Nomor Handphone Anda"
                      id="telp"
                      name="telp"
                      defaultValue={userdata.phone}
                      onChange={(e) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            phone: e.target.value,
                          };
                        })
                      }
                      required
                      type="number"
                      pattern="[0-9]"
                      maxLength="13"
                      min="0"
                      className="w-full md:w-3/4 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jeniskelamin" value="Jenis Kelamin:" />
                    <span className="text-red-700">*</span>
                    <Select
                      onChange={(value) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            gender: value.value,
                          };
                        })
                      }
                      options={genderOpt}
                      defaultValue={
                        userdata.gender === null
                          ? ""
                          : {
                              value: userdata.gender,
                              label: userdata.gender,
                            }
                      }
                      required
                      id="jeniskelamin"
                      className="w-full md:w-3/4 mt-2 basic-single"
                      name="jeniskelamin"
                      placeholder="Pilih Jenis Kelamin"
                      styles={{
                        indicatorSeparator: () => null,
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="agama" value="Agama:" />
                    <span className="text-red-700">*</span>
                    <Select
                      isSearchable={isSearchable}
                      options={agamaOpt}
                      onChange={(value) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            religion: value.value,
                          };
                        })
                      }
                      defaultValue={
                        userdata.religion === null
                          ? ""
                          : {
                              value: userdata.religion,
                              label: userdata.religion,
                            }
                      }
                      id="agama"
                      required
                      className="w-full md:w-3/4 mt-2 basic-single "
                      name="agama"
                      placeholder="Pilih Agama"
                      styles={{
                        indicatorSeparator: () => null,
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-300 bg-white w-full h-fit p-10">
                <h2 className="text-xl text-black font-bold mb-5">
                  Data Akademik
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                  <div>
                    <Label htmlFor="instansi" value="Asal Instansi:" />
                    <span className="text-red-700">*</span>
                    <Select
                      isSearchable={isSearchable}
                      options={instansi}
                      onChange={(value) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            instansi: {
                              id: value.value,
                              name: value.label,
                            },
                          };
                        })
                      }
                      defaultValue={
                        userdata.instansi === null
                          ? ""
                          : {
                              value: userdata.instansi.id,
                              label: userdata.instansi.name,
                            }
                      }
                      id="instansi"
                      required
                      className="w-full md:w-3/4 mt-2 basic-single "
                      name="instansi"
                      placeholder={"Pilih Instansi"}
                      styles={{
                        indicatorSeparator: () => null,
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <Label htmlFor="jurusan" value="Jurusan:" />
                    <span className="text-red-700">*</span>
                    <Select
                      isSearchable={isSearchable}
                      options={jurusan}
                      id="jurusan"
                      required
                      onChange={(value) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            jurusan: {
                              id: value.value,
                              name: value.label,
                            },
                          };
                        })
                      }
                      defaultValue={
                        userdata.jurusan === null
                          ? ""
                          : {
                              value: userdata.jurusan.id,
                              label: userdata.jurusan.name,
                            }
                      }
                      className="w-full md:w-3/4 mt-2 basic-single "
                      name="jurusan"
                      placeholder={"Pilih Jurusan"}
                      styles={{
                        indicatorSeparator: () => null,
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        }),
                      }}
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="file"
                      value="Surat Rekomendasi dari Instansi:"
                    />
                    <span className="text-red-700">*</span>
                    <input
                      id="file"
                      type="file"
                      name="file"
                      required={userdata.surat ? false : true}
                      onChange={handleFileChange}
                      accept="application/pdf"
                      className="file-input file-input-bordered file-input-black w-full mt-2 md:w-[90%]"
                    />
                    <label className="label">
                      <span className="label-text-alt">Format .pdf</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-300 bg-white w-full h-fit p-10">
                <h2 className="text-xl text-black font-bold mb-5">
                  Periode Magang
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-5">
                  <div className="w-full md:w-3/4 mt-2">
                    <Label htmlFor="mulai" value="Tanggal Mulai Magang:" />
                    <span className="text-red-700">*</span>
                    <Datepicker
                      id="mulai"
                      required
                      useRange={false}
                      asSingle={true}
                      name="mulai"
                      value={startDate}
                      onChange={startDateHandler}
                      popoverDirection="down"
                      displayFormat={"DD/MM/YYYY"}
                    />
                  </div>
                  <div className="w-full md:w-3/4 mt-2">
                    <Label htmlFor="selesai" value="Tanggal Selesai Magang:" />
                    <span className="text-red-700">*</span>
                    <Datepicker
                      id="selesai"
                      required
                      useRange={false}
                      asSingle={true}
                      minDate={
                        new Date(
                          startDate.startDate === undefined ||
                          startDate.startDate === null
                            ? userdata.periode?.tanggal_pengajuan
                            : startDate.startDate
                        )
                      }
                      value={endDate}
                      name="selesai"
                      onChange={endDateHandler}
                      popoverDirection="down"
                      displayFormat={"DD/MM/YYYY"}
                      className="w-full md:w-3/4 mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="jenis" value="Jenis Magang:" />
                    <span className="text-red-700">*</span>
                    <Select
                      isSearchable={isSearchable}
                      options={pengajuanOpt}
                      id="jenis"
                      required
                      onChange={(value) =>
                        setUserData((prevState) => {
                          return {
                            ...prevState,
                            periode: {
                              tanggal_pengajuan:
                                prevState.periode === null
                                  ? ""
                                  : prevState.periode.tanggal_pengajuan,
                              tanggal_selesai:
                                prevState.periode === null
                                  ? ""
                                  : prevState.periode.tanggal_selesai,
                              jenis_pengajuan: value.value,
                            },
                          };
                        })
                      }
                      defaultValue={
                        userdata.periode === null
                          ? ""
                          : {
                              value: userdata.periode.jenis_pengajuan,
                              label: userdata.periode.jenis_pengajuan,
                            }
                      }
                      className="w-full md:w-3/4 mt-2 basic-single"
                      name="jenis"
                      styles={{
                        indicatorSeparator: () => null,
                        input: (base) => ({
                          ...base,
                          "input:focus": {
                            boxShadow: "none",
                          },
                        }),
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn btn-ghost bg-red-700 hover:bg-red-800 text-white capitalize w-1/3 font-normal"
                >
                  {isLoading ? (
                    <span className="loading loading-dots loading-xs"></span>
                  ) : (
                    "Selanjutnya"
                  )}
                </button>
              </div>
            </form>
            <ToastContainer />
          </main>
        </ParentLayout>
      )}
      ;
    </>
  );
};

export default AddProfile;
