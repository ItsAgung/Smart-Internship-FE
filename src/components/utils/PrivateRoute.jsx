import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLogin, setToken, setUser } from "../../reducer/myReducer";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ role }) => {
  const token = Cookies.get("user");
  const currentUser = token && jwtDecode(token);
  const isAuthorized = (userRole) => role.includes(userRole);

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const authIsProtected = location.pathname.split("/").indexOf("masuk") !== -1;

  useEffect(() => {
    if (!isLoading && token && !isAuthorized(currentUser.role)) {
      // Redirect to unauthorized page if the user's role doesn't match
      navigate("/unauthorized");
    }

    if (!isLoading && token && authIsProtected) {
      navigate(-1);
    }

    dispatch(setUser(currentUser));
    dispatch(setToken(token));
    dispatch(setIsLogin(true));
    setIsLoading(false);
  }, [isLoading, token, authIsProtected]);

  return token ? <Outlet /> : <Navigate to="/masuk" replace />;
};

export default PrivateRoute;
