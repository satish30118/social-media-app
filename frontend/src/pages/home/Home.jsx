import React from "react";
import "../../assets/css/home.css";
import Layout from "../../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import userProfile from "../../assets/img/bg1.jpg";
import { useAuth } from "../../ContextApi/authContext";

export default function Home() {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const imgPath = `${process.env.REACT_APP_API}/${auth?.user?.picturePath}`;
  return (
    <Layout>
      <Helmet>
        <title>Welcome to Tangle</title>
        <meta
          name="keywords"
          content="Social media, tangle, connect, friends, chat"
        />
      </Helmet>
      <div className="home_page">
        <Post /> <Post /> <Post /> <Post /> <Post />
      </div>

      <div className="h_btn">
        <Link to={"/dashboard"}>
          <img
            src={auth?.user?.picturePath ? imgPath : userProfile}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid white",
            }}
            title="User Dashboard"
            alt="profile"
          />
        </Link>
        <Link to={"/new-post"}>
          <i className="fa-solid fa-plus h-plus" />
        </Link>

        <Link to={"/friend-message"}>
          <i className="fa-regular fa-comments" />
        </Link>
      </div>
    </Layout>
  );
}
