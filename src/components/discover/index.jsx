import { Avatar, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import "./discover.css";
import { fetchAllPosts, getAllUsers } from "../../config/services";
import { useNavigate } from "react-router-dom";

const Discover = () => {
  const selfUserId = localStorage.getItem("userId");
  const [isSelf, setIsSelf] = useState(false); // [1
  const [allPosts, setAllPosts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const fetchingAllUsers = () => {
    getAllUsers()
      .then((response) => {
        console.log(response);
        const userData = response?.userdetails
          ?.map((user) => {
            return {
              userId: user?.userId,
              userName: user?.username,
              name: user?.name,
              image: user?.profilePic,
              isFollowing: user?.followers?.includes(selfUserId),
            };
          })
          .filter((user) => {
            if (user.userId !== selfUserId) {
              return user;
            }
          });
        setAllUsers(userData);
        if (userData.find((user) => user.userId === selfUserId)) {
          setIsSelf(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const fetchingAllPosts = () => {
    fetchAllPosts()
      .then((response) => {
        console.log(response);
        const postArray = response?.posts?.map((post) => {
          return {
            postId: post?.postId,
            userId: post?.userId,
            image: post?.postMedia?.imageLink,
          };
        });
        setAllPosts(postArray);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const userNavigationToProfilePage = (userId) => {
    navigate(`/profile/${userId}`);
  };

  useEffect(() => {
    fetchingAllPosts();
    fetchingAllUsers();
  }, []);
  return (
    <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex flex-col gap-4 items-start justify-center mt-2 overflow-hidden">
      {/* <div className="w-full h-10">
        <input
          placeholder="Search people or posts"
          className="px-4 w-full h-full rounded-full bg-transparent border border-gray-500"
        />
      </div> */}
      <div className="flex items-start flex-col gap-3 w-full">
        <span>Peoples</span>
        <div className="w-full h-auto flex items-center gap-4 overflow-x-scroll py-4 -my-4 scrollbar-style">
          {allUsers?.map((user, index) => (
            <div
              className="flex items-center gap-2 bg-primary rounded-xl p-3 w-auto min-w-60 shrink-0 relative cursor-pointer"
              onClick={() => userNavigationToProfilePage(user?.userId)}
            >
              {user?.isFollowing && (
                <Tooltip title="Following">
                  <div className="absolute h-6 w-6 -top-2 -right-2 rounded-full bg-blue-700"></div>
                </Tooltip>
              )}
              <Avatar
                sx={{
                  height: 50,
                  width: 50,
                }}
              />
              <div className="flex flex-col items-start">
                <span>{user?.userName}</span>
                <span>{user?.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="mt-4">Posts</span>
      <div className="h-full w-full grid grid-cols-3 gap-1">
        {allPosts?.map((item, index) => (
          <div
            key={index}
            className="bg-primary w-full h-auto aspect-square cursor-pointer"
          >
            <img src={item?.image} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
