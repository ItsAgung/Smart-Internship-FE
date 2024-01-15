import ParentLayout from "../components/ParentLayout";
import { Link } from "react-router-dom";

const BerhasilVerif = () => {
  return (
    <ParentLayout>
      <div className="flex justify-center items-center rounded-xl py-12 my-10 mx-5 lg:mx-10">
        <div className="flex flex-col gap-5 items-center px-16 py-10 text-center">
          <img src="assets/images/successverify.png" width="200px" />
          <h1 className="font-bold text-2xl">Akun Anda Telah Terdaftar!</h1>
          <p>Silahkan Kembali ke Homepage</p>
          <Link
            to="/"
            className="btn  bg-red-700 hover:bg-red-800 text-white w-52 capitalize"
          >
            Home
          </Link>
        </div>
      </div>
    </ParentLayout>
  );
};

export default BerhasilVerif;
