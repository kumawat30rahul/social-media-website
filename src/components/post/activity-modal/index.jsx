import { Divider, Modal } from "@mui/material";

const ActivityPostPopup = ({ title, array }) => {
  return (
    <Modal>
      <div>
        <span>{title}</span>
        <Divider />
        <div>
          {array.map((item) => (
            <div>
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <div>
                <span>{item.username}</span>
                <span>{item.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ActivityPostPopup;
