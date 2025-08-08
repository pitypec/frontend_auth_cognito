import { useRef } from "react";
import { registerConnection } from "../ds/leaderboard";

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

    if ("WebSocket" in window) {
      console.log("WebSocket is supported by your Browser!");
      const url = `${import.meta.env.VITE_WEBSOCKET_URL}`;
      const ws = new WebSocket(url);

      ws.onopen = async () => {
        console.log("Connection is open...");
        webSocket.current = ws;
        console.log({ first: ws.url.split("/").pop() });
        // registerConnection({});

        keepAliveInterval = window.setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            console.log("Sending keep-alive ping");
            ws.send(JSON.stringify({ action: "sendMessage", message: "ping" }));
          }
        }, 300000); // 5 minutes
      };

      ws.onmessage = (evt: MessageEvent) => {
        console.log("message", evt);
        onMessage(evt.data);
      };

      ws.onclose = (event: CloseEvent) => {
        console.log("Connection is closed...", event);
        if (keepAliveInterval !== null) {
          window.clearInterval(keepAliveInterval);
        }
      };
    } else {
      console.log("WebSocket NOT supported by your Browser!");
    }
  };

  return {
    webSocket,
    webSocketFunction,
  };
};

export default useWebsocket;

// const useWebsocket = ({ onMessage }) => {
//   const webSocket = useRef(null);
//   function webSocketFunction(userId) {
//     let keepAliveInterval;
//     if ('WebSocket' in window) {
//       console.log('WebSocket is supported by your Browser!');
//       let ws = new WebSocket(
//         ${process.env.REACT_APP_WEBSOCKET_URL}?userId=${userId},
//       );

//       ws.onopen = function () {
//         console.log('Connection is open...');
//         webSocket.current = ws;
//         keepAliveInterval = setInterval(() => {
//           if (ws.readyState === WebSocket.OPEN) {
//             console.log('Sending keep-alive ping');
//             ws.send(JSON.stringify({ action: 'sendMessage', message: 'ping' }));
//           }
//         }, 300000);
//       };

//       ws.onmessage = function (evt) {
//         console.log('message', evt);
//         onMessage(evt.data);
//       };

//       ws.onclose = function (data) {
//         console.log('Connection is closed...', data);
//         clearInterval(keepAliveInterval);
//       };
//     } else {
//       console.log('WebSocket NOT supported by your Browser!');
//     }
//   }
//   return {
//     webSocket,
//     webSocketFunction,
//   };
// };
// export default useWebsocket;
