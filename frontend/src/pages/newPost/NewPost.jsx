import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import "../../assets/css/newpost.css";

const NewPost = () => {
  const [animation, setAnimation] = useState(false);

  return (
    <Layout>
      <div className="new_post">
        <h2>New Post</h2>
        <form>
          <div>
            <div>Upload Files</div>
            <input type="file" />
          </div>
          <div>
            <textarea rows={"9"} placeholder="message..." />
          </div>
          <div>
            <button className="btn" style={{background:"blue", width:"100%", margin:"20px 0"}}>
              Post
              <i
                className="fa-solid fa-arrow-up-right-from-square"
                style={{ marginLeft: "6px" }}
              />
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewPost;
