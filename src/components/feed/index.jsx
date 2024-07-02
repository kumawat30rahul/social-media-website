import React, { useEffect, useState } from "react";
import "./feed.css";
import AddPost from "../add-post";
import FeedPost from "../post";
import { getAllFollowers, getAllPosts } from "../../config/services";
import { Button, Divider, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import PostSkeleton from "../loaders/postSkeletonLoader";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const userId = localStorage.getItem("userId");
  const [noFollowers, setNoFollowers] = useState(false);
  const [openUsersNavigation, setOpenUsersNavigation] = useState(false);
  const navigate = useNavigate();

  const getAllFollowersFunction = () => {
    getAllFollowers(userId)
      .then((response) => {
        console.log(response);
        if (response?.allFollowers?.length === 0) {
          setNoFollowers(true);
          setOpenUsersNavigation(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      getAllFollowersFunction();
    }
  }, [userId]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    // bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleUserNavigation = () => {
    navigate("/discover");
  };

  return (
    <div className="h-auto w-full md:w-8/12 lg:w-6/12 ">
      <div className="hidden md:block">
        <AddPost />
      </div>
      <div className="hidden md:block">
        <Divider
          sx={{
            marginTop: "14px",
            backgroundColor: "#484444 !important",
            opacity: "1 !important",
          }}
        />
      </div>
      <div className="w-full h-auto mt-0 md:mt-3">
        {posts?.map((post, index) => (
          <FeedPost key={index} post={post} />
        ))}
        {posts.length === 0 && (
          <div className="w-full h-auto flex justify-center items-center">
            <p className="text-white">No posts to show</p>
          </div>
        )}
        {noFollowers && (
          <Modal
            open={openUsersNavigation}
            // onClose={() => setOpenUsersNavigation(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={style}
          >
            <div className="bg-primary flex flex-col gap-2 items-center justify-center h-72 rounded-lg">
              <p className="text-white">Follow People to see posts</p>
              <Button
                variant="contained"
                color="info"
                onClick={handleUserNavigation}
              >
                Follow Users
              </Button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Feed;
