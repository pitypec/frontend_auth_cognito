import { useRef } from "react";

interface UseWebSocketParams {
  onMessage: (message: string) => void;
}

interface UseWebSocketReturn {
  webSocket: React.MutableRefObject<WebSocket | null>;
  webSocketFunction: () => void;
}

const useWebsocket = ({
  onMessage,
}: UseWebSocketParams): UseWebSocketReturn => {
  const webSocket = useRef<WebSocket | null>(null);
  console.log({ webSocket });

  const webSocketFunction = (): void => {
    let keepAliveInterval: number | null = null;

    if (!("WebSocket" in window)) {
      console.log("WebSocket NOT supported by your Browser!");
      return;
    }

    console.log("WebSocket is supported by your Browser!");
    const url = `${import.meta.env.VITE_WEBSOCKET_URL}`;
    const ws = new WebSocket(url);

    ws.onopen = async () => {
      console.log("Connection is open...");
      webSocket.current = ws;

      // Extract connection ID
      const connectionId = ws.url.split("/").pop() || "";
      console.log({ connectionId });

      // Send connection ID to webhook

      // Keep-alive ping
      keepAliveInterval = window.setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log("Sending keep-alive ping");
          ws.send(JSON.stringify({ action: "sendMessage", message: "ping" }));
        }
      }, 300_000); // 5 minutes
    };

    ws.onmessage = (evt: MessageEvent) => {
      onMessage(evt.data);
    };

    ws.onclose = (event: CloseEvent) => {
      console.log("Connection is closed...", event);
      if (keepAliveInterval !== null) {
        window.clearInterval(keepAliveInterval);
      }
    };
  };

  return {
    webSocket,
    webSocketFunction,
  };
};

export default useWebsocket;
