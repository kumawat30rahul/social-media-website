import { Avatar, CircularProgress } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { memo, useEffect, useState } from "react";
import {
  createPost,
  getUserDetails,
  uploadingImage,
} from "../../config/services";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSnackbar } from "../hooks/snackbar";

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [caption, setCaption] = useState("");
  const userId = localStorage.getItem("userId");
  const [profilePic, setProfilePic] = useState("");
  const showSnackbar = useSnackbar();
  const [postLoading, setPostLoading] = useState(false);
  const handleFileChange = (event) => {
    console.log(event);
    setSelectedImage(event.target.files[0]);
  };

  const fetchUserDetails = () => {
    getUserDetails(userId)
      .then((res) => {
        console.log(res);
        setProfilePic(res?.userDetails?.profilePicture);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const postCreateHandler = () => {
    setPostLoading(true);
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("isImage", true);
    formData.append("mediaLink", selectedImage);
    formData.append("isVideo", false);
    formData.append("caption", caption);
    formData.append("createdDate", new Date());

    createPost(formData)
      .then((res) => {
        console.log(res);
        showSnackbar(res?.message, "success");
        setCaption("");
        setSelectedImage(null);
        setPostLoading(false);
      })
      .catch((err) => {
        showSnackbar(err?.message, "error");
        setPostLoading(false);
      });
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);
  return (
    <div className="bg-gray-700 sm:bg-primary sm:rounded-xl p-4">
      <div className="flex items-center gap-2">
        <Avatar src={profilePic} />
        <div className="w-full">
          <input
            type="text"
            name="image"
            value={caption}
            placeholder="What's on your mind?"
            className="w-full p-2 px-2 rounded-full bg-transparent border border-gray-500 outline-none"
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
      </div>
      <div className="relative h-auto w-20">
        {selectedImage && (
          <div
            className="absolute -top-3 -right-2 cursor-pointer"
            onClick={removeSelectedImage}
          >
            <CancelIcon sx={{ color: "red !important" }} />
          </div>
        )}
        {selectedImage && (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="selected"
            className="w-20 h-20 object-cover mt-4 rounded-lg"
          />
        )}
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className=" flex gap-2 items-center bg-gray-400/20 cursor-pointer hover:bg-gray-400/40 w-max py-2 px-3 rounded-full">
          <label
            htmlFor="file-upload"
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <PermMediaIcon />
            <span>Media</span>
          </label>
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            style={{ display: "none" }}
            id="file-upload"
          />
        </div>
        <div className="bg-blue-400 py-1 px-2 rounded-lg">
          <button onClick={postCreateHandler}>
            {postLoading ? (
              <CircularProgress size={20} sx={{ color: "white !important" }} />
            ) : (
              "Post"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
