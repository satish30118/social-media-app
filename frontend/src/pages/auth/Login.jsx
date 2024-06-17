import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/account.css";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextApi/authContext";
import Sppinner from "../../Animations/Sppinner";
import axios from "axios";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [auth, setAuth] = useAuth();
  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.warn("Enter Email Id and password.");
    }
    try {
      setAnimation(true);
      const { data } = await axios.post(`api/v1/auth/login`, {
        email,
        password,
      });
      setAnimation(false);

      if (data?.success) {
        setAuth({ ...auth, user: data?.details, token: data?.token });
        localStorage.setItem("TANGLE_USER_DET_SAT", JSON.stringify(data));

        // Redirect to Dashboard Page //
        navigate(`/`);
        setTimeout(() => {
          toast.success(data?.message);
        }, 1000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      setAnimation(false);
      toast.error("Something went wrong");
      console.log("Error In login " + error);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Account Login - Tangle</title>
        <meta
          name="keywords"
          content="account login, tangle, chat with friends and relatives "
        />
      </Helmet>
      <div className="account_page">
        {animation ? (
          <Sppinner />
        ) : (
          <form>
            <h2>Account Login </h2>
            <div className="userId">
              <input
                type="email"
                id="userId"
                maxLength={50}
                minLength={5}
                placeholder="Email ID"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                style={{ textTransform: "normal" }}
              />
            </div>
            <div>
              <p
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </p>
            </div>

            <div className="form_btn">
              <button
                className="btn register_btn"
                onClick={sendData}
                style={{ width: "100%" }}
              >
                Login{" "}
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  style={{ marginLeft: "6px" }}
                />
              </button>
            </div>

            <div className="forgot_password">
              <span>Forgot Password? - </span>
              <Link
                to="/account/forgot-password"
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  marginLeft: "0px",
                  color: "darkblue",
                }}
              >
                Reset
              </Link>
            </div>
            <div  className="forgot_password">
              <span> New User? - </span>
              <Link
                to="/account-registration"
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  marginLeft: "0px",
                  color: "darkblue",
                }}
              >
                Register
              </Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Login;
