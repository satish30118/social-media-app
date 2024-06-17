import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/account.css";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextApi/authContext";
import Sppinner from "../../Animations/Sppinner";
import axios from "axios";
import { Helmet } from "react-helmet";

const Register = () => {
  const [auth, setAuth] = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [cpassword, setCPassword] = useState();
  const [picture, setPicture] = useState();
  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return toast.warn("Enter Name, Email Id and password");
    }
    if (!picture) {
      return toast.warn("Upload Profile Picture");
    }
    if (password !== cpassword) {
      return toast.warn("Enter password and confirm password not matched.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("picture", picture);

    try {
      setAnimation(true);
      const { data } = await axios.post(`api/v1/auth/register`, 
        formData,
      );
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
      console.log("Error In Register " + error);
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Account Register - Apna Tangle</title>
        <meta
          name="keywords"
          content="account Register,Apna, apna tangle, tangle, chat with friends and relatives "
        />
      </Helmet>
      <div className="account_page">
        {animation ? (
          <Sppinner />
        ) : (
          <form>
            <h2>New User </h2>
            <div className="name">
              <input
                type="text"
                id="name"
                maxLength={50}
                minLength={3}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="userId">
              <input
                type="email"
                id="userId"
                maxLength={60}
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
            <div className="password">
              <input
                type={showPassword ? "text" : "password"}
                id="cpassword"
                placeholder="Confirm Password"
                onChange={(e) => setCPassword(e.target.value)}
                value={cpassword}
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
            <div>
              <div
                style={{
                  color: "rgb(3, 10, 88)",
                  textAlign: "left",
                  fontWeight: "600",
                  marginTop: "10px",
                }}
              >
                UPLOAD PROFILE PICTURE
              </div>
              <input
                type="file"
                id="file"
                onChange={(e) => setPicture(e.target.files[0])}
              />
            </div>

            <div className="form_btn">
              <button
                className="btn register_btn"
                onClick={sendData}
                style={{ width: "100%" }}
              >
                Register{" "}
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  style={{ marginLeft: "6px" }}
                />
              </button>
            </div>

            <div className="forgot_password">
              <span>Have Account? - </span>

              <Link
                to="/account-login"
                style={{
                  textDecoration: "none",
                  fontSize: "17px",
                  marginLeft: "0px",
                  color: "darkblue",
                }}
              >
                Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default Register;
