// import EnvConfig from "./envConfig";
import {
  getRequest,
  patchRequest,
  postImageRequest,
  postRequest,
} from "./serviceConfig";
// import process from "process";

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

// const envBaseUrl = EnvConfig().envBaseurl;
const envBaseUrl = import.meta.env.VITE_PROD_URL;

export const createUserAccount = (payload) => {
  const url = `${envBaseUrl}/user/register`;
  return postRequest(url, payload);
};

export const getUserDetails = (userId) => {
  const url = `${envBaseUrl}/user/user-details/${userId}`;
  return getRequest(url);
};

export const getAllPosts = (userId) => {
  const url = `${envBaseUrl}/post/get-all/${userId}`;
  return getRequest(url);
};

export const getAllSavedPosts = (userId) => {
  const url = `${envBaseUrl}/post/get-saved-posts/${userId}`;
  return getRequest(url);
};

export const getAllLikedPosts = (userId) => {
  const url = `${envBaseUrl}/post/get-liked-posts/${userId}`;
  return getRequest(url);
};

export const getAllSharedPosts = (userId) => {
  const url = `${envBaseUrl}/post/get-shared-posts/${userId}`;
  return getRequest(url);
};

export const getAllCommentedPosts = (userId) => {
  const url = `${envBaseUrl}/post/get-commented-posts/${userId}`;
  return getRequest(url);
};

export const updateLike = (payload) => {
  const url = `${envBaseUrl}/post/update-like`;
  return postRequest(url, payload);
};

export const savePost = (payload) => {
  const url = `${envBaseUrl}/post/save-post`;
  return postRequest(url, payload);
};

export const updateComment = (payload) => {
  const url = `${envBaseUrl}/post/update-comment`;
  return postRequest(url, payload);
};

export const getAllFollwersList = (userId) => {
  const url = `${envBaseUrl}/user/followers/${userId}`;
  return getRequest(url);
};

export const sharePostToFollowers = (payload) => {
  const url = `${envBaseUrl}/post/share-post`;
  return postRequest(url, payload);
};

export const getAllNotifications = (userId) => {
  const url = `${envBaseUrl}/notification/get-all/${userId}`;
  return getRequest(url);
};

export const createPost = (payload) => {
  const url = `${envBaseUrl}/post/create`;
  return postImageRequest(url, payload);
};

export const uploadingImage = (payload, headers) => {
  const url = `${envBaseUrl}/image/create`;
  return postRequest(url, payload, headers);
};

export const fetchAllPosts = () => {
  const url = `${envBaseUrl}/post/get-all-posts`;
  return getRequest(url);
};

export const getAllUsers = () => {
  const url = `${envBaseUrl}/user/all-user-details`;
  return getRequest(url);
};

export const getPostsByIds = (payload) => {
  const url = `${envBaseUrl}/post/get-posts-by-ids`;
  return postRequest(url, payload);
};

export const followUser = (payload) => {
  const url = `${envBaseUrl}/user/follow`;
  return postRequest(url, payload);
};

export const checkUsername = (payload) => {
  const url = `${envBaseUrl}/user/username-check`;
  return postRequest(url, payload);
};

export const registerUser = (payload) => {
  const url = `${envBaseUrl}/user/register`;
  return postRequest(url, payload);
};

export const userLogin = (payload) => {
  const url = `${envBaseUrl}/user/login`;
  return postRequest(url, payload);
};
export const changeNotificationStatus = (notificationId) => {
  const url = `${envBaseUrl}/notification/read/${notificationId}`;
  return patchRequest(url);
};
