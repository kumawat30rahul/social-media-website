import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import "./post-pop-up.css";
import {
  getPostsByIds,
  getUserDetails,
  updateComment,
} from "../../../config/services";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";

const PostPopup = ({ open, handleCloseFunc, postId, userId }) => {
  const [postData, setPostData] = useState([]); // [1
  const [userDetails, setUserDetails] = useState({}); // [
  const [comment, setComment] = useState("");
  const [commentLoader, setCommentLoader] = useState(false);
  const [commentLength, setCommentLength] = useState();

  const postComment = (postId) => {
    setCommentLoader(true);
    const payload = {
      commentedUserId: userId,
      postId: postData?.postId,
      comment,
    };

    updateComment(payload)
      .then((res) => {
        console.log(res);
        getUserDetails(userId).then((res) => {
          // const comments = res?.
          console.log(res);
          const comments = {
            ...postData,
            comments: [
              ...postData?.comments,
              {
                userName: res?.userDetails?.username,
                comment,
              },
            ],
          };
          setPostData(comments);
          setCommentLength(commentLength + 1);
          setCommentLoader(false);
          setComment("");
        });
      })
      .catch((err) => {
        console.log(err);
        setCommentLoader(false);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "2px solid #000000",
  };

  console.log("post popup", open, postId, userId);
  const fetchingPostDetails = () => {
    getPostsByIds([postId])
      .then((response) => {
        console.log(response);
        setPostData(response?.posts?.[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchingUserDetails = () => {
    // Fetch user details
    getUserDetails(userId)
      .then((response) => {
        console.log(response);
        setUserDetails(response?.userDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (open && postId && userId) {
      fetchingPostDetails();
      fetchingUserDetails();
    }
  }, [open, postId, userId]);
  return (
    <Modal open={open} onClose={() => handleCloseFunc(false)} disableAutoFocus>
      <Box sx={style}>
        <div className="flex flex-col md:flex-row items-stretch post-popup-content-conatiner">
          <div className="bg-gray-800 image-div-popup">
            <img src={postData?.postMedia?.imageLink} className="image-popup" />
          </div>
          <div className="bg-primary comment-section-popup relative">
            <div className="h-18">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={userDetails?.profileImage}
                    alt={userDetails?.userName}
                    sx={{
                      width: 38,
                      height: 38,
                    }}
                  />
                  <div className="flex flex-col items-start">
                    <span className="text-md text-bold">
                      {userDetails?.username}
                    </span>
                    <span className="text-xs">{userDetails?.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <IconButton onClick={handleCloseFunc}>
                    <CloseIcon sx={{ color: "white !important" }} />
                  </IconButton>
                  {/* <MoreHorizIcon /> */}
                </div>
              </div>
            </div>
            <Divider
              sx={{
                marginTop: "14px",
                backgroundColor: "#484444 !important",
                opacity: "1 !important",
              }}
            />
            <div className="p-2">
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    src={userDetails?.profileImage}
                    alt={userDetails?.userName}
                    sx={{
                      width: 38,
                      height: 38,
                    }}
                  />
                  <div className="p-2">
                    <span className="text-md text-bold mr-3">
                      {userDetails?.username}
                    </span>
                    <span className="text-md text-bold">
                      {postData?.caption}
                    </span>
                  </div>
                </div>
                <Divider
                  sx={{
                    marginTop: "14px",
                    backgroundColor: "#484444 !important",
                    opacity: "1 !important",
                    width: "20% !important",
                    margin: "auto",
                  }}
                />
                <div className="mt-2 flex flex-col gap-2">
                  {postData?.comments?.map((comment, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <Avatar
                        src={comment?.userImage}
                        alt={comment?.userName}
                        sx={{
                          width: 38,
                          height: 38,
                        }}
                      />
                      <div className="">
                        <span className="text-md text-bold mr-3">
                          {comment?.userName}
                        </span>
                        <span className="text-md text-bold">
                          {comment?.comment}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-14  absolute bottom-0 right-0 left-0">
              <Divider
                sx={{
                  backgroundColor: "#484444 !important",
                  opacity: "1 !important",
                }}
              />
              <div className="flex items-center justify-between p-4">
                <input
                  type="text"
                  placeholder="Add a comment"
                  className="w-full bg-transparent text-white outline-none"
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className="text-white text-sm font-bold bg-blue-500 px-2 rounded-sm py-1 flex items-center justify-center"
                  onClick={() => postComment(postData?.postId)}
                >
                  {commentLoader ? (
                    <CircularProgress
                      size={20}
                      sx={{ color: "white !important" }}
                    />
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

{
}

export default PostPopup;
