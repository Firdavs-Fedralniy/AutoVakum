import { useEffect } from "react";
import { getServices } from "../services/servicesApi";
import Home from "../pages/Home/Home";
import Loader from "../components/Loader/Loader";
import AdminLogin from "../components/AdminLogin/AdminLogin";
import { Route, Routes } from "react-router-dom";
import Admin from "../pages/Admin/Admin";

function App() {
  return (
    <>
    <Loader/>
    <AdminLogin/>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

export default App;