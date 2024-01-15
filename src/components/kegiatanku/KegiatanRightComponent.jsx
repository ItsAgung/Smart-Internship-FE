import { Label, Table, TextInput, Textarea } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PiPencilLineFill, PiTrashFill } from "react-icons/pi";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";

const KegiatanRightComponent = ({ content }) => {
  const user = useSelector((state) => state.myReducer.user);
  const token = useSelector((state) => state.myReducer.token);
  const [project, setProject] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  function setFormat(value) {
    const date = new Date(value);
    const result = date.toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    return result;
  }

  async function getProjectData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/project?id=${content.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.data.length === 0) {
        setIsEmpty(true);
      } else {
        setIsEmpty(false);
        setProject(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const dataproject = {
      user_id: user.id,
      pengajuan_id: content.id,
      judul: e.target.judul.value,
      persentase: e.target.persentase.value,
      keterangan: e.target.keterangan.value,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/project`,
        dataproject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.getElementById("modal-tambah").close();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Proyek Berhasil Ditambahkan!",
          timer: 1800,
        }).then(() => {
          getProjectData();
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors);
    }
  }
  async function handleSubmitEdit(e) {
    e.preventDefault();
    const id = e.target.id.value;

    const dataproject = {
      persentase: e.target.persentase.value,
      keterangan: e.target.keterangan.value,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/project/${id}`,
        dataproject,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.getElementById("modal-edit" + id).close();
      Swal.fire({
        icon: "success",
        title: "Proyek Berhasil Diperbarui!",
        timer: 1800,
      }).then(() => {
        getProjectData();
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.errors);
    }
  }

  function deleteProject(id) {
    Swal.fire({
      title: "Hapus Data",
      text: "Apakah anda yakin ingin menghapus data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.delete(`${import.meta.env.VITE_REACT_APP_API}/project/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          Swal.fire({
            icon: "success",
            title: "Data Berhasil Dihapus!",
            timer: 1800,
          }).then(() => {
            getProjectData();
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  useEffect(() => {
    getProjectData();
  }, [isEmpty, content]);

  return (
    <div className="rounded-xl px-5 lg:px-10 py-5 bg-white shadow-md w-full h-fit">
      <div className="grid grid-cols-1 w-full gap-5">
        <h1 className="text-2xl capitalize">{content.posisi}</h1>
        <div className="grid gap-1">
          <div className="text-sm">
            Nama&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
            {user.name}
          </div>
          <div className="text-sm">
            Tanggal Mulai&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:{" "}
            {setFormat(content.tanggal_pengajuan)}
          </div>
          <div className="text-sm">
            Tanggal Selesai&nbsp;&nbsp;&nbsp;:{" "}
            {setFormat(content.tanggal_selesai)}
          </div>
        </div>

        <div className="grid gap-3 rounded-xl px-5 lg:px-8 py-5 border border-gray-300 w-full h-fit">
          <h1>Laporan Proyek</h1>
          <p className="text-xs">
            Perbaharui terus presentasi proyek ada, lakukan yang terbaik
          </p>
          {!content.sertifikat && (
            <button
              onClick={() => {
                document.getElementById("modal-tambah").showModal();
              }}
              type="button"
              className="btn btn-ghost btn-xs w-24 capitalize text-white bg-red-700 justify-center justify-self-end hover:bg-red-800"
            >
              + Tambah
            </button>
          )}

          <div className="grid grid-cols-1 w-full mt-2 overflow-x-auto">
            <Table hoverable>
              <Table.Head className="text-center text-white">
                <Table.HeadCell className="bg-red-700 text-left w-[400px]">
                  Judul Proyek
                </Table.HeadCell>
                <Table.HeadCell className="bg-red-700">
                  Persentase
                </Table.HeadCell>
                <Table.HeadCell className="bg-red-700">
                  Keterangan
                </Table.HeadCell>
                {!content.sertifikat && (
                  <Table.HeadCell colSpan={2} className="bg-red-700">
                    Action
                  </Table.HeadCell>
                )}
              </Table.Head>
              <Table.Body className="divide-y">
                {isEmpty ? (
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell
                      colSpan={4}
                      className="w-[400px] text-center font-medium text-gray-900 dark:text-white"
                    >
                      Tidak ada proyek
                    </Table.Cell>
                  </Table.Row>
                ) : (
                  project.map((data, i) => (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="w-[400px] font-medium text-gray-900 dark:text-white capitalize">
                        {data.judul}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {data.persentase}%
                      </Table.Cell>
                      <Table.Cell className="text-center font-medium text-gray-900">
                        {data.keterangan}
                      </Table.Cell>
                      {!content.sertifikat && (
                        <>
                          <Table.Cell className="">
                            <div
                              onClick={() => {
                                document
                                  .getElementById("modal-edit" + data.id)
                                  .showModal();
                              }}
                              className="text-2xl text-black transform hover:scale-105 active:scale-95 duration-50 cursor-pointer"
                            >
                              <PiPencilLineFill />
                              {/* Modal Beri Aksi Edit */}
                              <dialog
                                id={"modal-edit" + data.id}
                                className="modal z-1"
                              >
                                <div className="modal-box overflow-hidden">
                                  <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                      ✕
                                    </button>
                                  </form>
                                  <form
                                    onSubmit={handleSubmitEdit}
                                    className="mt-5 flex flex-col justify-between"
                                  >
                                    <input
                                      type="hidden"
                                      name="id"
                                      value={data.id}
                                    />

                                    <div className="flex w-full justify-between items-start mb-8">
                                      <div className="mb-2 block">
                                        <Label
                                          htmlFor="persentase"
                                          value="Persentase:"
                                        />
                                      </div>
                                      <TextInput
                                        type="number"
                                        min="0"
                                        max="100"
                                        id="persentase"
                                        name="persentase"
                                        defaultValue={data.persentase}
                                        className="w-[70%]"
                                      />
                                    </div>
                                    <div className="flex w-full justify-between items-start mb-8">
                                      <div className="mb-2 block">
                                        <Label
                                          htmlFor="keterangan"
                                          value="Keterangan:"
                                        />
                                      </div>
                                      <Textarea
                                        rows={4}
                                        id="keterangan"
                                        name="keterangan"
                                        defaultValue={data.keterangan}
                                        className="w-[70%]"
                                      />
                                    </div>
                                    <div className="flex justify-end items-end text-white gap-5 mt-5">
                                      <button
                                        type="submit"
                                        className="btn btn-ghost btn-sm px-4 bg-red-700 hover:bg-red-800 capitalize font-light"
                                      >
                                        Simpan
                                      </button>
                                    </div>
                                  </form>
                                </div>
                                <form
                                  method="dialog"
                                  className="modal-backdrop"
                                >
                                  <button>close</button>
                                </form>
                              </dialog>
                            </div>
                          </Table.Cell>
                          <Table.Cell className="">
                            <div
                              onClick={() => deleteProject(data.id)}
                              className="text-2xl text-red-700 transform hover:scale-105 active:scale-95 duration-50 cursor-pointer"
                            >
                              <PiTrashFill />
                            </div>
                          </Table.Cell>
                        </>
                      )}
                    </Table.Row>
                  ))
                )}
              </Table.Body>
            </Table>
          </div>
        </div>
        <div className="grid gap-3 rounded-xl px-5 lg:px-8 py-5 border border-gray-300 w-full h-fit">
          <h1>Sertifikat</h1>
          <p className="text-xs">
            Selesaikan projek magang anda dan raih sertifikat yang akan kami
            berikan
          </p>
          <a
            href={
              content.sertifikat &&
              import.meta.env.VITE_REACT_APP_API +
                "/certificate/" +
                content.sertifikat
            }
            target="_blank"
            rel="noreferrer"
            className={`${
              content.sertifikat ? "" : "btn-disabled"
            } btn btn-md bg-red-700 hover:bg-red-800 text-white capitalize w-1/3 justify-self-center mt-2`}
          >
            Unduh
          </a>
        </div>
      </div>
      {/* Modal Beri Aksi Tambah */}
      <dialog id="modal-tambah" className="modal z-1">
        <div className="modal-box overflow-hidden">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col justify-between"
          >
            <div className="flex w-full justify-between items-start mb-8">
              <div className="mb-2 block">
                <Label htmlFor="judul" value="Judul:" />
              </div>
              <TextInput id="judul" name="judul" required className="w-[70%]" />
            </div>
            <div className="flex w-full justify-between items-start mb-8">
              <div className="mb-2 block">
                <Label htmlFor="persentase" value="Persentase:" />
              </div>
              <TextInput
                type="number"
                min="0"
                max="100"
                id="persentase"
                name="persentase"
                required
                className="w-[70%]"
              />
            </div>
            <div className="flex w-full justify-between items-start mb-8">
              <div className="mb-2 block">
                <Label htmlFor="keterangan" value="Keterangan:" />
              </div>
              <Textarea
                rows={4}
                id="keterangan"
                name="keterangan"
                required
                className="w-[70%]"
              />
            </div>
            <div className="flex justify-end items-end text-white gap-5 mt-5">
              <button
                type="submit"
                className="btn btn-ghost btn-sm px-4 bg-red-700 hover:bg-red-800 capitalize font-light"
              >
                Simpan
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <ToastContainer />
    </div>
  );
};

export default KegiatanRightComponent;
