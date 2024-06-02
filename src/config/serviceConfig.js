import axios from "axios";
import EnvConfig from "./envConfig";

const postHeaders = {
  "Content-Type": "application/json",
};
const getHeaders = {
  "Content-Type": "application/json",
};
const patchHeaders = {
  "Content-Type": "application/json",
};

export const getRequest = async (url, data) => {
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
    axios
      .post(url, data, { headers: { ...postHeaders } })
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
