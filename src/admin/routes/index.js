import { lazy } from "react";

const Administrasi = lazy(() => import("../pages/Seleksi/Administrasi"));
const TesKemampuan = lazy(() => import("../pages/Seleksi/TesKemampuan"));
const Wawancara = lazy(() => import("../pages/Seleksi/Wawancara"));
const Monitoring = lazy(() => import("../pages/Monitoring/Monitoring"));
const Alumni = lazy(() => import("../pages/Alumni/Alumni"));
const AdminMaster = lazy(() => import("../pages/AdminMaster/AdminMaster"));
const PosisiMagang = lazy(() => import("../pages/Tambah/PosisiMagang"));
const Jurusan = lazy(() => import("../pages/Tambah/Jurusan"));
const Mitra = lazy(() => import("../pages/Tambah/Mitra"));
const GantiSandiAdmin = lazy(() => import("../pages/GantiSandiAdmin"));

const coreRoutes = [
  {
    path: "/admin/seleksi/administrasi",
    title: "Seleksi Administrasi",
    component: Administrasi,
  },
  {
    path: "/admin/seleksi/teskemampuan",
    title: "Seleksi Tes Kemampuan",
    component: TesKemampuan,
  },
  {
    path: "/admin/seleksi/wawancara",
    title: "Seleksi Wawancara",
    component: Wawancara,
  },
  {
    path: "/admin/monitoring",
    title: "Monitoring",
    component: Monitoring,
  },
  {
    path: "/admin/alumni",
    title: "Data Alumni",
    component: Alumni,
  },
  {
    path: "/admin/buat-admin",
    title: "Master Admin",
    component: AdminMaster,
  },
  {
    path: "/admin/tambah/posisi",
    title: "Tambah Posisi Magang",
    component: PosisiMagang,
  },
  {
    path: "/admin/tambah/jurusan",
    title: "Tambah Jurusan",
    component: Jurusan,
  },
  {
    path: "/admin/tambah/mitra",
    title: "Tambah Mitra",
    component: Mitra,
  },
  {
    path: "/gantisandiadmin",
    title: "Ganti Kata Sandi",
    component: GantiSandiAdmin,
  },
];
const routes = [...coreRoutes];
export default routes;
