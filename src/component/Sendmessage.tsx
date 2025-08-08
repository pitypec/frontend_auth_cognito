import React, { useEffect } from "react";
import useWebsocket from "../hooks/useWebsocket";

const WebSocketComponent: React.FC = () => {
  const { webSocket, webSocketFunction } = useWebsocket({
    onMessage: (message: string) => {
      console.log("Received message:", message);
    },
  });

  useEffect(() => {
    webSocketFunction(); // Connect on mount
  }, [webSocketFunction]);

  const sendMessage = () => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      const message = {
        action: "sendMessage",
        message: "Hello from React!",
      };
      webSocket.current.send(JSON.stringify(message));
      console.log("Message sent");
    } else {
      console.warn("WebSocket is not open");
    }
  };

  return (
    <div>
      <h2>WebSocket Client</h2>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default WebSocketComponent;
