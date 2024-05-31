import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotificationPage from "./components/notification-page";
import Navbar from "./components/navbar";
import DiscoverPage from "./pages/discover";
import ProfilePage from "./pages/profile";
import BottomNavbar from "./components/bottom-navbar";
import { useMediaQuery } from "@mui/material";

function App() {
  const [count, setCount] = useState(0);
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <BrowserRouter>
      {!isMobile && <Navbar />}
      {isMobile && <BottomNavbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/discover" element={<DiscoverPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
