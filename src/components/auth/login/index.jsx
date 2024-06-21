import { useLocation } from "react-router-dom";

const LoginPage = () => {
  const navigate = useLocation();

  const navigateToForgetPassword = () => {
    navigate("/forget-password");
  };

  return (
    <div className="h-screen w-screen m-auto flex justify-center items-center">
      <div className="h-scree w-96 rounded-lg bg-primary  ">
        <form className="h-auto w-full">
          <div className="flex flex-col items-center justify-center p-7 w-full">
            <h1 className="text-2xl text-white">Log In</h1>
            <input
              type="type"
              placeholder="Username, Email or Mobile Number"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
            />
            <p
              className="text-blue-500 m-2 text-start w-full text-xs cursor-pointer"
              onClick={navigateToForgetPassword}
            >
              Forget Password?
            </p>
            <button className="w-full h-10 rounded-lg bg-white text-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
