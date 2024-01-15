import { useMemo } from "react";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import TableNoFilterComponent from "../../components/TableNoFilterComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Mitra = ({ title }) => {
  const token = useSelector((state) => state.myReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [dataMitra, setDataMitra] = useState([]);

  // Async function to get data mitra with axios
  async function getMitra() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/instansi`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDataMitra(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.errors);
    }
  }

  const data = useMemo(
    () => (isLoading ? "" : dataMitra),
    [isLoading, dataMitra]
  );

  const columns = [
    {
      header: "Mitra",
      accessorKey: "name",
      cell: (cell) => {
        if (!cell.row.original.is_active) {
          return <span className="text-red-700">{cell.getValue()}</span>;
        }
        return cell.getValue();
      },
    },
    {
      header: "Total Kuota",
      accessorKey: "kuota",
    },
    {
      header: "Kuota Tersedia",
      accessorKey: "kuota_tersedia",
    },
    {
      header: "Aksi",
      accessorKey: "id",
      size: 100,
      cell: (cell) => {
        return (
          <>
            <div className="dropdown dropdown-bottom dropdown-end">
              <label tabIndex={0} className="btn m-1">
                <svg
                  width="29"
                  height="25"
                  viewBox="0 0 29 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="0.5" y="0.5" width="28" height="24" stroke="black" />
                  <g clipPath="url(#clip0_197_195)">
                    <path
                      d="M9.98109 11.5923C10.021 11.5921 10.0609 11.5919 10.1021 11.5918C10.1678 11.5918 10.1678 11.5918 10.2349 11.5919C10.2815 11.5918 10.3281 11.5916 10.3761 11.5915C10.5055 11.5912 10.6349 11.5911 10.7643 11.5911C10.9039 11.591 11.0434 11.5907 11.1829 11.5904C11.4881 11.5899 11.7933 11.5896 12.0984 11.5894C12.289 11.5893 12.4795 11.5891 12.67 11.589C13.1976 11.5885 13.7252 11.588 14.2527 11.5879C14.2865 11.5879 14.3202 11.5879 14.355 11.5879C14.3889 11.5879 14.4227 11.5879 14.4576 11.5878C14.5262 11.5878 14.5948 11.5878 14.6633 11.5878C14.6974 11.5878 14.7314 11.5878 14.7664 11.5878C15.3177 11.5876 15.8689 11.5869 16.4201 11.5859C16.9861 11.585 17.552 11.5845 18.118 11.5844C18.4357 11.5844 18.7535 11.5841 19.0713 11.5834C19.3418 11.5828 19.6124 11.5825 19.883 11.5829C20.021 11.583 20.159 11.583 20.2971 11.5824C20.4468 11.5818 20.5965 11.5821 20.7462 11.5826C20.7897 11.5822 20.8332 11.5819 20.8781 11.5816C21.1625 11.5835 21.366 11.6255 21.6138 11.7873C21.7911 11.9942 21.8548 12.2173 21.8643 12.5C21.8555 12.7312 21.8242 12.9269 21.6973 13.1152C21.4848 13.3194 21.2987 13.4073 21.0189 13.4077C20.979 13.4079 20.9391 13.408 20.8979 13.4082C20.8322 13.4081 20.8322 13.4081 20.7651 13.4081C20.7185 13.4082 20.6719 13.4083 20.6239 13.4085C20.4945 13.4088 20.3651 13.4089 20.2357 13.4089C20.0961 13.409 19.9566 13.4093 19.8171 13.4096C19.5119 13.4101 19.2067 13.4104 18.9016 13.4105C18.711 13.4107 18.5205 13.4108 18.33 13.411C17.8024 13.4115 17.2749 13.4119 16.7473 13.4121C16.7135 13.4121 16.6798 13.4121 16.645 13.4121C16.6111 13.4121 16.5773 13.4121 16.5424 13.4121C16.4738 13.4122 16.4052 13.4122 16.3367 13.4122C16.3026 13.4122 16.2686 13.4122 16.2336 13.4122C15.6823 13.4124 15.1311 13.4131 14.5799 13.414C14.0139 13.415 13.448 13.4155 12.882 13.4156C12.5643 13.4156 12.2465 13.4159 11.9287 13.4166C11.6582 13.4172 11.3876 13.4174 11.117 13.4171C10.979 13.4169 10.841 13.417 10.7029 13.4176C10.5532 13.4182 10.4035 13.4178 10.2538 13.4174C10.2103 13.4177 10.1668 13.4181 10.1219 13.4184C9.83748 13.4165 9.63404 13.3745 9.38623 13.2126C9.2089 13.0058 9.1452 12.7827 9.13574 12.5C9.14453 12.2688 9.1758 12.0731 9.30273 11.8848C9.51516 11.6806 9.70126 11.5927 9.98109 11.5923Z"
                      fill="black"
                    />
                    <path
                      d="M10.0292 15.9756C10.0705 15.9754 10.0705 15.9754 10.1127 15.9752C10.2047 15.9747 10.2966 15.9749 10.3886 15.9751C10.4547 15.9749 10.5207 15.9747 10.5868 15.9744C10.7661 15.9739 10.9454 15.9739 11.1246 15.974C11.2744 15.974 11.4241 15.9738 11.5739 15.9736C11.9273 15.9732 12.2807 15.9731 12.6341 15.9734C12.9984 15.9736 13.3627 15.9731 13.727 15.9722C14.04 15.9715 14.353 15.9713 14.666 15.9714C14.8529 15.9715 15.0397 15.9714 15.2265 15.9708C15.4023 15.9703 15.578 15.9704 15.7538 15.9709C15.8182 15.971 15.8826 15.9709 15.9469 15.9706C16.0351 15.9701 16.1232 15.9705 16.2113 15.971C16.2366 15.9707 16.2618 15.9704 16.2879 15.9701C16.501 15.9727 16.7058 16.0256 16.8739 16.177C16.8987 16.212 16.8987 16.212 16.924 16.2478C16.9497 16.2825 16.9497 16.2825 16.9759 16.318C17.1251 16.5753 17.1217 16.8377 17.0957 17.1348C17.0257 17.4104 16.8735 17.5611 16.6608 17.7137C16.5408 17.7651 16.4248 17.7616 16.298 17.761C16.2558 17.7612 16.2558 17.7612 16.2128 17.7615C16.1184 17.7621 16.0241 17.762 15.9298 17.7619C15.8622 17.7622 15.7946 17.7624 15.727 17.7628C15.5433 17.7635 15.3596 17.7637 15.1759 17.7637C15.0225 17.7638 14.8691 17.7641 14.7158 17.7644C14.3539 17.7651 13.9921 17.7653 13.6302 17.7652C13.257 17.7652 12.8837 17.766 12.5105 17.7673C12.1901 17.7684 11.8696 17.7688 11.5492 17.7688C11.3578 17.7688 11.1664 17.769 10.975 17.7699C10.795 17.7706 10.6149 17.7707 10.4349 17.7701C10.3689 17.77 10.3028 17.7702 10.2368 17.7707C10.1466 17.7713 10.0563 17.7709 9.96607 17.7703C9.94007 17.7707 9.91407 17.7711 9.88729 17.7716C9.66659 17.7682 9.51448 17.6853 9.35068 17.5233C9.14226 17.2294 9.12227 16.9671 9.15426 16.6016C9.21626 16.3574 9.33846 16.2088 9.52535 16.0684C9.69483 15.9915 9.84817 15.9745 10.0292 15.9756Z"
                      fill="black"
                    />
                    <path
                      d="M9.94754 7.24397C9.98969 7.24374 9.98969 7.24374 10.0327 7.24351C10.1271 7.24306 10.2216 7.2429 10.316 7.24275C10.3836 7.24249 10.4512 7.24222 10.5188 7.24193C10.7026 7.24122 10.8865 7.24078 11.0704 7.24044C11.1852 7.24023 11.3001 7.23998 11.415 7.23973C11.7743 7.23895 12.1336 7.23836 12.4929 7.23802C12.9078 7.23762 13.3226 7.23654 13.7375 7.23488C14.0581 7.23365 14.3787 7.23304 14.6993 7.2329C14.8908 7.23281 15.0823 7.23244 15.2739 7.23141C15.4541 7.23045 15.6342 7.23028 15.8144 7.2307C15.8805 7.23072 15.9466 7.23046 16.0127 7.2299C16.103 7.22917 16.1933 7.22946 16.2837 7.23C16.3227 7.22933 16.3227 7.22933 16.3625 7.22864C16.5834 7.23181 16.7354 7.31462 16.8993 7.47671C17.1016 7.76198 17.1216 8.00349 17.0957 8.35743C17.0568 8.59281 16.9638 8.72965 16.7993 8.88134C16.6153 9.00532 16.4317 9.02566 16.2208 9.02437C16.1932 9.02453 16.1657 9.02468 16.1373 9.02485C16.0453 9.02527 15.9534 9.02511 15.8614 9.02494C15.7953 9.02512 15.7293 9.02533 15.6632 9.02558C15.4839 9.02613 15.3046 9.02615 15.1254 9.02605C14.9756 9.026 14.8259 9.0262 14.6761 9.0264C14.3227 9.02686 13.9693 9.02687 13.6159 9.02663C13.2516 9.02638 12.8873 9.02688 12.523 9.02776C12.21 9.02848 11.897 9.02873 11.584 9.02859C11.3971 9.02852 11.2103 9.02862 11.0235 9.0292C10.8477 9.02971 10.672 9.02963 10.4962 9.0291C10.4318 9.029 10.3674 9.02911 10.3031 9.02945C10.2149 9.02988 10.1268 9.02955 10.0387 9.02903C10.0134 9.02933 9.98816 9.02963 9.96213 9.02994C9.74896 9.02732 9.54421 8.97437 9.37612 8.82302C9.35957 8.79965 9.34301 8.77628 9.32596 8.7522C9.30884 8.72905 9.29171 8.70589 9.27407 8.68203C9.12477 8.42452 9.12861 8.16248 9.15433 7.86524C9.21678 7.60981 9.36638 7.43639 9.56253 7.29102C9.69338 7.24282 9.81141 7.24393 9.94754 7.24397Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_197_195">
                      <rect
                        width="19"
                        height="21"
                        fill="white"
                        transform="translate(1 2)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 dark:bg-black"
              >
                <li>
                  <a
                    onClick={() => {
                      document
                        .getElementById("modal-edit-" + cell.row.original.id)
                        .showModal();
                    }}
                  >
                    Edit
                  </a>
                </li>
                <li>
                  {cell.row.original.is_active ? (
                    <a
                      onClick={() => {
                        handleHide(cell.row.original.id, false);
                      }}
                    >
                      Blacklist
                    </a>
                  ) : (
                    <a
                      onClick={() => {
                        handleHide(cell.row.original.id, true);
                      }}
                    >
                      Batalkan Blacklist
                    </a>
                  )}
                </li>
              </ul>
            </div>
            {/* Modal Beri Aksi Edit*/}
            <dialog id={"modal-edit-" + cell.row.original.id} className="modal">
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
                    defaultValue={cell.row.original.id}
                  />
                  <div className="flex w-full justify-between items-start mb-8">
                    <Label htmlFor="mitra" value="Edit Mitra:" />
                    <TextInput
                      id="mitra"
                      name="mitra"
                      defaultValue={cell.row.original.name}
                      className="w-[70%]"
                    />
                  </div>
                  <div className="flex w-full justify-between items-start mb-8">
                    <Label htmlFor="kuota" value="Kuota:" />
                    <TextInput
                      id="kuota"
                      name="kuota"
                      defaultValue={cell.row.original.kuota}
                      className="w-[70%]"
                    />
                  </div>
                  <div className="flex justify-end items-end text-white gap-5 mt-5">
                    <button
                      type="submit"
                      className="btn btn-ghost btn-sm px-4 bg-[#4F6079] hover:bg-[#394453] capitalize font-light"
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
          </>
        );
      },
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const datamitra = {
      name: e.target.mitra.value,
      kuota: e.target.kuota.value,
    };
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/instansi`,
        datamitra,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.getElementById("modal-tambah").close();
      Swal.fire({
        icon: "success",
        title: "Mitra Berhasil Ditambahkan!",
        timer: 1800,
      }).then(() => {
        getMitra();
      });
    } catch (error) {
      toast.error(error.response.data.errors);
    }
  }

  async function handleSubmitEdit(e) {
    e.preventDefault();
    const id = e.target.id.value;

    const datainstansi = {
      name: e.target.mitra.value,
      kuota: e.target.kuota.value,
    };

    try {
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API}/instansi/${id}`,
        datainstansi,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      document.getElementById("modal-edit-" + id).close();
      Swal.fire({
        icon: "success",
        title: "Mitra Berhasil Diperbarui!",
        timer: 1800,
      }).then(() => {
        getMitra();
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response);
    }
  }
  function handleHide(id, param) {
    const data = {
      is_active: param,
    };

    Swal.fire({
      title: !param ? "Blacklist Mitra" : "Batalkan Backlist",
      text: !param
        ? "Apakah anda yakin ingin blacklist mitra ini?"
        : "Apakah anda yakin ingin membatalkan blacklist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          axios.put(
            `${import.meta.env.VITE_REACT_APP_API}/instansi/hide/${id}`,
            data,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          Swal.fire({
            icon: "success",
            title: !param
              ? "Mitra Berhasil Di Blacklist!"
              : "Blacklist Mitra Berhasil Dibatalkan!",
            timer: 1800,
          }).then(() => {
            getMitra();
          });
        } catch (error) {
          console.log(error);
          toast.error(error.response);
        }
      }
    });
  }

  useEffect(() => {
    getMitra();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-black mb-5 dark:text-white">
          {title}
        </h1>
        <button
          onClick={() => {
            document.getElementById("modal-tambah").showModal();
          }}
          className="btn btn-ghost bg-[#4F6079] hover:bg-[#384353] mb-5 text-white w-36 btn-sm capitalize text-xs font-light"
        >
          + Tambah
        </button>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="grid grid-cols-1 gap-6 pt-4 justify-between">
          <TableNoFilterComponent data={data} columns={columns} />
        </div>
      </div>
      {/* Modal Beri Aksi Tambah */}
      <dialog id="modal-tambah" className="modal">
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
              <Label htmlFor="mitra" value="Tambah Mitra:" />
              <TextInput id="mitra" name="mitra" required className="w-[70%]" />
            </div>
            <div className="flex w-full justify-between items-start mb-8">
              <Label htmlFor="kuota" value="Kuota:" />
              <TextInput id="kuota" name="kuota" required className="w-[70%]" />
            </div>
            <div className="flex justify-end items-end text-white gap-5 mt-5">
              <button
                type="submit"
                className="btn btn-ghost btn-sm px-4 bg-[#4F6079] hover:bg-[#394453] capitalize font-light"
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
    </>
  );
};

export default Mitra;
