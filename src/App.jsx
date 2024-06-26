import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./pages/home";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
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
import ReactToaster from "./components/hooks/snackbar";

function RoutesComponent() {
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const showNavbars =
    location.pathname !== "/login" && location.pathname !== "/signup";

  return (
    <>
      {showNavbars && <Navbar />}
      {showNavbars && isMobile && <BottomNavbar />}
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <DiscoverPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:userId"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SingupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <RoutesComponent />
      <ReactToaster />
    </BrowserRouter>
  );
}

export default App;
