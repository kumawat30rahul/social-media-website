import { Avatar, Badge, Divider, Tooltip } from "@mui/material";
import "./home-profile.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import ShareIcon from "@mui/icons-material/Share";
import { getAllNotifications, getUserDetails } from "../../config/services";
import { useEffect, useMemo, useState } from "react";
import ActivityPostPopup from "../post/activity-modal";
import AvatarImage from "./avatar";

const HomeProfile = () => {
  const [userDetails, setUserDetails] = useState();
  const [activityPostDetails, setActivityPostDetails] = useState({
    title: "",
    array: [],
    modalOpen: false,
    modalClose: () =>
      setActivityPostDetails({ ...activityPostDetails, modalOpen: false }),
  });
  const [allNotifications, setAllNotifications] = useState([]);

  const fetchActivityPostDetails = (title, array) => {};

  const userActivityIcons = useMemo(
    () => [
      {
        icon: <FavoriteIcon />,
        count: userDetails?.likedPosts?.length,
        onClickFunction: "",
        label: "Liked Posts",
      },
      {
        icon: <BookmarkIcon />,
        count: userDetails?.savedPosts?.length,
        onClickFunction: "",
        label: "Saved Items",
      },
      {
        icon: <MarkChatUnreadIcon />,
        count: userDetails?.commentedPosts?.length,
        onClickFunction: "",
        label: "Messages",
      },
      {
        icon: <ShareIcon />,
        count: userDetails?.sharedPosts?.length,
        onClickFunction: "",
        label: "Shared Items",
      },
    ],
    [userDetails]
  );

  const userId = localStorage.getItem("userId");

  const fetchingUserDetails = () => {
    // Fetch user details
    getUserDetails(userId)
      .then((response) => {
        setUserDetails(response?.userDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (userId) {
      fetchingUserDetails();
    }
  }, [userId]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 flex-1 h-auto bg-primary rounded-xl pt-8 pb-3">
      <AvatarImage
        profilePitcture={userDetails?.profilePicture}
        height={70}
        width={70}
      />
      <div className="text-center">
        <p className="font-bold">{userDetails?.name}</p>
        <p className="text-sm">{userDetails?.bio}</p>
      </div>
      <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} />
      <div className="flex justify-between items-center w-full px-2 xl:px-5">
        <div className="text-start">
          <p className="text-sm">Followers</p>
          <p className="text-md font-bold">{userDetails?.followers?.length}</p>
        </div>
        <div className="text-center">
          <p className="text-sm">Posts</p>
          <p className="text-md font-bold">{userDetails?.posts?.length}</p>
        </div>
        <div className="text-end">
          <p className="text-sm">Following</p>
          <p className="text-md font-bold">{userDetails?.following?.length}</p>
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} />
      <div className="flex gap-2 items-center justify-around w-full">
        {userActivityIcons.map((icon, index) => (
          <Tooltip key={index} title={icon.label} arrow>
            <Badge badgeContent={icon?.count} color="primary">
              <div
                key={index}
                className="flex gap-2 items-center justify-center cursor-pointer hover:scale-125 transition-all duration-200 "
              >
                {icon.icon}
              </div>
            </Badge>
          </Tooltip>
        ))}
      </div>
      {/* <ActivityPostPopup /> */}
    </div>
  );
};

export default HomeProfile;
