import axiosInstance from "../api/axios";

export const submitScore = async (data: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.post("/leaderboards/submit-score", data);
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
export const registerConnection = async (data: Record<string, unknown>) => {
  try {
    const res = await axiosInstance.post(
      "/leaderboards/register-connection",
      data
    );
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
export const getLeaderboard = async () => {
  try {
    const res = await axiosInstance.get("/leaderboards/get-leaderboard");
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
export const getTopScore = async () => {
  try {
    const res = await axiosInstance.get("/leaderboards/top-score");
    return res.data;
  } catch (error: unknown) {
    console.log({ error });
  }
};
