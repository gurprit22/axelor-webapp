import axios from "axios";
import { BASE_URL } from "../../constants/index";

export const AuthApi = {};

AuthApi.login = async (body) => {
  const res = await axios.post(`${BASE_URL}callback`, body, {
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });

  return res ? res : null;
};
