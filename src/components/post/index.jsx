import { Avatar, Divider } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";

const FeedPost = () => {
  return (
    <div className="bg-primary w-full h-auto p-2 rounded-xl my-4 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Avatar />
        <span>John Doe</span>
        <FiberManualRecordIcon sx={{ width: 5, height: 5 }} />
        <span>9h</span>
      </div>
      {/* <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} /> */}
      <div className="max-h-96 w-full h-96 flex items-center justify-center">
        <div className="h-full w-full flex items-center justify-center">
          <img
            //   src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPWJ0i-sYdb40j4VW_I0J7pFSgHsv_DPB-LA&s"
            src="https://qph.cf2.quoracdn.net/main-qimg-b10a55b8cb9e95f9a4367be793224b06-lq"
            alt="Post"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>
      <div className="flex items-center justify-between m-3">
        <div className="flex items-center gap-4">
          <FavoriteBorderIcon />
          <ChatBubbleOutlineIcon />
          <SendIcon />
        </div>
        <div>
          <BookmarkBorderIcon />
        </div>
      </div>
      <Divider sx={{ backgroundColor: "#484444 !important", width: "100%" }} />
      <div>
        <div>
          {/* <p className="text-sm">
            <span className="font-bold">John Doe</span> and 10 others liked this
            post
          </p> */}
          <p className="text-sm font-bold">34225 Likes</p>
        </div>
        <div className="flex items-start gap-2 mt-2">
          <Avatar sx={{ width: 20, height: 20 }} />
          <p className="text-sm">
            <span className="font-bold">jhondoe</span>
            <span className="ml-2">
              Its a scary and awesome picture of ichigo kurusaki who is the soul
              reaper
            </span>
          </p>
        </div>
        <div className="mt-2">
          <p className="text-sm">View all 10 comments</p>
          <div className="flex flex-col items-start gap-2 mt-2">
            <p className="text-sm">
              <span className="font-bold">jhondoe</span>
              <span className="ml-2">
                Its a scary and awesome picture of ichigo kurusaki who is the
                soul reaper
              </span>
            </p>
            <p className="text-sm">
              <span className="font-bold">jhondoe</span>
              <span className="ml-2">
                Its a scary and awesome picture of ichigo kurusaki who is the
                soul reaper
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Add a comment..."
          className="w-full pb-1 -ml-2 bg-transparent outline-none px-2"
        />
      </div>
    </div>
  );
};

export default FeedPost;
