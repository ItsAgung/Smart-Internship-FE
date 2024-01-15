import { useMemo } from "react";
import TableNoFilterComponent from "../../components/TableNoFilterComponent";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DateFormatIndo } from "../../../components/utils/DateFormatIndo";

const Alumni = ({ title }) => {
  const token = useSelector((state) => state.myReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [dataAlumni, setDataAlumni] = useState([]);

  async function getAlumni() {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/admin/alumni`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setDataAlumni(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.response.data.errors);
    }
  }

  const data = useMemo(
    () => (isLoading ? "" : dataAlumni),
    [isLoading, dataAlumni]
  );

  const columns = [
    {
      header: "Nama",
      accessorKey: "alumni.name",
    },
    {
      header: "Email",
      accessorKey: "alumni.email",
    },
    {
      header: "Instansi",
      accessorKey: "alumni.user.instansi",
    },
    {
      header: "Posisi",
      accessorKey: "alumni.posisi",
    },
    {
      header: "Periode",
      accessorKey: "alumni.periode",
      cell: (cell) => {
        const periode = cell.getValue().split(" - ");
        return `${DateFormatIndo(periode[0])} - ${DateFormatIndo(periode[1])} `;
      },
    },
    {
      header: "Detail",
      accessorKey: "alumni",
      cell: (cell) => {
        return (
          <>
            <a
              onClick={() => {
                document
                  .getElementById("modal-lihat-" + cell.getValue().id)
                  .showModal();
              }}
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
            {/* Modal Lihat */}
            <dialog id={"modal-lihat-" + cell.getValue().id} className="modal">
              <div className="modal-box overflow-auto">
                <form method="dialog">
                  <button className="btn btn-sm btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left mt-5 pb-5">
                  <div>
                    <div className="mb-1">Nama :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.name}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Email :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.email}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">NIM/NISN :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.nim}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Nomor Telepon :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.phone}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Jenis Kelamin :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.gender}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Agama :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.religion}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Institusi :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.instansi}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Jurusan :</div>
                    <div className="text-gray-500">
                      {cell.getValue().user.jurusan}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Tanggal Mulai :</div>
                    <div className="text-gray-500">
                      {DateFormatIndo(cell.getValue().user.tanggal_mulai)}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Tanggal Selesai :</div>
                    <div className="text-gray-500">
                      {DateFormatIndo(cell.getValue().user.tanggal_selesai)}
                    </div>
                  </div>
                  <div>
                    <div className="mb-1">Posisi :</div>
                    <div className="text-gray-500">
                      {cell.getValue().posisi}
                    </div>
                  </div>
                </div>
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

  useEffect(() => {
    getAlumni();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl text-black mb-5 dark:text-white">
          {title}
        </h1>
      </div>
      <div className="rounded-sm border border-stroke bg-white px-5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
        <div className="grid grid-cols-1 gap-6 pt-4 justify-between">
          <TableNoFilterComponent data={data} columns={columns} />
        </div>
      </div>
    </>
  );
};

export default Alumni;
