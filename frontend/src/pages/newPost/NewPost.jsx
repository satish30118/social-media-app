import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import "../../assets/css/newpost.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../ContextApi/authContext";
import { Helmet } from "react-helmet";
import Sppinner from "../../Animations/Sppinner";

const NewPost = () => {
  const [auth] = useAuth();
  const [animation, setAnimation] = useState(false);
  const [description, setDescription] = useState("");
  const [picture, setpicture] = useState("");

  const navigate = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    if (!description && !picture) {
      return toast.warn("Atleast one field required");
    }

    const formData = new FormData();
    formData.append("description", description);
    formData.append("picture", picture);
    formData.append("userId", auth?.user?._id);

    try {
      setAnimation(true);
      const { data } = await axios.post(`api/v1/post/addpost`, formData);
      setAnimation(false);

      if (data?.success) {
        toast.success(data?.message);
        setTimeout(() => {
          navigate("/");
        }, 500);
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
        <title>New Post - Apna Tangle</title>
        <meta
          name="keywords"
          content="Social media, tangle, connect, friends, chat, new post"
        />
      </Helmet>
      <div className="new_post">
        <h2>New Post</h2>
        {animation ? (
          <Sppinner />
        ) : (
          <form>
            <div>
              <div>Upload Files</div>
              <input
                type="file"
                onChange={(e) => setpicture(e.target.files[0])}
              />
            </div>
            <div>
              <textarea
                rows={"9"}
                placeholder="message..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              <button
                className="btn"
                style={{ background: "blue", width: "100%", margin: "20px 0" }}
                onClick={sendData}
              >
                Post
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  style={{ marginLeft: "6px" }}
                />
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default NewPost;
