import EnvConfig from "./envConfig";
import { postRequest } from "./serviceConfig";

const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const envBaseUrl = EnvConfig().envBaseurl;

export const createUserAccount = (payload) => {
  const url = `${envBaseUrl}/user/register`;
  return postRequest(url, payload);
};
