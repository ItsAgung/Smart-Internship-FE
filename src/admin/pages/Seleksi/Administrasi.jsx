import TableComponent from "../../components/TableComponent.jsx";
import { useMemo } from "react";
import { Label, Select } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";

const Administrasi = ({ title }) => {
  const token = useSelector((state) => state.myReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [LinkId, setLinkId] = useState("");
  const [sort, setSort] = useState("proses");

  const defaultFilterOptions = [
    {
      label: "Diproses",
      value: "proses",
    },
    {
      label: "Diterima",
      value: "diterima",
    },
    {
      label: "Ditolak",
      value: "ditolak",
    },
  ];

  const selectFilter = (event) => {
    const options = new Set(defaultFilterOptions.map((option) => option.value));
    const value = event.target.value;

    if (options.has(value)) {
      setSort(value);
    }
  };

  async function getDataUser() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/admin/user?field=administrasi`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setDataUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.errors);
    }
  }

  function handleDelete(id) {
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
          axios.delete(
            `${import.meta.env.VITE_REACT_APP_API}/pengajuan/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          Swal.fire({
            icon: "success",
            title: "Data Berhasil Dihapus!",
            timer: 1800,
          }).then(() => {
            getDataUser();
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

  const data = useMemo(
    () => (isLoading ? "" : dataUser),
    [isLoading, dataUser]
  );

  const columns = [
    {
      header: "Nama Lengkap",
      accessorKey: "user.name",
    },
    {
      header: "Email",
      accessorKey: "user.email",
    },
    {
      header: "No Telepon",
      accessorKey: "user.phone",
    },
    {
      header: "Posisi",
      accessorKey: "user.posisi",
    },
    {
      header: "Asal Institusi",
      accessorKey: "user.instansi",
    },
    {
      header: "Surat",
      accessorKey: "user.surat",
      cell: (cell) => {
        return (
          <a
            href={
              import.meta.env.VITE_REACT_APP_API +
              "/document/" +
              cell.getValue()
            }
            target="_blank"
            rel="noreferrer"
            className="btn btn-square"
          >
            <svg
              width="14"
              height="13"
              viewBox="0 0 14 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1241_93)">
                <path
                  d="M12.1618 4.37165C12.2836 4.47048 12.4043 4.57025 12.5235 4.67187C12.5392 4.68518 12.5549 4.69848 12.5711 4.71219C12.8348 4.93608 13.0849 5.1685 13.326 5.41336C13.3667 5.4545 13.4077 5.49529 13.4489 5.53595C13.762 5.84821 14.0212 6.12578 14.0165 6.56629C13.9992 6.89928 13.7659 7.12823 13.5352 7.36328C13.5213 7.37761 13.5073 7.39193 13.493 7.4067C13.3447 7.55909 13.1934 7.70784 13.0355 7.85175C12.9897 7.89515 12.9479 7.94009 12.9063 7.98694C12.8327 8.06851 12.7508 8.13561 12.6636 8.20434C12.6019 8.25489 12.5449 8.30826 12.4876 8.36303C12.3776 8.46641 12.261 8.55802 12.1388 8.64878C12.0692 8.70107 12.0009 8.75462 11.9331 8.80896C10.4248 10.014 8.52391 10.8264 6.50677 10.7078C4.50913 10.5581 2.64692 9.44175 1.27354 8.13868C1.2291 8.09834 1.1827 8.06175 1.13479 8.02502C1.04768 7.95702 0.976061 7.88194 0.902582 7.80147C0.838265 7.73431 0.76991 7.67208 0.700708 7.60925C0.555313 7.47643 0.426867 7.33424 0.300806 7.18554C0.283006 7.16564 0.265205 7.14574 0.246866 7.12524C0.0228532 6.87086 -0.0380411 6.65194 -0.0081867 6.32564C0.0337872 6.04881 0.269682 5.83521 0.464868 5.63672C0.478214 5.62306 0.49156 5.60941 0.50531 5.59535C0.573198 5.52606 0.641608 5.45726 0.710535 5.38886C0.764441 5.33535 0.817678 5.28138 0.870325 5.2268C1.09541 4.99448 1.33835 4.78174 1.58596 4.57031C1.61233 4.54769 1.63869 4.52508 1.66586 4.50178C1.82559 4.36644 1.99104 4.23831 2.16018 4.11328C2.17825 4.09988 2.19631 4.08647 2.21492 4.07266C2.48894 3.86998 2.76628 3.67766 3.06252 3.5039C3.08096 3.49303 3.0994 3.48215 3.1184 3.47094C3.82846 3.05404 4.57277 2.6943 5.38674 2.48828C5.40879 2.4826 5.43085 2.47691 5.45357 2.47106C7.92582 1.84529 10.3153 2.88225 12.1618 4.37165ZM5.05862 4.36719C5.03086 4.38756 5.03086 4.38756 5.00254 4.40835C4.43028 4.84312 4.08573 5.53497 3.9999 6.20781C3.93269 6.98627 4.17397 7.69768 4.70315 8.30273C4.71883 8.32119 4.73452 8.33965 4.75068 8.35867C5.21444 8.88078 5.94836 9.19546 6.65844 9.28493C7.50111 9.35583 8.28729 9.1313 8.94143 8.63281C8.96124 8.61828 8.98105 8.60375 9.00146 8.58877C9.57117 8.15311 9.90973 7.46145 9.99918 6.79397C10.0733 6.01619 9.82346 5.30137 9.2969 4.69726C9.28227 4.68008 9.26764 4.6629 9.25257 4.64519C8.78436 4.11381 8.03928 3.79387 7.31469 3.71417C6.47534 3.65168 5.71151 3.87649 5.05862 4.36719Z"
                  fill="black"
                />
                <path
                  d="M8.28898 4.86362C8.75869 5.19263 9.06691 5.65328 9.16013 6.19532C9.21089 6.77253 9.10432 7.30544 8.71237 7.76795C8.33601 8.16633 7.83523 8.46741 7.25403 8.51148C6.62025 8.53511 6.05176 8.43 5.56314 8.03197C5.15199 7.66842 4.85387 7.20091 4.83063 6.66336C4.8202 6.0248 4.9993 5.50864 5.47983 5.03925C6.24304 4.36737 7.43934 4.29386 8.28898 4.86362Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_1241_93">
                  <rect width="14" height="13" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </a>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (cell) => {
        switch (cell.getValue().toLowerCase()) {
          case "proses":
            return (
              <button className="w-25 btn btn-sm btn-warning capitalize text-xs">
                Proses
              </button>
            );
          case "diterima":
            return (
              <button className="w-25 btn btn-sm btn-success capitalize text-xs">
                Lulus
              </button>
            );
          case "ditolak":
            return (
              <button className="w-25 btn btn-sm btn-error capitalize text-xs">
                Tidak Lulus
              </button>
            );
          default:
            return (
              <button className="w-25 btn btn-sm btn-error capitalize text-xs">
                Error
              </button>
            );
        }
      },
    },
    {
      header: "Aksi",
      accessorKey: "id",
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
                className="absolute dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 dark:bg-black"
              >
                <li>
                  <a
                    onClick={() => {
                      setLinkId(cell.getValue());
                      document.getElementById("modal-edit").showModal();
                    }}
                  >
                    Beri Aksi
                  </a>
                </li>
                {cell.row.original.status.toLowerCase() === "ditolak" && (
                  <li>
                    <a
                      onClick={() => {
                        handleDelete(cell.row.original.id);
                      }}
                    >
                      Hapus Data
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </>
        );
      },
    },
  ];

  // create a async function to handle submit with api
  const handleSubmitAksi = async (e) => {
    e.preventDefault();
    const data = {
      status: e.target.edit.value,
    };

    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/admin/pengajuan/administrasi/${LinkId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      document.getElementById("modal-edit").close();
      toast.success(response.data.message);
      getDataUser();
    } catch (error) {
      toast.error(error.response.data.errors);
    }
  };

  async function getSort() {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/admin/user?field=administrasi&filter=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataUser(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (sort) {
      setIsLoading(true);
      getSort();
    }
  }, [sort]);

  useEffect(() => {
    getDataUser();
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl text-black mb-5 dark:text-white">
        {title}
      </h1>
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="grid grid-cols-1 pt-4 justify-between">
          <TableComponent
            data={data}
            columns={columns}
            filterOptions={defaultFilterOptions}
            filterOnChange={selectFilter}
          />
        </div>
      </div>

      {/* Modal Beri Aksi */}
      <dialog id="modal-edit" className="modal">
        <div className="modal-box overflow-hidden">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form
            onSubmit={handleSubmitAksi}
            className="my-8 flex flex-col justify-between"
          >
            <div className="flex w-full justify-between mb-8">
              <Label htmlFor="edit" value="Beri Aksi:" />
              <Select id="edit" name="edit" className="w-[70%]">
                <option value="" hidden>
                  Pilih Aksi
                </option>
                <option value="diterima">Lulus</option>
                <option value="ditolak">Tidak Lulus</option>
              </Select>
            </div>
            <div className="flex justify-end items-end text-white gap-5">
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
export default Administrasi;
