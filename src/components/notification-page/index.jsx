import { Avatar, Divider, Icon, IconButton } from "@mui/material";
import Navbar from "../navbar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import { getAllNotifications } from "../../config/services";
import { memo, useEffect, useState } from "react";
import NotificationMenu from "./notificationMenu";

const NotificationPage = memo(() => {
  const userId = localStorage.getItem("userId");
  const [allNotifications, setAllNotifications] = useState(null);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);

  const openNotificationMenu = (e, index) => {
    setMenuIndex(index);
    setAnchorEl(e.currentTarget);
  };

  const closeNotificationMenu = () => {
    setAnchorEl(null);
  };

  const navigateToNotifications = (notification) => {
    navigate("/notifications", { state: { notification: notification } });
  };

  useEffect(() => {
    if (userId) {
      fetchingNotifications();
    }
  }, [userId]);

  const fetchingNotifications = () => {
    getAllNotifications(userId)
      .then((response) => {
        console.log(response);
        setAllNotifications(response?.notifications);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex items-center justify-center">
      <div className="w-full md:w-7/12 bg-primary rounded-xl overflow-hidden">
        {allNotifications?.map((notification, index) => {
          return (
            <>
              <div
                key={index}
                className={`flex items-center justify-between text-sm p-3 ${
                  !notification?.isRead && "bg-gray-700"
                } cursor-pointer`}
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    src={notification?.userimage}
                    alt={notification?.senderName}
                    sx={{
                      width: 45,
                      height: 45,
                    }}
                  />
                  <div className="">
                    <span className="font-bold mr-2">
                      {notification?.senderUsername}
                    </span>
                    <span>{notification?.notifications}</span>
                  </div>
                </div>
                <div>
                  <IconButton onClick={(e) => openNotificationMenu(e, index)}>
                    <MoreHorizIcon sx={{ color: "white" }} />
                  </IconButton>
                </div>
              </div>
              {/* <Divider
                sx={{ backgroundColor: "#484444 !important", width: "100%" }}
              /> */}
            </>
          );
        })}
        <NotificationMenu
          anchorEll={anchorEl}
          handleClose={closeNotificationMenu}
          // notificationId={notification?.notificationId}
          notification={allNotifications}
          setAllNotifications={setAllNotifications}
          allNotifications={allNotifications}
          index={menuIndex}
        />
      </div>
    </div>
  );
});

export default NotificationPage;
