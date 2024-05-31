import { Avatar, Divider, Tooltip } from "@mui/material";
import "./home-profile.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import ShareIcon from "@mui/icons-material/Share";

const HomeProfile = () => {
  const userActivityIcons = [
    {
      icon: <FavoriteIcon />,
      count: 0,
      onClickFunction: "",
      label: "Liked Posts",
    },
    {
      icon: <BookmarkIcon />,
      count: 0,
      onClickFunction: "",
      label: "Saved Items",
    },
    {
      icon: <MarkChatUnreadIcon />,
      count: 0,
      onClickFunction: "",
      label: "Messages",
    },
    {
      icon: <ShareIcon />,
      count: 0,
      onClickFunction: "",
      label: "Shared Items",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 flex-1 h-auto bg-primary rounded-xl pt-8 pb-3">
      <Avatar sx={{ width: 70, height: 70 }} />
      <div className="text-center">
        <p className="font-bold">Rahul Kumawat</p>
        <p className="text-sm">Some small bio || kajdf</p>
      </div>
      <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} />
      <div className="flex justify-between items-center w-full px-2 xl:px-5">
        <div className="text-start">
          <p className="text-sm">Followers</p>
          <p className="text-md font-bold">12</p>
        </div>
        <div className="text-center">
          <p className="text-sm">Posts</p>
          <p className="text-md font-bold">12</p>
        </div>
        <div className="text-end">
          <p className="text-sm">Following</p>
          <p className="text-md font-bold">12</p>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} />
      <div className="flex gap-2 items-center justify-around w-full">
        {userActivityIcons.map((icon, index) => (
          <Tooltip key={index} title={icon.label} arrow>
            <div
              key={index}
              className="flex gap-2 items-center justify-center cursor-pointer hover:scale-125 transition-all duration-200 "
            >
              {icon.icon}
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

export default HomeProfile;
