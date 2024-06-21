import React, { useEffect, useState } from "react";
import "./feed.css";
import AddPost from "../add-post";
import FeedPost from "../post";
import { getAllPosts } from "../../config/services";
import { Divider } from "@mui/material";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");

  const getAllUserPosts = () => {
    getAllPosts(userId)
      .then((response) => {
        console.log(response);
        setPosts(response?.postData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userId) {
      getAllUserPosts();
    }
  }, [userId]);

  return (
    <div className="h-auto w-full md:w-8/12 lg:w-6/12 ">
      <AddPost />
      <Divider
        sx={{
          marginTop: "14px",
          backgroundColor: "#484444 !important",
          opacity: "1 !important",
        }}
      />
      <div className="w-full h-auto mt-3">
        {posts?.map((post, index) => (
          <FeedPost key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
