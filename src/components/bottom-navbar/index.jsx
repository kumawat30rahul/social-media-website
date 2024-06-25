import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";
import { Drawer, IconButton } from "@mui/material";
import AddPost from "../add-post";
import { useMemo, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const [openAddPostDrawer, setAddPostDrawer] = useState(false);

  const navbarTabs = useMemo(
    () => [
      { name: "Home", icon: <HomeIcon />, path: "/" },
      { name: "Discover", icon: <ExploreIcon />, path: "/discover" },
      { name: "Post", icon: <AddCircleOutlineIcon />, path: "/post" },
      {
        name: "Notifications",
        icon: <NotificationsIcon />,
        path: "/notifications",
      },
    ],
    []
  );

  const onClickHandler = (path) => {
    if (path === "/post") {
      setAddPostDrawer(true);
      return;
    }
    navigate(path);
  };

  const handleAddPostDrawerClose = () => {
    setAddPostDrawer(false);
  };

  return (
    <>
      <div className="bg-primary fixed bottom-0 left-0 right-0 h-18 flex items-center justify-around z-50 shadow-lg shadow-white">
        {navbarTabs.map((tab, index) => {
          return (
            <div
              key={index}
              className="flex items-center justify-center p-2"
              onClick={() => onClickHandler(tab.path)}
            >
              <div className="flex flex-col items-center">
                <div className="w-6 h-6">{tab.icon}</div>
                <span className="text-xs">{tab.name}</span>
              </div>
            </div>
          );
        })}
      </div>
      <Drawer
        open={openAddPostDrawer}
        anchor="bottom"
        onClose={handleAddPostDrawerClose}
        PaperProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            gap: "15px",
          },
        }}
      >
        <IconButton onClick={() => setAddPostDrawer(false)}>
          <CancelIcon sx={{ color: "red", height: 30, width: 30 }} />
        </IconButton>
        <div className="w-full">
          <AddPost />
        </div>
      </Drawer>
    </>
  );
};

export default BottomNavbar;
