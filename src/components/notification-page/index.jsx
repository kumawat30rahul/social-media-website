import { Avatar, Divider, Icon, IconButton } from "@mui/material";
import Navbar from "../navbar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const NotificationPage = () => {
  const notifications = [
    {
      username: "JohnDoe",
      userimage: "https://example.com/user1.jpg",
      description: "You have a new message",
      date: "2022-01-01",
      time: "10:00 AM",
      read: false,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description:
        "You have a new friend request uajsd fkjasdf bsdajmfhaskdjfhak bj fabsh fdkjahs djfhv ajshvd fkj",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description:
        "You have a new friend request uajsd fkjasdf bsdajmfhaskdjfhak bj fabsh fdkjahs djfhv ajshvd fkj",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description:
        "You have a new friend request uajsd fkjasdf bsdajmfhaskdjfhak bj fabsh fdkjahs djfhv ajshvd fkj",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description: "You have a new friend request",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    {
      username: "JaneSmith",
      userimage: "https://example.com/user2.jpg",
      description:
        "You have a new friend request uajsd fkjasdf bsdajmfhaskdjfhak bj fabsh fdkjahs djfhv ajshvd fkj",
      date: "2022-01-02",
      time: "02:30 PM",
      read: true,
    },
    // Add more notifications as needed
  ];
  return (
    <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex items-center justify-center">
      <div className="w-full md:w-7/12 bg-primary rounded-xl p-2">
        {notifications.map((notification, index) => (
          <>
            <div
              key={index}
              className="flex items-center justify-between gap-2 mt-2 text-sm py-3"
            >
              <div className="flex items-center gap-2">
                <Avatar
                  src={notification.userimage}
                  alt={notification.username}
                  sx={{
                    width: 45,
                    height: 45,
                  }}
                />
                <div className="">
                  <span className="font-bold mr-2">
                    {notification.username}
                  </span>
                  <span>{notification.description}</span>
                </div>
              </div>
              <div>
                <IconButton>
                  <MoreHorizIcon sx={{ color: "white" }} />
                </IconButton>
              </div>
            </div>
            <Divider
              sx={{ backgroundColor: "#484444 !important", width: "100%" }}
            />
          </>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
