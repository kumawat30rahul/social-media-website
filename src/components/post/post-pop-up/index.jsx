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
import { useNavigate } from "react-router-dom";

const PostPopup = ({ open, handleCloseFunc, postId, userId }) => {
  const [postData, setPostData] = useState([]); // [1
  const [userDetails, setUserDetails] = useState({}); // [
  const [comment, setComment] = useState("");
  const [commentLoader, setCommentLoader] = useState(false);
  const [commentLength, setCommentLength] = useState();
  const navigate = useNavigate();
  const selfUserId = localStorage.getItem("userId");
  const isMobile = window.innerWidth < 768;

  const postComment = (postId) => {
    setCommentLoader(true);
    const payload = {
      commentedUserId: selfUserId,
      postId: postData?.postId,
      comment,
    };

    updateComment(payload)
      .then((res) => {
        getUserDetails(userId).then((res) => {
          // const comments = res?.
          const comments = {
            ...postData,
            comments: [
              ...postData?.comments,
              {
                userName: res?.userDetails?.username,
                comment,
                userProfilePicture: res?.userDetails?.profilePicture,
              },
            ],
          };
          setPostData(comments);
          setComment("");
          setCommentLoader(false);
        });
      })
      .catch((err) => {
        setCommentLoader(false);
      });
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? "100%" : "75%",
    height: isMobile ? "100%" : "50vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: "2px solid #000000",
  };

  const fetchingPostDetails = () => {
    getPostsByIds([postId])
      .then((response) => {
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

  const userNavigationToProfilePage = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <Modal open={open} onClose={() => handleCloseFunc(false)} disableAutoFocus>
      <Box sx={style}>
        <div className="flex flex-col md:flex-row items-stretch post-popup-content-conatiner w-full">
          <div className="bg-gray-800 image-div-popup">
            <img src={postData?.postMedia?.imageLink} className="image-popup" />
          </div>
          <div className="bg-primary comment-section-popup relative min-w-42 overflow-hidden h-full">
            <div className="h-18 ">
              <div className="flex items-center justify-between p-2">
                <div className="flex items-center gap-2">
                  <Avatar
                    src={userDetails?.profilePicture}
                    alt={userDetails?.userName}
                    sx={{
                      width: 38,
                      height: 38,
                    }}
                  />
                  <div
                    className="flex flex-col items-start hover:text-blue-800 cursor-pointer"
                    onClick={() =>
                      userNavigationToProfilePage(userDetails?.userId)
                    }
                  >
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
            <div className="p-2 h-[79%] overflow-y-scroll">
              <div className="flex flex-col items-start flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar
                    src={userDetails?.profilePicture}
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
                <div className="mt-2 flex flex-col gap-2 h-5/6">
                  {postData?.comments?.map((comment, index) => (
                    <div className="flex items-center gap-4" key={index}>
                      <Avatar
                        src={comment?.userProfilePicture}
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
            <div className="h-14  absolute bottom-0 right-0 left-0 z-50 bg-primary">
              <Divider
                sx={{
                  backgroundColor: "#484444 !important",
                  opacity: "1 !important",
                }}
              />
              <div className="flex items-center justify-between p-4">
                <input
                  type="text"
                  value={comment}
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
