import { useEffect, useState } from "react";
import {
  getLeaderboard,
  getTopScore,
  registerConnection,
  submitScore,
} from "../ds/leaderboard";

const useLeaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<{
    code: string;
    data: { user_name: string; score: string }[];
    message: string;
    success: string;
  }>();
  const [topScorer, setTopScorer] = useState<{
    code: string;
    data: { user_name: string; score: string };
    message: string;
    success: string;
  }>();
  const setTopScorerData = async () => {
    const response = await getTopScore();
    setTopScorer(response);
  };
  const getLeaderBoardData = async () => {
    const response = await getLeaderboard();
    setLeaderboard(response);
  };
  const submitUserScore = async (data: Record<string, unknown>) => {
    const response = await submitScore(data);
    return response;
  };
  const registerWebsocketConnection = async (data: Record<string, unknown>) => {
    const response = await registerConnection(data);
    return response;
  };

  useEffect(() => {
    getLeaderBoardData();
    setTopScorerData();
  }, []);

  return {
    leaderboard,
    topScorer,
    submitUserScore,
    setTopScorerData,
    getLeaderBoardData,
    registerWebsocketConnection,
  };
};

export default useLeaderboard;
