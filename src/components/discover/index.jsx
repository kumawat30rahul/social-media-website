import { Avatar } from "@mui/material";
import { useState } from "react";
import './discover.css'

const Discover = () => {
  const [count, setCount] = useState(20);
  return (
    <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex flex-col gap-4 items-start justify-center mt-2 overflow-hidden">
      <div className="w-full h-10">
        <input
          placeholder="Search people or posts"
          className="px-4 w-full h-full rounded-full bg-transparent border border-gray-500"
        />
      </div>
      <div className="flex items-start flex-col gap-3 w-full">
        <span>Peoples</span>
        <div className="w-full h-auto flex items-center gap-4 overflow-x-scroll py-4 -my-4 scrollbar-style">
          {Array.from({ length: count }).map((_, index) => (
            <div className="flex items-center gap-2 bg-primary rounded-xl p-3 w-60 shrink-0 relative cursor-pointer">
              <div className="absolute h-6 w-6 -top-2 -right-2 rounded-full bg-blue-700"></div>
              <Avatar
                sx={{
                  height: 50,
                  width: 50,
                }}
              />
              <div className="flex flex-col items-start">
                <span>jhonedow</span>
                <span>Rahul Kumawat</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <span className="mt-4">Posts</span>
      <div className="h-full w-full grid grid-cols-3 gap-1">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-primary w-full h-auto aspect-square cursor-pointer"
          >
            <img
              src="https://pbs.twimg.com/media/Fn5qjz9WQAAXUgE.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discover;
