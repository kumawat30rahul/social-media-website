import { useMediaQuery } from "@mui/material";
import Feed from "../feed";
import HomeProfile from "../home-profile";
import Notification from "../notification";
import "./home-content.css";

const HomeContent = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  return (
    <div className="flex flex-col sm:justify-center h-full md:items-start md:flex-row gap-4 w-full lg:w-11/12  xl:w-9/12 p-2 m-auto mt-0 md:mt-1">
      {!isMobile && <HomeProfile />}
      <Feed />
      <Notification />
    </div>
  );
};

export default HomeContent;
