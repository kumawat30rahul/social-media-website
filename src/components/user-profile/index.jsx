import { Avatar, useMediaQuery } from "@mui/material";

const UserProfileDetails = () => {
  const isMobile = useMediaQuery(`(max-width: 640px)`);
  return (
    <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex items-center justify-center mt-2">
      <div className="flex flex-col items-start bg-primary w-full  lg:w-7/12 gap-5 p-4 rounded-xl">
        <div className="flex gap-5">
          <div className="flex flex-col items-start justify-center gap-3">
            <Avatar
              sx={{
                width: 120,
                height: 120,
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
                <span className="font-bold text-xl md:text-md">2</span> followers
              </span>
              <span className="flex md:block flex-col items-center">
                <span className="font-bold text-xl md:text-md">3</span> following
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
    </div>
  );
};

export default UserProfileDetails;
