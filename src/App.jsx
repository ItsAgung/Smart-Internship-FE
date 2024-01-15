import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posisi from "./pages/Posisi";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OtpInput from "./pages/OtpInput";
import PrivateRoute from "./components/utils/PrivateRoute";
import Kegiatanku from "./pages/Kegiatanku";
import Profile from "./pages/Profile";
import LupaPass from "./pages/LupaPass";
import SandiBaru from "./pages/SandiBaru";
import NotFound from "./components/error/NotFound";
import GantiSandi from "./pages/GantiSandi";
import AddProfile from "./pages/AddProfile";
import BerhasilVerif from "./pages/BerhasilVerif";

// Admin Section
import routes from "./admin/routes";
import Loader from "./admin/common/Loader";
import DashboardAdmin from "./admin/pages/Dashboard/DashboardAdmin";
import { Suspense, lazy, useEffect, useState } from "react";
import Unauthorized from "./components/utils/Unauthorized";
const DefaultLayout = lazy(() => import("./admin/layout/DefaultLayout"));

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/" element={<Home />} />
      <Route path="/posisi" element={<Posisi />} />
      <Route path="/kegiatan" element={<Kegiatanku />} />
      <Route path="/masuk" element={<Login />} />
      <Route path="/daftar" element={<Register />} />
      <Route path="/verify" element={<OtpInput />} />
      <Route path="/lupasandi" element={<LupaPass />} />
      <Route path="/sandibaru" element={<SandiBaru />} />
      <Route path="/berhasilverif" element={<BerhasilVerif />} />
      <Route path="/*" element={<NotFound />} />

      {/* Dashboard User */}
      <Route element={<PrivateRoute role="USER" />}>
        <Route path="/profil" element={<Profile />} />
        <Route path="/gantisandi" element={<GantiSandi />} />
        <Route path="/lengkapiprofil" element={<AddProfile />} />
      </Route>

      {/* Dashboard Admin */}
      <Route element={<PrivateRoute role={["ADMIN", "SUPERADMIN"]} />}>
        <Route element={<DefaultLayout />}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          {routes.map((routes, index) => {
            const { path, title, component: Component } = routes;
            return (
              <Route
                key={index}
                path={path}
                element={
                  <Suspense fallback={<Loader />}>
                    <Component title={title} />
                  </Suspense>
                }
              />
            );
          })}
        </Route>
      </Route>
    </Routes>
  );
}
