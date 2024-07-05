import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  Modal,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import { useEffect, useState } from "react";
import { uploadProfileImage } from "../../config/services";
import { useSnackbar } from "../hooks/snackbar";

const AvatarImage = ({ profilePitcture, height, width, setReloadChanges }) => {
  const [open, setOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const showSnackbar = useSnackbar();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleFileChange = (event) => {
    console.log(event);
    setSelectedImage(event.target.files[0]);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
  };
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    if (selectedImage) {
      setUploadedImage(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [uploadImageLoader, setUploadImageLoader] = useState(false);
  const uploadingImage = () => {
    setUploadImageLoader(true);
    const formData = new FormData();
    formData.append("mediaLink", selectedImage);
    formData.append("userId", userId);
    uploadProfileImage(formData)
      .then((res) => {
        setUploadImageLoader(false);
        showSnackbar("Successfully Uploaded", "success");
        // setReloadChanges(true);
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        showSnackbar("Something went wrong while uploading image", "error");
        setUploadImageLoader(false);
      });
  };
  return (
    <div className="relative">
      <IconButton
        onClick={handleOpen}
        sx={{
          position: "absolute",
          top: "-10px",
          right: "-10px",
          zIndex: 1,
        }}
      >
        <EditIcon sx={{ color: "white !important" }} />
      </IconButton>
      <Avatar src={profilePitcture} sx={{ width: width, height: height }} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="h-72 w-72 bg-primary rounded-lg flex flex-col items-center justify-center">
            <Avatar src={uploadedImage} sx={{ width: 200, height: 200 }} />
            <div className="flex items-center gap-3">
              <label
                htmlFor="file-upload-pic"
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                className="bg-gray-400/20 cursor-pointer hover:bg-gray-400/40 w-max py-2 px-3 rounded-full mt-5"
              >
                <PermMediaIcon />
                <span>Media</span>
              </label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e)}
                style={{ display: "none" }}
                id="file-upload-pic"
              />
              <button
                className="bg-blue-400 py-2 px-3 rounded-full mt-5"
                onClick={uploadingImage}
                disabled={uploadImageLoader || !selectedImage}
              >
                {uploadImageLoader ? (
                  <CircularProgress
                    size={18}
                    sx={{ color: "white !important" }}
                  />
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AvatarImage;
