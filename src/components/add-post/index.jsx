import { Avatar } from "@mui/material";
import PermMediaIcon from "@mui/icons-material/PermMedia";

const AddPost = () => {
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
          <PermMediaIcon />
          <span>Media</span>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
