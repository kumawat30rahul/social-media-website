import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Error404 = () => {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <p onClick={navigateToHome}>Click to go homepage</p>
      <Button variant="contained" color="info" onClick={navigateToHome}>
        ERROR 404
      </Button>
    </div>
  );
};

export default Error404;
