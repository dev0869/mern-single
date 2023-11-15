import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/axiosconfig";

export const checkuserSignup = async (data) => {
  const response = await axios.post(`${base_url}user/check`, data, config);
  return response.data;
};

export const signupUser = async (data) => {
  const response = await axios.post(`${base_url}user/register/`, data, config);
  return response.data;
};
export const verifyUserLogin = async (data) => {
  const response = await axios.post(`${base_url}user/verify`, data, config);

  return response.data;
};

export const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}user/forgot-password-token`,
    data,
    config
  );
  return response.data;
};

export const resetUserPassword = async (data) => {
  const response = await axios.put(
    `${base_url}user/reset-password/${data.token}`,
    { password: data.password }
  );
  return response.data;
};

export const CheckResetPasswordUser = async (data) => {
  const response = await axios.get(
    `${base_url}user/reset-password/${data.token}`
  );
  return response.data;
};

export const sendContactRequest = async (data) => {
  const response = await axios.post(`${base_url}contact/add`, data);
  return response.data;
};
export const getProducts = async () => {
  const response = await axios.get(`${base_url}product`);
  return response.data;
};
