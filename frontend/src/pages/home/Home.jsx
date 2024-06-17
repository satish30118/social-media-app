import React from "react";
import "../../assets/css/home.css";
import Layout from "../../layouts/Layout";
import { useNavigate } from "react-router-dom";
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
        <Post />
        <NewPost/>
      </div>
    </Layout>
  );
}
