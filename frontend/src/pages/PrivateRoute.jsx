import React, { useEffect, useState } from "react";
import { useAuth } from "../ContextApi/authContext";
import axios from "axios";
import Loader from "../Animations/Loader";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = () => {
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [auth] = useAuth();
  const navigate = useNavigate();

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
    if (!auth?.token) {
      setTimeout(() => {
        toast.warn("You need to login for this");
      }, 300);
      return navigate("/account-login");
    }
    authCheck();
  }, []);
  return <>{!status ? <Loader msg={msg} /> : <Outlet />}</>;
};

export default PrivateRoute;
