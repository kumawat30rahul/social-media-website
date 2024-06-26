import { Avatar, IconButton, Tooltip, useMediaQuery } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { useEffect, useState } from "react";
import {
  createUserAccount,
  followUser,
  getPostsByIds,
  getUserDetails,
} from "../../config/services";
import PostPopup from "../post/post-pop-up";
import { useLocation, useParams } from "react-router-dom";

const UserProfileDetails = () => {
  const isMobile = useMediaQuery(`(max-width: 640px)`);
  const selfUserId = localStorage.getItem("userId");
  const [openPostPopup, setOpenPostPopup] = useState(false);
  const [userDetails, setUserDetails] = useState({}); // [1
  const [isFollowing, setIsFollowing] = useState(false); // [2
  const [posts, setPosts] = useState([]);
  const [postIds, setPostIds] = useState([]); // [2
  const params = useParams();
  const { userId } = params;
  const location = useLocation();
  const { state } = location;

  const fetchingUserDetails = () => {
    // Fetch user details
    getUserDetails(userId)
      .then((response) => {
        console.log(response);
        setUserDetails(response?.userDetails);
        const allPostId = response?.userDetails?.posts;
        console.log(allPostId); // [3
        setPostIds(allPostId); // [4
        if (!state?.isSelf) {
          if (response?.userDetails?.following?.includes(selfUserId)) {
            setIsFollowing(true);
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchAllPosts = () => {
    if (postIds.length === 0) return;
    getPostsByIds(postIds)
      .then((res) => {
        console.log(res);
        setPosts(res?.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const followHandler = () => {
    const payload = {
      userId: selfUserId,
      followId: userId,
    };
    followUser(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (userId) fetchingUserDetails();
  }, [userId]);

  useEffect(() => {
    if (postIds?.length > 0) fetchAllPosts();
  }, [postIds]);

  return (
    <>
      <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex flex-col items-center gap-4 justify-center mt-2">
        <div className="flex flex-col items-start bg-primary w-full  lg:w-7/12 gap-5 p-4 rounded-xl">
          <div className="flex gap-5">
            <div className="flex flex-col items-start justify-center gap-3">
              <Avatar
                sx={{
                  width: isMobile ? 80 : 120,
                  height: isMobile ? 80 : 120,
                }}
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">
                  {userDetails?.username}
                </span>
                {userDetails?.userId !== selfUserId && (
                  <button
                    className={`${
                      !isFollowing
                        ? "bg-blue-500 text-white px-5 rounded-lg"
                        : "border-2 border-white px-5 rounded-lg"
                    }`}
                    onClick={followHandler}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <span className="flex md:block flex-col items-center">
                  <span className="font-bold text-xl md:text-md">
                    {userDetails?.posts?.length}
                  </span>{" "}
                  posts
                </span>
                <span className="flex md:block flex-col items-center">
                  <span className="font-bold text-xl md:text-md">
                    {userDetails?.followers?.length}
                  </span>{" "}
                  followers
                </span>
                <span className="flex md:block flex-col items-center">
                  <span className="font-bold text-xl md:text-md">
                    {userDetails?.following?.length}
                  </span>{" "}
                  following
                </span>
              </div>
              <div className="flex flex-col items-start ">
                {!isMobile && (
                  <span className="font-bold">{userDetails?.name}</span>
                )}
                {!isMobile && <span>{userDetails?.bio}</span>}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {isMobile && <span className="font-bold">{userDetails?.name}</span>}
            {isMobile && <span>{userDetails?.bio}</span>}
          </div>
        </div>
        <div className="w-full  lg:w-7/12 flex gap-3">
          <div className="bg-primary rounded-full flex items-center gap-2 w-max cursor-pointer hover:bg-gray-600">
            <IconButton
              sx={{
                padding: "5px 10px",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
              className="icon-button-profile"
            >
              <AppsIcon fontSize="small" />
              <span className="text-sm">Posts</span>
            </IconButton>
          </div>
          <div className="bg-primary rounded-full flex items-center gap-2 w-max cursor-pointer hover:bg-gray-600">
            <Tooltip title="Coming Soon">
              <IconButton
                sx={{
                  padding: "5px 10px",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  opacity: 0.3,
                }}
                className="icon-button-profile"
              >
                <AppsIcon fontSize="small" />
                <span className="text-sm">Products</span>
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <div className="grid grid-cols-3 gap-1">
            {posts?.map((item, index) => (
              <img
                src={item?.postMedia?.imageLink}
                className="h-full w-full object-contain aspect-square cursor-pointer"
                onClick={() => setOpenPostPopup(true)}
              />
            ))}
          </div>
        </div>
        <PostPopup open={openPostPopup} handleCloseFunc={setOpenPostPopup} />
      </div>
    </>
  );
};

export default UserProfileDetails;
