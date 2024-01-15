import NavbarHome from "./home/NavbarHome";
import FooterSection from "./home/FooterSection";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import { setIsLogin, setToken, setUser } from "../reducer/myReducer";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import FloatingActionWa from "./home/FloatingActionWa";

const ParentLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = Cookies.get("user");
  const user = token && jwtDecode(token);

  useEffect(() => {
    if (token) {
      dispatch(setUser(user));
      dispatch(setToken(token));
      dispatch(setIsLogin(true));
    }

    if (user?.role === "ADMIN" || user?.role === "SUPERADMIN") {
      navigate("/admin/dashboard");
    }
  }, [token]);
  return (
    <div>
      <NavbarHome />
      <div className="mt-[72px]">{children}</div>
      <FloatingActionWa
        nomor={+628117692800}
        desc={
          "Halo Admin!, Saya membutuhkan bantuan di Aplikasi Smart Internship"
        }
      />
      <FooterSection />
    </div>
  );
};

export default ParentLayout;
