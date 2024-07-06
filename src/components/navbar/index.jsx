import { useMemo, useState } from "react";
import "./navbar.css";
import {
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Modal,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const userId = localStorage.getItem("userId");
  const [openSearch, setOpenSearch] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const navigation = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const searchOpenHandler = () => {
    setOpenSearch(true);
  };

  const searchCloseHandler = () => {
    setOpenSearch(false);
  };

  const handleOpenModal = () => {
    setLogoutModal(true);
  };
  const handleCloseModal = () => {
    setLogoutModal(false);
  };

  const navItems = useMemo(
    () => [
      {
        itemName: "Home",
        link: "/",
        icon: <HomeRoundedIcon fontSize="small" />,
      },
      // { itemName: "Profile", link: "/profile" },
      // {itemName: 'Messages', link: '/messages'},
      {
        itemName: "Notifications",
        link: "/notifications",
        icon: <NotificationsActiveRoundedIcon fontSize="small" />,
      },
      {
        itemName: "Discover",
        link: "/discover",
        icon: <PublicRoundedIcon fontSize="small" />,
      },
    ],
    []
  );

  const navigationHandler = (link) => {
    navigation(link);
  };

  const handleProfile = () => {
    navigation(`/profile/${userId}`, { state: { isSelf: true } });
    handleClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    handleCloseModal();
    navigation("/login");
  };

  const navigateToHome = () => {
    navigation("/");
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div className="w-full h-12  flex items-center justify-center p-2 bg-primary sticky top-0 z-50">
      <nav className="flex gap-2 justify-between h-full w-full lg:w-11/12  xl:w-9/12">
        <div
          className={`flex gap-2 w-full items-center ${
            openSearch ? "sm:w-full" : "sm:w-1/2"
          }`}
        >
          <div className="h-full w-auto bg-white p-1 rounded-lg aspect-square">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Avicii_-_Logo.png"
              className="h-full w-auto cursor-pointer"
              onClick={navigateToHome}
            />
          </div>
          {/* <ClickAwayListener onClickAway={searchCloseHandler}>
            <div
              className={`h-full w-full ${
                openSearch ? "sm:w-full" : "sm:w-1/2"
              }   flex items-center`}
            >
              <input
                type="text"
                placeholder="Search"
                className={`h-full w-full pl-2 rounded-lg bg-gray-700 outline-none lg:block ${
                  openSearch ? "sm:block" : "sm:hidden"
                }`}
              />
              <div
                className={`hidden lg:hidden ${
                  openSearch ? "sm:hidden" : "sm:block"
                }`}
              >
                <IconButton
                  sx={{
                    padding: "0px !important",
                  }}
                  onClick={searchOpenHandler}
                >
                  <SearchIcon
                    fontSize="large"
                    sx={{
                      color: "white !important",
                    }}
                  />
                </IconButton>
              </div>
            </div>
          </ClickAwayListener> */}
        </div>
        <div className="flex items-center gap-6">
          <div className={`hidden  ${openSearch ? "sm:hidden" : "sm:block"}`}>
            <ul className="flex gap-6">
              {navItems.map((item, index) => (
                <>
                  <li
                    key={index}
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => navigationHandler(item?.link)}
                  >
                    {item?.icon && item?.icon}
                    <span className="">{item?.itemName}</span>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            className={`bg-gray-600 hidden sm:block ${
              openSearch ? "hidden" : "block"
            }`}
          />
          <div onClick={handleClick} className="cursor-pointer">
            <div className="flex items-center justify-center gap-2">
              <Avatar sx={{ width: 24, height: 24 }} />
              <span className="text-sm hidden  md:block">Me</span>
            </div>
          </div>
        </div>
      </nav>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiMenu-paper": {
            backgroundColor: "#1b1f23 !important",
            color: "white",
          },
        }}
      >
        <MenuItem onClick={handleProfile}>
          <span className="text-sm">Profile</span>
        </MenuItem>
        <MenuItem onClick={handleOpenModal}>
          <span className="text-sm">Log Out</span>
        </MenuItem>
      </Menu>
      <Modal open={logoutModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <div className="bg-primary w-60 h-20 rounded-lg flex flex-col items-center justify-center border-2 ">
            <span className="text-sm">Are you sure you want to logout?</span>
            <div className="flex gap-2 mt-2">
              <button
                className="bg-red-400 py-1 px-2 rounded-lg"
                onClick={handleLogout}
              >
                Yes
              </button>
              <button
                className="bg-green-400 py-1 px-2 rounded-lg"
                onClick={handleCloseModal}
              >
                No
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Navbar;
