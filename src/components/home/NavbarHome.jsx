import { Modal } from "flowbite-react";
import { FaUserAlt, FaPowerOff, FaLock } from "react-icons/fa";
import { useState } from "react";
import MobileNavComp from "./MobileNavComp";
import LoginComp from "../auth/LoginComp";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { setIsLogin, setToken, setUser } from "../../reducer/myReducer";

export default function NavbarHome() {
  const [navbar, setNavbar] = useState(false);
  const [openModal, setOpenModal] = useState(String | undefined);
  const props = { openModal, setOpenModal };
  const user = useSelector((state) => state.myReducer.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function logout() {
    Cookies.remove("user");
    dispatch(setUser(false));
    dispatch(setToken(false));
    dispatch(setIsLogin(false));
    window.location.href = "/";
  }

  return (
    <header>
      <nav className="bg-white border-gray-200 bg-opacity-100 h-[72px] dark:bg-gray-900 fixed top-0 w-full z-50">
        <div className="max-w-full flex flex-wrap items-center justify-between mx-auto pl-6 pr-2 md:px-8 py-3">
          <Link to="/" className="flex items-center">
            <img
              src="assets/images/logo.png"
              className="w-[140px] h-[40px]"
              alt="GCI Logo"
            />
          </Link>

          {/* Stateful and Stateless Button */}
          <div className="flex md:order-2">
            {user && user.name ? (
              <>
                <div
                  className="flex btn place-content-center btn-ghost text-white bg-red-600 hover:bg-red-800 outline-none capitalize px-[12px] py-[8px] rounded-3xl text-sm text-center mr-3 md:mr-0 "
                  onClick={() => setNavbar(!navbar)}
                >
                  <div className="avatar online placeholder">
                    <div className="bg-gray-100 text-black rounded-full w-8">
                      <span className="text-sm uppercase">
                        {user.name.slice(0, 2)}
                      </span>
                    </div>
                  </div>

                  {navbar ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </div>
              </>
            ) : (
              <button
                className="hidden md:flex btn btn-ghost btn-md font-light justify-center text-sm text-white bg-red-700 hover:bg-red-800 outline-none capitalize px-[16px] py-[8px] rounded-3xl text-center mr-3 md:mr-0 "
                onClick={() => props.setOpenModal("form-elements")}
                width="10px"
              >
                <FaUserAlt className="" />
                Masuk ke Akun
              </button>
            )}
          </div>

          <Modal
            show={props.openModal === "form-elements"}
            size="md"
            popup
            onClose={() => props.setOpenModal(undefined)}
          >
            <Modal.Header />
            <Modal.Body>
              <LoginComp />
            </Modal.Body>
          </Modal>

          <div className="items-center justify-between w-full lg:flex md:w-auto md:order-1 transition-all duration-500 ease-in">
            <ul className="hidden lg:flex font-medium md:p-0 mt-4 md:flex-row md:space-x-14 md:mt-0 md:border-0 ">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 rounded md:bg-transparent text-gray-900 md:hover:text-red-700 md:p-0 md:dark:text-red-500"
                  aria-current="page"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  to="/posisi"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Posisi
                </Link>
              </li>
              <li>
                <Link
                  to="/kegiatan"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:dark:hover:text-red-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Kegiatanku
                </Link>
              </li>
            </ul>
          </div>

          <ul
            className={`${
              navbar ? "flex" : "hidden"
            } absolute justify-between menu top-0 right-0 rounded-xl h-fit mt-[74px] mr-8 bg-white shadow-md`}
          >
            <li className="hidden lg:block">
              <Link to="/profil" className="flex gap-3 px-5">
                <FaUserAlt />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/gantisandi" className="flex gap-3 px-5">
                <FaLock />
                Ganti Password
              </Link>
            </li>
            <li>
              <button onClick={logout} className="flex gap-3 px-5">
                <FaPowerOff />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile */}

      <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 lg:hidden">
        <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
          <MobileNavComp />
        </div>
      </div>
    </header>
  );
}
