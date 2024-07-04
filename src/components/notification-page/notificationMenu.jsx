import { Menu, MenuItem } from "@mui/material";
import {
  changeNotificationStatus,
  deleteNotification,
} from "../../config/services";
import { useSnackbar } from "../hooks/snackbar";
import { useEffect, useState } from "react";

const NotificationMenu = ({
  anchorEll,
  handleClose,
  notificationId,
  userId,
  setAllNotifications,
  allNotifications,
  notification,
  index,
}) => {
  const showSnackbar = useSnackbar();
  const [everyNtification, setEveryNotification] = useState();
  useEffect(() => {
    if (notification) setEveryNotification(notification);
  }, [notification]);
  const readNotification = () => {
    const changedNotifications = notification.map((item) => {
      if (item?.notificationId === notification[index]?.notificationId) {
        item.isRead = true;
      }

      return item;
    });
    console.log(changedNotifications);

    setAllNotifications(changedNotifications);
    changeNotificationStatus(notification[index]?.notificationId)
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        const changedNotifications = notification.map((item) => {
          if (item?.receiverId === notification[index]?.notificationId) {
            item.isRead = false;
          }

          return item;
        });

        setAllNotifications(changedNotifications);
      });
  };

  const deleteNotificationFunc = () => {
    const changedNotifications = notification.filter(
      (item) => item?.notificationId !== notification[index]?.notificationId
    );
    console.log(changedNotifications);
    setAllNotifications(changedNotifications);
    const payload = {
      id: notification[index]?.notificationId,
    };
    deleteNotification(payload)
      .then((response) => {
        handleClose();
      })
      .catch((error) => {
        showSnackbar("Failed to delete notification", "error");
        console.log(everyNtification);
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
