// PostSkeleton.jsx
import React from "react";
import { Box, Skeleton, Avatar } from "@mui/material";

const PostSkeleton = () => {
  return (
    <Box
      sx={{
        width: 350,
        padding: 2,
        border: "1px solid #ccc",
        borderRadius: 2,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ flexGrow: 1 }}>
          <Skeleton width="50%" />
          <Skeleton width="30%" />
        </Box>
      </Box>
      <Skeleton variant="rectangular" width="100%" height={200} />
      <Skeleton width="80%" />
    </Box>
  );
};

export default PostSkeleton;
