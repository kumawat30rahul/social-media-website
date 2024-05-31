import React from "react";
import "./feed.css";
import AddPost from "../add-post";
import FeedPost from "../post";

const Feed = () => {
  return (
    <div className="h-auto w-full md:w-8/12 lg:w-6/12 ">
      <AddPost />
      <div className="w-full h-auto mt-3">
        <FeedPost />
        <FeedPost />
        <FeedPost />
        <FeedPost />
      </div>
    </div>
  );
};

export default Feed;
