import { Avatar } from "@mui/material";
import "./notification.css";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notification = () => {
  const notifications = [
    {
      notificationDesc: "New message received",
      user: "John Doe",
      userName: "johndoe",
      image: "path/to/user/image1.jpg"
    },
    {
      notificationDesc: "New friend request",
      user: "Jane Smith",
      userName: "johnsmith",
      image: "path/to/user/image2.jpg"
    },
    {
      notificationDesc: "Liked your comment",
      user: "Jane Smith",
      userName: "johnsmith",
      image: "path/to/user/image2.jpg"
    },
    {
      notificationDesc: "Started following you",
      user: "Jane Smith",
      userName: "johnsmith",
      image: "path/to/user/image2.jpg"
    },
    // Add more notifications as needed
  ];

  return (
    <div className="hidden lg:block w-full h-auto bg-primary rounded-xl flex-1 p-2">
      <div className="flex items-center gap-2">
        <NotificationsIcon />
        <span className="text-lg font-bold">Notifications</span>
      </div>
      {notifications.map((notification, index) => (
        <div key={index} className="flex items-center gap-2 mt-2 text-sm">
          <Avatar src={notification.image} alt={notification.user} className="w-8 h-8 rounded-full" />
          <div className="">
            <span className="font-bold mr-2">{notification.userName}</span>
            <span>{notification.notificationDesc}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
