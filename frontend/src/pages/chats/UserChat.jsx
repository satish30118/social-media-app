import React, { useEffect, useState } from "react";
import Layout from "../../layouts/Layout";
import { useParams } from "react-router-dom";
import "../../assets/css/userchat.css";
import axios from "axios";
import { useAuth } from "../../ContextApi/authContext";

const UserChat = () => {
  const [auth] = useAuth();
  const { id, name } = useParams();
  const [description, setdescription] = useState("");
  const [allChats, setAllChats] = useState([]);

  const sendData = async (e) => {
    e.preventDefault();
    if (!description) {
      return;
    }
    const formData = new FormData();
    formData.append("description", description);
    formData.append("receiverId", id);
    formData.append("userId", auth?.user?._id);

    try {
      setdescription("");
      const { data } = await axios.post(`api/v1/post/addpost`, formData);
      if (data?.success) {
        getAllChats();
      }
    } catch (error) {
      console.log("Error In Chat", error);
    }
  };

  const getAllChats = async () => {
    try {
      const { data } = await axios.get(
        `api/v1/post/${auth?.user?._id}/${id}/chats`
      );

      if (data?.success) {
        setAllChats(data?.details);
      }
    } catch (error) {
      console.log("RETRIEVE ALL CHATS ", error);
    }
  };

  useEffect(() => {
    getAllChats();
  }, []);
  return (
    <>
      <Layout>
        <div className="user_chat_page">
          <h4>chat with {name}</h4>
          <div className="chats">
            {allChats?.map((i) => (
              <div
                key={i?._id}
                className="chat_message"
                style={{
                  marginLeft: `${auth?.user?._id == i?.userId ? "20%" : "0"}`,
                  background: `${auth?.user?._id == i?.userId ? "lightgreen" : "lightblue"}`,
                }}
              >
                <div>{i?.description}</div>
                <div id="chat_date">{i?.createdAt.split("T")[0]}</div>
              </div>
            ))}
          </div>
          <div className="chat_input">
            <input
              type="text"
              placeholder="message..."
              onChange={(e) => setdescription(e.target.value)}
              value={description}
            />{" "}
            <i
              className="fa-solid fa-paper-plane"
              title="Send Message"
              onClick={sendData}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default UserChat;
