// import api from "../api/axios.js";
import axiosInstance from "../api/axios.js";

export const login = async (data: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
export const signup = async (data: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
export const confirmSignup = async (data: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.post("/auth/confirm-signup", data);
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
