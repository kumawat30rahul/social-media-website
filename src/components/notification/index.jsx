import { Avatar } from "@mui/material";
import "./notification.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getAllNotifications } from "../../config/services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Notification = () => {
  const userId = localStorage.getItem("userId");
  const [allNotifications, setAllNotifications] = useState([]);
  const navigate = useNavigate();

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
        setAllNotifications(response?.newNotifications);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hidden lg:block w-full h-auto bg-primary rounded-xl flex-1 p-2">
      <div className="flex items-center gap-2">
        <NotificationsIcon />
        <span className="text-lg font-bold">Notifications</span>
      </div>
      {allNotifications
        ?.slice(-10)
        ?.reverse()
        .map((notification, index) => (
          <div
            key={index}
            className="flex items-center gap-2 mt-2 text-sm cursor-pointer"
            onClick={() => navigateToNotifications(notification)}
          >
            <Avatar
              src={notification?.senderImage}
              alt={notification?.senderName}
              className="w-8 h-8 rounded-full"
            />
            <div className="">
              <span className="font-bold mr-2">
                {notification?.senderUsername || "NA"}
              </span>
              <span>{notification?.notifications}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Notification;
