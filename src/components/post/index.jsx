import { Avatar, CircularProgress, Divider, IconButton } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import {
  getUserDetails,
  savePost,
  updateComment,
  updateLike,
} from "../../config/services";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import SharePost from "./share-post";

const FeedPost = ({ post, key }) => {
  const userId = localStorage.getItem("userId");
  const [isLiked, setIsLiked] = useState(post?.likes?.includes(userId));
  const [likeNumber, setLikeNumber] = useState(post?.likes?.length);
  const [isSaved, setIsSaved] = useState(
    post?.user?.savedPosts?.includes(post?.postId)
  );

  //comments state
  const [allComments, setAllComments] = useState(post?.comments || []);
  const [comment, setComment] = useState("");
  const [commentLoader, setCommentLoader] = useState(false);
  const [commentLength, setCommentLength] = useState(
    post?.comments?.length || 0
  );

  //share post states
  const [openShareModal, setOpenShareModal] = useState(false);

  const handleShareModalOpen = () => {
    setOpenShareModal(true);
  };

  const handleShareModalClose = () => {
    setOpenShareModal(false);
  };

  const updatePostLike = (postId) => {
    setIsLiked(!isLiked);
    setLikeNumber(isLiked ? likeNumber - 1 : likeNumber + 1);
    const payload = {
      likedUserId: userId,
      postId: postId,
    };

    updateLike(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savePostHandler = (postId) => {
    setIsSaved(!isSaved);
    const payload = {
      userId,
      postId,
    };

    savePost(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postComment = (postId) => {
    setCommentLoader(true);
    const payload = {
      commentedUserId: userId,
      postId,
      comment,
    };

    updateComment(payload)
      .then((res) => {
        console.log(res);
        getUserDetails(userId).then((res) => {
          setAllComments([
            ...allComments,
            { userName: res?.userDetails?.username, comment },
          ]);
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

  //timestamp function
  function formatTimestamp(timestamp) {
    const currentTime = new Date();
    const givenTime = new Date(timestamp);
    const timeDifference = currentTime - givenTime;

    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutesDifference < 60) {
      return `${minutesDifference}M`;
    } else if (hoursDifference < 24) {
      return `${hoursDifference}H`;
    } else {
      return `${daysDifference}D`;
    }
  }

  return (
    <div
      className="bg-primary w-full h-auto p-2 rounded-xl my-4 flex flex-col gap-2"
      key={key}
    >
      <div className="flex items-center gap-2">
        <Avatar src={post?.user?.profilePic} />
        <span>{post?.user?.userName}</span>
        <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
        <span>{formatTimestamp(post?.createDate)}</span>
      </div>
      {/* <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} /> */}
      <div className="max-h-96 w-full h-96 flex items-center justify-center">
        <div className="h-full w-full flex items-center justify-center ">
          <img
            //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWJ0i-sYdb40j4VW_I0J7pFSgHsv_DPB-LA&s"
            // src={`data:image/jpeg;base64,${btoa(post?.postMedia?.imageLink)}`}
            src={post?.postMedia?.imageLink}
            alt="Post"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex items-center justify-between m-3">
        <div className="flex items-center gap-4">
          <IconButton
            onClick={() => updatePostLike(post?.postId)}
            sx={{
              color: "white !important",
              padding: "0px !important",
            }}
          >
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <ChatBubbleOutlineIcon />
          <IconButton
            sx={{
              color: "white !important",
              padding: "0px !important",
            }}
            onClick={() => handleShareModalOpen()}
          >
            <SendIcon />
          </IconButton>
        </div>
        <div>
          <IconButton
            onClick={() => savePostHandler(post?.postId)}
            sx={{
              color: "white !important",
              padding: "0px !important",
            }}
          >
            {isSaved ? <BookmarkAddedIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} />
      <div>
        <div>
          {/* <p className="text-sm">
            <span className="font-bold">John Doe</span> and 10 others liked this
            post
          </p> */}
          <p className="text-sm font-bold">{`${likeNumber} Likes`}</p>
        </div>
        <div className="flex items-start gap-2 mt-2">
          <Avatar sx={{ width: 20, height: 20 }} />
          <p className="text-sm">
            <span className="font-bold">{post?.user?.userName}</span>
            <span className="ml-2">{post?.caption}</span>
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm">
            {post?.comments?.length > 3 && `View all ${commentLength} comments`}
          </p>
          <div className="flex flex-col items-start gap-2 mt-2">
            {post?.comments?.length > 2
              ? allComments?.slice(-2)?.map((comment, index) => (
                  <p className="text-sm">
                    <span className="font-bold">{comment?.userName}</span>
                    <span className="ml-2">{comment?.comment}</span>
                  </p>
                ))
              : allComments?.map((comment, index) => (
                  <p className="text-sm">
                    <span className="font-bold">{comment?.userName}</span>
                    <span className="ml-2">{comment?.comment}</span>
                  </p>
                ))}
          </div>
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <input
          type="text"
          value={comment}
          placeholder="Add a comment..."
          className="w-full pb-1 -ml-2 bg-transparent outline-none px-2 flex-1"
          onChange={(e) => setComment(e.target.value)}
        />
        {comment !== "" && (
          <button
            className="text-sm font-bold text-white bg-blue-500 px-2 rounded-sm py-0.5 flex items-center justify-center"
            onClick={() => postComment(post?.postId)}
          >
            {commentLoader ? (
              <CircularProgress size={20} sx={{ color: "white !important" }} />
            ) : (
              "Post"
            )}
          </button>
        )}
      </div>
      <SharePost
        openModal={openShareModal}
        closeModal={handleShareModalClose}
        userId={userId}
        postId={post?.postId}
      />
    </div>
  );
};

export default FeedPost;
