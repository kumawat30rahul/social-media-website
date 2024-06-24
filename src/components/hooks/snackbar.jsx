// App.js or App.tsx
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReactToaster() {
  return (
    <div className="App">
      {/* Your other components */}
      <ToastContainer />
    </div>
  );
}

export const useSnackbar = () => {
  const showSnackbar = (message, severity) => {
    const options = {
      position: "top-right",
      autoClose: 5000,
    };

    switch (severity) {
      case "success":
        toast.success(message, options);
        break;
      case "error":
        toast.error(message, options);
        break;
      case "info":
        toast.info(message, options);
        break;
      case "warning":
        toast.warn(message, options);
        break;
      default:
        toast(message, options);
    }
  };

  return showSnackbar;
};

export default ReactToaster;
