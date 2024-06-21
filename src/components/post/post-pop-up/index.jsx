import { Box, Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import "./post-pop-up.css";

const PostPopup = ({ open, handleCloseFunc }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    height: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #000",
  };
  return (
    <Modal open={open} onClose={() => handleCloseFunc(false)}>
      <Box sx={style}>
        <div className="flex items-stretch border border-green-500 post-popup-content-conatiner">
          <div className="bg-gray-800 image-div-popup">
            <img
              // src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Mard_Ko_Dard_Nahi_Hota.jpg/220px-Mard_Ko_Dard_Nahi_Hota.jpg"
              src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTbyNyLxq6CsGjR7nhyJs0oRhnTSW0SUNYWnMnC-JSExpKha0bac6xzTufwCzAoqLed4J0zztdsnd0wy6U"
              // src="https://i.pinimg.com/736x/2e/8a/5d/2e8a5d13bcef3a092fce98c0ebe27b68.jpg"
              // src="https://as2.ftcdn.net/v2/jpg/02/73/21/59/1000_F_273215968_a8pSIB6pJgw7VgdkpXOgHV46xUYkutKL.jpg"
              className="image-popup"
            />
          </div>
          <div className="bg-gray-600 comment-section-popup">akjsdf</div>
        </div>
      </Box>
    </Modal>
  );
};

{
}

export default PostPopup;
