import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import profile from "../../assets/img/bg.jpg";
import "../../assets/css/dashboard.css";
import axios from "axios";
import { useAuth } from "../../ContextApi/authContext";
import Sppinner from "../../Animations/Sppinner";
import Post from "../../components/Post";
import { Helmet } from "react-helmet";

const UserDashboard = () => {
  const [auth] = useAuth();
  const [animation, setAnimation] = useState(false);
  const [posts, setPosts] = useState([]);
  const imgPath = `${process.env.REACT_APP_API}/${auth?.user?.picturePath}`;

  const getPostData = async () => {
    try {
      setAnimation(true);
      const { data } = await axios.get(`api/v1/post/${auth?.user?._id}/posts`);
      setAnimation(false);
      setPosts(data?.details);
    } catch (error) {
      setAnimation(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>User Dashboard - Apna Tangle</title>
        <meta
          name="keywords"
          content="Social media, tangle, connect, friends, chat, dashboard, user acount, profile"
        />
      </Helmet>
      <div className="dashboard">
        <div className="user_details">
          <div className="user_profile">
            <img src={imgPath ? imgPath : profile} alt="" />
          </div>
          <div className="content">
            <div>{auth?.user?.name}</div>
            <div>{auth?.user?.email}</div>
            <div>Follower </div>
            <div>Following </div>
            <div>Posts </div>
          </div>
          <div className="content" style={{ marginLeft: "10px" }}>
            <div>
              <button
                className="btn"
                title="Edit Profile"
                style={{ background: "transparent", margin: "0", padding: "0" }}
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ marginLeft: "10px", color: "blue" }}
                />
              </button>
            </div>
            <div>
              <button
                className="btn"
                title="Delete Account"
                style={{ background: "transparent", margin: "0", padding: "0" }}
              >
                <i
                  className="fa-solid fa-trash-can"
                  style={{
                    marginLeft: "10px",
                    color: "red",
                    fontSize: "20px",
                  }}
                />
              </button>
            </div>
            <div> : 210</div>
            <div> : 139</div>
            <div> : {posts.length}</div>
          </div>
        </div>
        <hr />
        <h2>Posts</h2>
        <hr />
        <br />

        <div>
          {animation ? (
            <Sppinner />
          ) : (
            posts?.map((item) => (
              <div
                style={{ maxWidth: "410px", margin: "0 auto" }}
                key={item?._id}
              >
                <Post data={item} />
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
