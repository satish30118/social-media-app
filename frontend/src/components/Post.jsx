import React, { useState } from "react";
import "../assets/css/components.css";
import img from "../assets/img/bg.jpg";
import { Link } from "react-router-dom";

const Post = ({ data }) => {
  const [like, setLike] = useState(false);
  const vdExt = ["mp4", "mov", "wmv", "flv", "webm", "avi"];
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div className="post_comp">
      <div className="post_sender">
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <img
              src={`${process.env.REACT_APP_API}/${data?.userPicturePath}`}
              alt=""
            />
          </div>
          <div>{data?.name}</div>
        </div>
        <div>
          <Link>Follow</Link>
        </div>
      </div>
      <hr />
      <div className="post_file">
        {vdExt?.includes(data?.picturePath.split(".")[1]) ? (
          <video
            src={`${process.env.REACT_APP_API}/${data?.picturePath}`}
            controls
            autoPlay
            muted
          />
        ) : (
          <img
            src={`${process.env.REACT_APP_API}/${data?.picturePath}`}
            alt=""
          />
        )}
      </div>

      <div className="post_content">{data?.description}</div>
      <hr />
      <div className="post_btn">
        <div>Posted : {data?.createdAt.split("T")[0]}</div>
        <div>
          <i
            className={`fa-${like ? "solid" : "regular"} fa-heart`}
            onClick={handleLike}
            title="Like Post"
          />
          <i className="fa-regular fa-comment" title="Comment on Post" />
          <i className="fa-solid fa-share" title="Share this Post" />
        </div>
      </div>
    </div>
  );
};

export default Post;
