import { useEffect, useState } from "react";
import { getLeaderboard, getTopScore } from "../ds/leaderboard";

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

  useEffect(() => {
    getLeaderBoardData();
    setTopScorerData();
  }, []);

  return {
    leaderboard,
    topScorer,
  };
};

export default useLeaderboard;
