import { useEffect } from "react";
import useWebsocket from "../../hooks/useWebsocket";
import useLeaderboard from "../../hooks/useLeaderboard";

const Dashboard = () => {
  const { webSocketFunction } = useWebsocket({
    onMessage: (message: string) => {
      console.log("Received message:", message);
    },
  });
  const { topScorer, leaderboard } = useLeaderboard();
  console.log({ topScorer });
  console.log({ leaderboard });

  useEffect(() => {
    webSocketFunction(); // Connect on mount
  }, [webSocketFunction]);

  // const sendMessage = () => {
  //   if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
  //     const message = {
  //       action: "sendMessage",
  //       message: "Hello from React!",
  //     };
  //     webSocket.current.send(JSON.stringify(message));
  //     console.log("Message sent");
  //   } else {
  //     console.warn("WebSocket is not open");
  //   }
  // };

  return (
    <div>
      <div className="flex justify-around">
        <div></div>
        <div>
          <h1>LeaderBoard</h1>
          <div className="flex justify-between">
            <div>
              <span>UserName:</span>
              <span>{topScorer?.data?.user_name}</span>
            </div>
            <div>
              <span>Score:</span>
              <span>{topScorer?.data?.score}</span>
            </div>
          </div>
        </div>
        <div>
          <h1>LeaderBoard</h1>
          <div>
            {leaderboard ? (
              leaderboard.data.map((data, index: number) => {
                return (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span>UserName:</span>
                      <span>{data?.user_name}</span>
                    </div>
                    <div>
                      <span>Score:</span>
                      <span>{data?.score}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
