import { useState } from "react";

const Discover = () => {
  const [count, setCount] = useState(20);
  return (
    <div className="w-full lg:w-11/12  xl:w-9/12 p-2 m-auto  flex items-center justify-center mt-2">
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
