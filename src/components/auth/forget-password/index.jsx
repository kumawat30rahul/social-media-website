import { useState } from "react";

const ForgetPassword = () => {
  const [changePassword, setChangePassword] = useState(false);

  const changeToNewPassword = (e) => {
    e.preventDefault();
    setChangePassword(true);
  };

  return (
    <div className="h-screen w-screen m-auto flex justify-center items-center">
      <div className="h-scree w-96 rounded-lg bg-primary  ">
        {/* <form className="h-auto w-full"> */}
        {!changePassword ? (
          <div className="flex flex-col items-center justify-center p-7 w-full">
            <h1 className="text-2xl text-white">Forgot Password?</h1>
            <input
              type="type"
              placeholder="Email or Mobile Number"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
            />
            <input
              type="text"
              placeholder="Enter Code"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
            />
            <p className="text-blue-500 m-2 text-start w-full text-xs cursor-pointer">
              Resend Code
            </p>
            <button
              className="w-full h-10 rounded-lg bg-white text-primary"
              onClick={changeToNewPassword}
            >
              Verify
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-7 w-full">
            <h1 className="text-2xl text-white">Forgot Password?</h1>
            <input
              type="text"
              placeholder="New Password"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
            />
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
            />
            <button className="w-full h-10 rounded-lg bg-white text-primary mt-4">
              Change Password
            </button>
          </div>
        )}
        {/* </form> */}
      </div>
    </div>
  );
};

export default ForgetPassword;
