import React, { useEffect, useState } from "react";
import { useAuth } from "../ContextApi/authContext";
import axios from "axios";
import Loader from "../Animations/Loader";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const { data } = await axios.get(`/api/v1/auth/private-route`);
      setMsg(data?.message);
      if (data?.success) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    };
    authCheck();
  }, []);
  return <>{!status ? <Loader msg={msg} /> : <Outlet />}</>;
};

export default PrivateRoute;
