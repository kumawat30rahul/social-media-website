import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotificationPage from "./components/notification-page";
import Navbar from "./components/navbar";
import DiscoverPage from "./pages/discover";
import ProfilePage from "./pages/profile";
import BottomNavbar from "./components/bottom-navbar";
import { useMediaQuery } from "@mui/material";
import SingupPage from "./components/auth/signup";
import LoginPage from "./components/auth/login";
import ForgetPassword from "./components/auth/forget-password";
import ProtectedRoute from "./components/protectedRoutes/protectedRoutes";
import Error404 from "./components/error404";

function App() {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [isSingupOrLogin, setIsSingupOrLogin] = useState(false);

  useEffect(() => {
    if (
      window.location.pathname.includes("signup") ||
      window.location.pathname.includes("login") ||
      window.location.pathname.includes("forget-password")
    ) {
      setIsSingupOrLogin(true);
    } else {
      setIsSingupOrLogin(false);
    }
  }, [window.location.pathname]);

  return (
    <BrowserRouter>
      {!isMobile && !isSingupOrLogin && <Navbar />}
      {isMobile && !isSingupOrLogin && <BottomNavbar />}
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notifications" element={<NotificationPage />} />
                <Route path="/discover" element={<DiscoverPage />} />
                <Route path="/profile/:userId" element={<ProfilePage />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SingupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
