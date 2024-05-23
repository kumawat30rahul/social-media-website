import { useMemo, useState } from "react";
import "./navbar.css";
import { Avatar, ClickAwayListener, Divider, IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const searchOpenHandler = () => {
    setOpenSearch(true);
  };

  const searchCloseHandler = () => {
    setOpenSearch(false);
  };

  const navItems = useMemo(
    () => [
      {
        itemName: "Home",
        link: "/home",
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

  console.log({ openSearch });

  return (
    <div className="w-full h-12  flex items-center justify-center p-2 bg-primary">
      <nav className="flex gap-2 justify-between h-full w-full  md:w-9/12">
        <div
          className={`flex gap-2 w-full items-center ${
            openSearch ? "sm:w-full" : "sm:w-1/2"
          }`}
        >
          <div className="h-full w-auto bg-white p-1 rounded-lg aspect-square">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Avicii_-_Logo.png"
              className="h-full w-auto"
            />
          </div>
          <ClickAwayListener onClickAway={searchCloseHandler}>
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
          </ClickAwayListener>
        </div>
        <div className="flex items-center gap-6">
          <div className={`hidden  ${openSearch ? "sm:hidden" : "sm:block"}`}>
            <ul className="flex gap-6">
              {navItems.map((item, index) => (
                <>
                  <li key={index} className="flex items-center gap-1">
                    {item?.icon && item.icon}
                    <span className="">{item?.itemName}</span>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <Divider
            orientation="vertical"
            variant="middle"
            className={`bg-gray-600 hidden sm:block ${openSearch ? "hidden" : "block"}`}
          />
          <div>
            <div className="flex items-center justify-center gap-2">
              <Avatar sx={{ width: 24, height: 24 }} />
              <span className="text-sm hidden  md:block">Me</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
