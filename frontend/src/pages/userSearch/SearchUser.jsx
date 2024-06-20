import React, { useState } from "react";
import Layout from "../../layouts/Layout";
import axios from "axios";
import "../../assets/css/searchuser.css";
import { Link } from "react-router-dom";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async (e) => {
    // if (!e.target.value) {
    //   return;
    // }
    try {
      setUsers([]);
      const { data } = await axios.get(
        `api/v1/user/search-user/${e.target.value}`
      );
      if (data?.success) {
        setUsers(data?.details);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="search_page">
          <div className="search_user">
            <input
              type="text"
              placeholder="Search Friends"
              onChange={getUsers}
            />
          </div>

          <div className="found_users">
            {users?.map((i) => (
              <Link to={`/user-chat/${i?._id}/${i?.name}`} key={i?._id}>
                <div className="found_user">
                  <p className="found_user_name">{i?.name}</p>
                  <p className="found_user_email">{i?.email}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchUser;
