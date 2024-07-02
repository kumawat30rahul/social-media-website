import { Menu, MenuItem } from "@mui/material";
import {
  changeNotificationStatus,
  deleteNotification,
} from "../../config/services";
import { useSnackbar } from "../hooks/snackbar";
import { useState } from "react";

const NotificationMenu = ({
  anchorEll,
  handleClose,
  notificationId,
  userId,
  setAllNotifications,
  allNotifications,
}) => {
  const showSnackbar = useSnackbar();
  const [everyNtification, setEveryNotification] = useState(allNotifications);
  const readNotification = () => {
    const changedNotifications = allNotifications.map((item) => {
      if (item?.notificationId === notificationId) {
        item.isRead = true;
      }

      return item;
    });

    setAllNotifications(changedNotifications);

    changeNotificationStatus(notificationId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        const changedNotifications = allNotifications.map((item) => {
          if (item?.receiverId === notificationId) {
            item.isRead = false;
          }

          return item;
        });

        setAllNotifications(changedNotifications);
      });
  };

  const deleteNotificationFunc = () => {
    const changedNotifications = everyNtification.filter(
      (item) => item?.notificationId !== notificationId
    );

    setAllNotifications(changedNotifications);
    deleteNotification(notificationId)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        showSnackbar("Failed to delete notification", "error");
        setAllNotifications(everyNtification);
      });
  };
  return (
    <Menu anchorEl={anchorEll} open={Boolean(anchorEll)} onClose={handleClose}>
      <MenuItem onClick={readNotification}>Read</MenuItem>
      <MenuItem onClick={deleteNotificationFunc}>Delete</MenuItem>
    </Menu>
  );
};

export default NotificationMenu;
