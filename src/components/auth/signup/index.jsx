import { useEffect, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";
import { checkUsername, registerUser } from "../../../config/services";
import VerifiedIcon from "@mui/icons-material/Verified";
import { CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const SingupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const debounceUsername = useDebounceCallback(setUsername, 500);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changeInputType, setChangeInputType] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (username !== "") {
      usernameValidHabndler();
    }
  }, [username]);

  const [userNameLoader, setUserNameLoader] = useState(null);
  const usernameValidHabndler = () => {
    if (username.length < 4) return;
    setUserNameLoader(true);
    checkUsername({ username: username })
      .then((res) => {
        if (res.status === "success") {
          setIsUsernameValid(true);
          setUserNameLoader(false);
        } else {
          setIsUsernameValid(false);
          setUserNameLoader(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function validateEmail(email) {
    const emailRegex =
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return emailRegex.test(email);
  }

  const validateUserDetails = (
    name,
    username,
    email,
    password,
    confirmpassword
  ) => {
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      return false;
    }
    if (password !== confirmpassword) {
      return false;
    }
    if (!validateEmail(email)) {
      return false;
    }
    return true;
  };

  const [registrationLoader, setRegistrationLoader] = useState(false);
  const handleRegistration = (e) => {
    e.preventDefault();
    setRegistrationLoader(true);
    if (validateUserDetails(name, username, email, password, confirmPassword)) {
      const payload = {
        name: name,
        username: username,
        email: email,
        password: password,
      };
      registerUser(payload)
        .then((res) => {
          if (res.status === "success") {
            alert("User registered successfully");
            setRegistrationLoader(false);
            navigate("/login");
          } else {
            alert("User registration failed");
            setRegistrationLoader(false);
          }
        })
        .catch((err) => {
          console.error(err);
          alert("User registration failed");
          setRegistrationLoader(false);
        });
    } else {
      alert("Please fill all the fields correctly");
      setRegistrationLoader(false);
    }
  };

  const navigateToForgetPassword = () => {
    navigate("/login");
  };

  return (
    <div className="h-screen w-screen m-auto flex justify-center items-center">
      <div className="h-scree w-96 rounded-lg bg-primary  ">
        <form className="h-auto w-full" onSubmit={handleRegistration}>
          <div className="flex flex-col items-center justify-center p-7 w-full">
            <h1 className="text-2xl text-white">Sign Up</h1>
            <input
              type="text"
              placeholder="Name"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
              onChange={(e) => setName(e.target.value)}
            />
            <div className="w-full flex items-center relative">
              <input
                type="text"
                placeholder="Username"
                className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
                onChange={(e) => debounceUsername(e.target.value)}
              />
              <div className="flex items-cente justify-center mt-4 gap-1 absolute right-4">
                {userNameLoader && username !== "" ? (
                  <CircularProgress size={16} sx={{ color: "white" }} />
                ) : username !== "" &&
                  username.length > 3 &&
                  !userNameLoader ? (
                  isUsernameValid === true ? (
                    <VerifiedIcon sx={{ color: "green" }} />
                  ) : (
                    isUsernameValid === false && (
                      <CloseIcon sx={{ color: "red" }} />
                    )
                  )
                ) : null}
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="w-full flex items-center h-auto relative">
              <input
                type={`${changeInputType ? "text" : "password"}`}
                placeholder="Password"
                className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="absolute top-5 right-3 cursor-pointer"
                onClick={() => {
                  setChangeInputType(!changeInputType);
                }}
              >
                {changeInputType ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
              </div>
            </div>
            <div className="w-full flex items-center h-auto relative">
              <input
                type={`${isPasswordVisible ? "text" : "password"}`}
                placeholder="Confirm Password"
                className="w-full h-10 pl-2 rounded-lg bg-primary text-white border border-gray-500 mt-4"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Already have an account? Login
            </p>
            <button className="w-full h-10 rounded-lg bg-white text-primary mt-4">
              {registrationLoader ? (
                <CircularProgress
                  sx={{ color: "#0562fb !important" }}
                  size={20}
                />
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingupPage;
