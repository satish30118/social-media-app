import React, { useEffect } from "react";
import Layout from "../../layouts/Layout";
import profile from "../../assets/img/bg.jpg";
import "../../assets/css/dashboard.css";
import axios from "axios";
import { useAuth } from "../../ContextApi/authContext";

const UserDashboard = () => {
  const [auth] = useAuth();
  const getData = async () => {
    const { data } = await axios.get(`api/v1/user/getuser/${auth?.user?._id}`);
  };

  useEffect(() => {
    getData();
  });
  return (
    <Layout>
      <div className="dashboard">
        <div className="user_details">
          <div className="user_profile">
            <img src={profile} alt="" />
          </div>
          <div className="content">
            <div>Name : Satish Kumar Maurya</div>
            <div>Email : satish@gmail.com</div>
            <div>Mobile : 7985017186</div>
          </div>
        </div>
        <hr />
        <h2>Posts</h2>
        <hr />
      </div>
    </Layout>
  );
};

export default UserDashboard;
