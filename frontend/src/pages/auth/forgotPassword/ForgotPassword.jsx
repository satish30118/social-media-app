import React, { useState } from "react";
import "./forgotpassword.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "../../../layouts/Layout";
import { Helmet } from "react-helmet";

export default function ForgotPassword() {
  const [sendOtpBtn, setSendOtpBtn] = useState({
    text: "Send OTP",
    bg: "blue",
  });
  const [otpInput, setOtpInput] = useState(false);
  const [verifyBtn, setVerifyBtn] = useState({
    text: "Verify OTP",
    bg: "Blue",
  });
  const [otpVerification, setotpVerification] = useState(false);
  const [submitBtn, setSubmitBtn] = useState({
    text: "Change Password",
    bg: "Green",
  });
  const [showPassword, setShowPassword] = useState(false);

  const [data, setdata] = useState({
    email: "",
    inputOTP: "",
    password: "",
    cpassword: "",
  });

  const sendOTP = async (e) => {
    const { email } = data;
    if (!email) {
      const notify = () => toast.warn("Enter email!");
      notify();
      return;
    }

    try {
      setSendOtpBtn({ text: "Sending...", bg: "gray" });
      const res = await fetch("/account/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.status == 200) {
        const notify = () => toast.success("OTP send successfully!");
        notify();
        setOtpInput(true);
        setSendOtpBtn({ text: "OTP sent", bg: "green" });
        return;
      } else {
        const notify = () => toast.error("OTP can't send, please try again");
        notify();
        setOtpInput(false);
        setSendOtpBtn({ text: "Re-send OTP", bg: "red" });
        return;
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast.error("OTP can't send, please try again");
      notify();
      setOtpInput(false);
      setSendOtpBtn({ text: "Re-send OTP", bg: "red" });
      return;
    }
  };

  const handleData = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setdata({ ...data, [name]: value });
  };

  const verifyOTP = async () => {
    const { inputOTP } = data;

    if (!inputOTP) {
      const notify = () => toast.warn("Enter OTP!");
      notify();
      return;
    }

    try {
      setVerifyBtn({ text: "Verifying...", bg: "gray" });
      const res = await fetch("/account/api/auth/forgot-password/verifyotp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputOTP }),
      });

      if (res.status == 200) {
        const notify = () => toast.success("OTP verify successfully!");
        notify();
        setVerifyBtn({ text: "Verified", bg: "green" });
        setOtpInput(false);
        setotpVerification(true);
        return;
      } else {
        const notify = () => toast.error("OTP can't verify!");
        notify();
        setOtpInput(true);
        setVerifyBtn({ text: "Re-verify", bg: "red" });
        return;
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast.error("OTP can't verify!");
      notify();
      setOtpInput(true);
      setVerifyBtn({ text: "Re-verify", bg: "red" });
      return;
    }
  };

  const changePass = async (e) => {
    const { email, password, cpassword } = data;

    if (!password || !cpassword) {
      const notify = () => toast.warn("Enter required field!!");
      notify();
      return;
    }

    if (password != cpassword) {
      const notify = () =>
        toast.warn("password and confirm password not matched");
      notify();
      return;
    }

    try {
      setSubmitBtn({ text: "changing password...", bg: "gray" });
      const res = await fetch("/account/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.status == 200) {
        const notify = () => toast.success("password changed");
        notify();
        setSubmitBtn({ text: "Password Changed", bg: "green" });
        return;
      } else if (res.status == 420) {
        const notify = () => toast.error("user can't find");
        notify();
        setSubmitBtn({ text: "Re-changed", bg: "red" });
        return;
      } else {
        const notify = () => toast.error("password can't changed!");
        notify();
        setSubmitBtn({ text: "Re-changed", bg: "red" });
        return;
      }
    } catch (error) {
      console.log(error);
      const notify = () => toast.error("password can't changed!");
      notify();
      setSubmitBtn({ text: "Re-changed", bg: "red" });
      return;
    }
  };
  return (
    <Layout>
      <Helmet>
        <title>Reset Password - Apna Tangle</title>
        <meta
          name="keywords"
          content="Social media, tangle, connect, friends, chat, reset password, forgot password"
        />
      </Helmet>
      <div className="forgot-password-page">
        <div className="forgot-password-pop">
          <h2>Reset Password</h2>
          <div className="email-field">
            {/* <label htmlFor="femail">Enter Registered Email</label> */}
            <input
              type="email"
              name="email"
              id="femail"
              onChange={handleData}
              placeholder="Email Id"
            />
            <button
              style={{
                margin: " 20px 0 0",
                backgroundColor: `${sendOtpBtn.bg}`,
                width: "100%",
              }}
              onClick={sendOTP}
            >
              {sendOtpBtn.text}{" "}
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ marginLeft: "6px" }}
              />
            </button>
          </div>

          {/* OTP INPUT FIELD */}
          {otpInput ? (
            <div className="otp-field">
              <label htmlFor="otp">Enter OTP</label>
              <input type="number" onChange={handleData} name="inputOTP" />
              <button
                style={{ backgroundColor: `${verifyBtn.bg}` }}
                onClick={verifyOTP}
              >
                {verifyBtn.text}
              </button>
            </div>
          ) : (
            ""
          )}

          {/* NEW PASSWORD FIELD */}
          {otpVerification ? (
            <>
              <div className="password-field">
                <div className="password">
                  <label htmlFor="password">Password :-</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="********"
                    value={data.password}
                    onChange={handleData}
                  />
                </div>

                <div className="confirm_password">
                  <label htmlFor="confirm_password">Confirm Password :-</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="cpassword"
                    id="cpassword"
                    placeholder="********"
                    value={data.cpassword}
                    onChange={handleData}
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
              </div>

              <div
                className="change-password-field"
                style={{ textAlign: "right", marginTop: "23px" }}
              >
                <button
                  style={{ backgroundColor: `${submitBtn.bg}` }}
                  onClick={changePass}
                >
                  {submitBtn.text}
                </button>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>

      <ToastContainer position="top-center" theme="colored" />
    </Layout>
  );
}
