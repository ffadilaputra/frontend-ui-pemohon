import Register from "../pages/Register";
import Berkas from "../pages/Berkas";
import Pekerjaan from "../pages/Pekerjaan";
import Login from "../pages/Login";
import Pemohon from "../pages/Pemohon";
import Asesmen from "../pages/Asesmen";

const routes: IRoute[] = [
  {
    name: "berkas",
    component: Berkas,
    label: "Berkas",
    icon: "cube",
    path: "/berkas",
    private: true,
    hide: true
  },
  {
    name: "asesmen",
    component: Asesmen,
    label: "Asesmen",
    icon: "file",
    path: "/asesmen",
    private: true
  },
  {
    name: "pemohon",
    component: Pemohon,
    label: "Profil",
    icon: "user",
    path: "/pemohon",
    private: true,
    hide: false
  },
  {
    name: "pekerjaan",
    component: Pekerjaan,
    label: "Pekerjaan",
    icon: "briefcase",
    path: "/pekerjaan",
    private: true,
    hide: false
  },
  {
    name: "login",
    component: Login,
    label: "Profile",
    path: "/login",
    private: true,
    hide: true
  },
  {
    name: "register",
    component: Register,
    label: "Register",
    icon: "cube",
    path: "/register",
    private: true,
    hide: true
  }
];

export default routes;
