import { Avatar, IconButton, useMediaQuery } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";
import { useState } from "react";
import { createUserAccount } from "../../config/services";

const UserProfileDetails = () => {
  const isMobile = useMediaQuery(`(max-width: 640px)`);
  const [posts, setPosts] = useState(21);
  const buttonClickHandler = () => {
    const payload = {
      userId: "A00004",
      username: "manju80kumawat",
      password: "1234567890",
      name: "Manju Kumawat",
      phoneNumber: "+91-9372641712",
      email: "manju80kumawat@gmail.com",
    };
    createUserAccount(payload)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };
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
              <span className="text-xl font-bold">jhondoe</span>
              <div className="flex gap-4">
                <span className="flex md:block flex-col items-center">
                  <span className="font-bold text-xl md:text-md">1</span> posts
                </span>
                <span className="flex md:block flex-col items-center">
                  <span className="font-bold text-xl md:text-md">2</span>{" "}
                  followers
                </span>
                <span className="flex md:block flex-col items-center">
                  <span className="font-bold text-xl md:text-md">3</span>{" "}
                  following
                </span>
              </div>
              <div className="flex flex-col items-start ">
                {!isMobile && <span className="font-bold">Rahul Kumawat</span>}
                {!isMobile && (
                  <span>
                    Bio that is very big or restricted to some words as kjdbf
                    ajbshd fjhavsdf amhsd fjasdfj asdmfjahsdf hasudf{" "}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {isMobile && <span className="font-bold">Rahul Kumawat</span>}
            {isMobile && (
              <span>
                Bio that is very big or restricted to some words as kjdbf ajbshd
                fjhavsdf amhsd fjasdfj asdmfjahsdf hasudf{" "}
              </span>
            )}
          </div>
        </div>
        <div className="w-full  lg:w-7/12">
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
        </div>
        <div className="w-full lg:w-7/12">
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: posts }).map((_, index) => (
              <img
                src="https://staticg.sportskeeda.com/editor/2023/10/bee0e-16970598039739-1920.jpg?w=640"
                className="h-full w-full object-contain aspect-square border border-white cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
      <div>
        <button onClick={buttonClickHandler}>click me</button>
      </div>
    </>
  );
};

export default UserProfileDetails;
