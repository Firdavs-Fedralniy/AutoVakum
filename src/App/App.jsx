import { useEffect } from "react";
import { getServices } from "../services/servicesApi";
import Home from "../pages/Home/Home";
import Loader from "../components/Loader/Loader";

function App() {
  return (
    <>
    <Loader/>
    <Home/>
    </>
  )
}

export default App;