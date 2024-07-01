import { Menu, MenuItem } from "@mui/material";
import { changeNotificationStatus } from "../../config/services";
import { useSnackbar } from "../hooks/snackbar";

const NotificationMenu = ({
  anchorEll,
  handleClose,
  notificationId,
  userId,
  setAllNotifications,
  allNotifications,
}) => {
  const showSnackbar = useSnackbar();
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

  const deleteNotification = () => {
    console.log("delete");
  };
  return (
    <Menu anchorEl={anchorEll} open={Boolean(anchorEll)} onClose={handleClose}>
      <MenuItem onClick={readNotification}>Read</MenuItem>
      <MenuItem onClick={deleteNotification}>Delete</MenuItem>
    </Menu>
  );
};

export default NotificationMenu;
