import React from "react";
import "../assets/css/components.css";
import img from "../assets/img/bg.jpg";

const Post = () => {
  return (
    <div className="post_comp">
      <div className="post_sender">
        <div>
          <img src={img} alt="" />
        </div>
        <div>Satish Maurya</div>
      </div>
      <hr />
      <div className="post_file">
        <img src={img} alt="" />
      </div>

      <div className="post_content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe quae,
        vero id error mollitia quo eligendi odit quidem aperiam officia autem
        voluptates enim harum nulla ab quis officiis incidunt magnam, cum,
        perspiciatis maiores corporis omnis. Nihil, accusamus et, deleniti
        possimus suntatae.
      </div>
    </div>
  );
};

export default Post;
