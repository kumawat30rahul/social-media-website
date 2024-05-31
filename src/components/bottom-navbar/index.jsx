import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useNavigate } from "react-router-dom";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const navbarTabs = [
    { name: "Home", icon: <HomeIcon />, path: "/" },
    { name: "Discover", icon: <ExploreIcon />, path: "/discover" },
    { name: "Post", icon: <AddCircleOutlineIcon />, path: "" },
    {
      name: "Notifications",
      icon: <NotificationsIcon />,
      path: "/notifications",
    },
  ];

  const onClickHandler = (path) => {
    navigate(path);
  };
return (
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
);
};

export default BottomNavbar;
