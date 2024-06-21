import { Avatar } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useEffect, useState } from "react";
import { createPost, uploadingImage } from "../../config/services";

const AddPost = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const userId = localStorage.getItem("userId");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const postCreateHandler = () => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("postId", "P00012");
    formData.append("isImage", true);
    formData.append("mediaLink", selectedImage);
    formData.append("isVideo", false);
    formData.append("caption", "Most Peaceful Day");
    formData.append("createdDate", "16th June 2024");

    createPost(formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(selectedImage, typeof selectedImage);
  }, [selectedImage]);
  return (
    <div className="bg-primary rounded-xl p-4">
      <div className="flex items-center gap-2">
        <Avatar />
        <div className="w-full">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full p-2 px-2 rounded-full bg-transparent border border-gray-500 outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <div className=" flex gap-2 items-center bg-gray-400/20 cursor-pointer hover:bg-gray-400/40 w-max py-2 px-3 rounded-full">
          <input type="file" onChange={(e) => handleFileChange(e)} />
          <PermMediaIcon />
          <span>Media</span>
        </div>
        <div>
          <button onClick={postCreateHandler}>Click</button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
