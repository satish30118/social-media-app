import React from "react";
import "../../assets/css/home.css";
import Layout from "../../layouts/Layout";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import NewPost from "../newPost/NewPost";

export default function Home() {
  const navigate = useNavigate();
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
        <hr />
        <Link to={"/new-post"}>
          <i className="fa-solid fa-plus h-plus" />
        </Link>

        <Link to={"/friend-message"}>
          <i className="fa-solid fa-message" />
        </Link>
      </div>
    </Layout>
  );
}
