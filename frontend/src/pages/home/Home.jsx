import React, { useEffect, useState } from "react";
import "../../assets/css/home.css";
import Layout from "../../layouts/Layout";
import { Link,} from "react-router-dom";
import { Helmet } from "react-helmet";
import Post from "../../components/Post";
import axios from "axios";
import Sppinner from "../../Animations/Sppinner";

export default function Home() {
  const [animation, setAnimation] = useState(false);
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    try {
      setAnimation(true);
      const { data } = await axios.get(`api/v1/post/getposts`);
      setAnimation(false);
      setPosts(data?.details);
      console.log(posts)
    } catch (error) {
      setAnimation(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <Layout>
      <Helmet>
        <title>Welcome to Apna Tangle</title>
        <meta
          name="keywords"
          content="Social media, tangle, connect, friends, chat"
        />
      </Helmet>
      <div className="home_page">
        <div className="h_posts">
          {animation ? (
            <Sppinner />
          ) : (
            posts?.map((item) => (
              <div key={item?._id}>
                <Post data={item} />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="h_btn">
        <Link to={"/"}>
        <i className="fa-solid fa-home" title="Go to Home"/>
        </Link>
        <Link to={"/new-post"}>
          <i className="fa-solid fa-plus h-plus" title="New Post"/>
        </Link>

        <Link to={"/user-chat"}>
          <i className="fa-regular fa-comments" title="Chat with friends"/>
        </Link>
      </div>
    </Layout>
  );
}
