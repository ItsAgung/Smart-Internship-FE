import axios from "axios";
import Cookies from "js-cookie";
import "animate.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const PosisiCardComp = ({ content, userid, token }) => {
  const navigate = useNavigate();

  const showAlert = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "warning",
      title: "Apakah Anda Yakin Ingin Melamar Disini?",
      text: "Tindakan ini tidak dapat dibatalkan!",
      showCancelButton: true,
      confirmButtonText: "Lamar",
      showClass: {
        popup: "animate__animated animate__bounceInDown",
      },
      hideClass: {
        popup: "animate__animated animate__bounceOut",
      },
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        onSubmit(e);
      }
    });
  };

  async function onSubmit(e) {
    e.preventDefault();
    const dataForm = {
      user_id: userid,
      posisi: content.nama,
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/pengajuan`,
        dataForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const message = "Pengajuan Sukses!";
      toast.success(message);
      setTimeout(() => {
        navigate("/kegiatan");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.errors);
    }
  }

  const user = Cookies.get("user");

  const QuotaSection = ({ kuota }) => {
    return (
      <>
        <h2 className="font-normal text-xs text-gray-500 dark:text-gray-400">
          Kuota Tersedia:
        </h2>
        <span>{kuota}</span>
      </>
    );
  };

  return (
    <div className="flex flex-col h-full w-72 px-8 py-6 bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex-grow">
        <h5 className=" text-2xl font-semibold mb-4 tracking-tight text-gray-900 dark:text-white capitalize">
          {content.nama}
        </h5>

        {user ? <QuotaSection kuota={content.kuota_tersedia} /> : ""}

        <h2 className="font-normal text-gray-500 dark:text-gray-400 mt-4 mb-2">
          Persyaratan:
        </h2>
        <ol className=" text-black text-sm list-decimal ml-4">
          {content.prasyarat.data.slice(0, 2).map((list, index) => (
            <li key={index}>{list}</li>
          ))}
        </ol>
      </div>

      <div className="flex flex-col gap-2 mt-8">
        <button
          className="btn bg-white text-black hover:bg-red-700 hover:text-white capitalize"
          onClick={() => document.getElementById(content.nama).showModal()}
        >
          Lihat Persyaratan
        </button>

        <button
          type="submit"
          onClick={showAlert}
          disabled={!user}
          className="btn bg-white text-black hover:bg-red-700 hover:text-white capitalize"
        >
          Ajukan Lamaran
        </button>
      </div>

      <dialog id={content.nama} className="modal">
        <div className="modal-box bg-white text-black rounded-md h-fit p-8">
          <div className="overflow-y-auto">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>

            <h5 className="mb-4 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white capitalize">
              {content.nama}
            </h5>

            {user ? <QuotaSection kuota={content.kuota_tersedia} /> : ""}

            <h2 className="font-normal text-gray-500 dark:text-gray-400 mt-4 mb-2">
              Persyaratan:
            </h2>
            <ol className="font-normal text-black text-sm list-decimal ml-4">
              {content.prasyarat.data.map((list, index) => (
                <li key={index}>{list}</li>
              ))}
            </ol>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default PosisiCardComp;
