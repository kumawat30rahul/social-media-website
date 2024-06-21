import { Avatar, Checkbox, Divider, Modal } from "@mui/material";
import {
  getAllFollwersList,
  sharePostToFollowers,
} from "../../../config/services";
import { useEffect, useState } from "react";

const SharePost = ({ openModal, closeModal, userId, postId }) => {
  const [followers, setFollowers] = useState([]);
  const [selectedFollowers, setSelectedFollowers] = useState([]);

  //get All folowers

  const getAllFollwers = () => {
    getAllFollwersList(userId)
      .then((res) => {
        console.log(res);
        setFollowers([
          ...res?.follwersDetails,
          ...res?.follwersDetails,
          ...res?.follwersDetails,
        ]);
      })
      .catch((error) => {
        setFollowers([]);
        console.log(error);
      });
  };

  const selectedFollowersHandler = (followerId) => {
    if (selectedFollowers?.includes(followerId)) {
      setSelectedFollowers(
        selectedFollowers?.filter((follower) => follower !== followerId)
      );
    } else {
      setSelectedFollowers([...selectedFollowers, followerId]);
    }
  };

  const sharingPost = () => {
    const payload = {
      userId: userId,
      sharedUserId: selectedFollowers,
      postId: postId,
    };
    sharePostToFollowers(payload)
      .then((res) => {
        console.log(res);
        closeModal();
        setSelectedFollowers([]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (openModal) {
      getAllFollwers();
    }
  }, [openModal]);

  return (
    <Modal open={openModal} onClose={closeModal}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary p-4 rounded-lg w-5/12 h-96">
        <div className="flex items-center justify-between">
          <h1>Share Post</h1>
          <button
            // disabled={selectedFollowers?.length === 0}
            className="text-sm bg-blue-500 rounded-md px-3 py-1"
            onClick={() => sharingPost()}
          >
            Share
          </button>
        </div>
        <Divider
          sx={{
            marginTop: "14px",
            backgroundColor: "#484444 !important",
            opacity: "1 !important",
          }}
        />
        <div className="flex flex-col gap-3 mt-4 h-72 overflow-y-auto">
          {followers?.map((follower, index) => (
            <>
              <div
                key={index}
                className="flex items-center justify-between gap-2 bg-gray-800 rounded-lg p-2"
              >
                <div className="flex items-center gap-2">
                  <Avatar
                    src={follower?.profilePic}
                    sx={{
                      height: 50,
                      width: 50,
                    }}
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">{follower?.username}</span>
                    <span className="text-sm">{follower?.name}</span>
                  </div>
                </div>
                <div>
                  <Checkbox
                    onChange={() => selectedFollowersHandler(follower?.userId)}
                  />
                </div>
              </div>
              {/* <Divider /> */}
            </>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SharePost;
