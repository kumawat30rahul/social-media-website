import { useLocation, useNavigate } from "react-router-dom";
import { userLogin } from "../../../config/services";
import { useState } from "react";
import { CircularProgress } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const LoginPage = () => {
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    loginId: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);

  const navigateToForgetPassword = (e) => {
    navigate("/signup");
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      const response = await userLogin(loginDetails);
      const userDetails = JSON.stringify(response?.userDetails);
      localStorage.setItem("userDetails", userDetails);
      localStorage.setItem("userId", response?.userDetails?.userId);
      localStorage.setItem("token", response?.userDetails?.token);
      setLoginLoading(false);
      navigate("/");
    } catch (error) {
      setLoginLoading(false);
      alert(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen w-screen m-auto flex justify-center items-center">
      <div className="h-scree w-96 rounded-lg bg-primary  ">
        <form className="h-auto w-full">
          <div className="flex flex-col items-center justify-center p-7 w-full">
            <h1 className="text-2xl text-white">Log In</h1>
            <input
              type="text"
              placeholder="Username or Email"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
              onChange={(e) => {
                setLoginDetails({ ...loginDetails, loginId: e.target.value });
              }}
            />
            <div className="w-full flex items-center justify-center relative">
              <input
                type={`${isPasswordVisible ? "text" : "password"}`}
                placeholder="Confirm Password"
                className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
                onChange={(e) => {
                  setLoginDetails({
                    ...loginDetails,
                    password: e.target.value,
                  });
                }}
              />
              <div
                className="absolute top-5 right-3 cursor-pointer"
                onClick={() => {
                  setIsPasswordVisible(!isPasswordVisible);
                }}
              >
                {isPasswordVisible ? (
                  <VisibilityOffIcon />
                ) : (
                  <RemoveRedEyeIcon />
                )}
              </div>
            </div>
            <p
              className="text-blue-500 m-2 text-start w-full text-xs cursor-pointer"
              onClick={navigateToForgetPassword}
            >
              Dont have an account? Sign Up
            </p>
            <button
              className="w-full h-10 rounded-lg bg-white text-primary"
              onClick={loginHandler}
            >
              {loginLoading ? (
                <CircularProgress size={20} sx={{ color: "#0562fb" }} />
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
