import axios from "axios";
// import EnvConfig from "./envConfig";

const postHeaders = {
  "Content-Type": "application/json",
};
const getHeaders = {
  "Content-Type": "application/json",
};
const patchHeaders = {
  "Content-Type": "application/json",
};

const imageHeaders = {
  "Content-Type": "multipart/form-data",
};

const deleteHeaders = {
  "Content-Type": "application/json",
};

export const getRequest = async (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url, { headers: { ...getHeaders } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postRequest = async (url, data) => {
  return new Promise((resolve, reject) => {
    const headers = { ...postHeaders };
    axios
      .post(url, data, { headers })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postImageRequest = async (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(url, data, { ...imageHeaders })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const patchRequest = async (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .patch(url, data, { headers: { ...patchHeaders } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteRequest = async (url) => {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { headers: { ...deleteHeaders } })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
