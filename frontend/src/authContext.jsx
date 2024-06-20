import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  // DEFAULTS HEADERs
  axios.defaults.headers.common["Authorization"] = auth?.token;
  axios.defaults.baseURL = process.env.REACT_APP_API;

  useEffect(() => {
    const data = localStorage.getItem("apnatangle");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({ ...auth, user: parsedData.details, token: parsedData.token });
    }
  }, [auth?.token]);

  return (
    <>
      <AuthContext.Provider value={[auth, setAuth]}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider, AuthContext };
