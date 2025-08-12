import { useEffect, useState } from "react";
import useWebsocket from "../../hooks/useWebsocket";
import useLeaderboard from "../../hooks/useLeaderboard";
import { Form, Formik } from "formik";
import InputText from "../../component/shared/input/InputText";
import { scoreSchema } from "../../validationSchema/score";
import type { CustomError } from "../../types/error";
import toast from "react-hot-toast";

const Dashboard = () => {
  const {
    topScorer,
    leaderboard,
    submitUserScore,
    registerWebsocketConnection,
  } = useLeaderboard();
  const { webSocketFunction, webSocket } = useWebsocket({
    onMessage: async (message: string) => {
      console.log("Received message:", message);
      const data = JSON.parse(message);
      const res = await registerWebsocketConnection({
        connectionId: data?.connectionId,
      });
      if (res.code === "00") {
        toast.success(res?.message);
      }
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    webSocketFunction(); // Connect on mount
  }, [webSocketFunction]);

  const sendMessage = (score: string) => {
    console.log("hit here...");
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({
        action: "sendMessage",
        message: `🎉 Congrats,  you scored ${score}!`,
      });
      webSocket?.current?.send(message);
      console.log("Message sent");
    } else {
      console.warn("WebSocket is not open");
    }
  };

  const initialValues = {
    score: "",
  };

  const submitScore = async (data: typeof initialValues) => {
    setLoading(true);
    try {
      if (Number(data?.score) > 1000) {
        console.log({ first: "got here..." });
        sendMessage(data?.score);
      }
      const res = await submitUserScore({
        score: Number(data.score),
      });
      setLoading(false);
      if (res.code === "00") {
        toast.success(res?.message);
      }
    } catch (error) {
      const axiosError = error as CustomError;
      if (axiosError) {
        toast.error(
          (axiosError?.response?.data as { message: string }).message || ""
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-around">
        <div>
          <div className="w-full">
            <Formik
              initialValues={initialValues}
              validationSchema={scoreSchema}
              onSubmit={submitScore}
            >
              {({ handleChange, errors, values, handleSubmit }) => {
                return (
                  <Form>
                    <div className="mb-3 w-full">
                      <InputText
                        placeholder={"Enter your username"}
                        label={"Email"}
                        handleChange={(
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => handleChange(e)}
                        value={values.score}
                        name={"score"}
                        unit={""}
                        type={"text"}
                        //   inputClassName={"w-full h-[44px]"}
                        error={errors.score}
                        fieldRequired={false}
                        labelStyle="text-start"
                        readOnly={false}
                        disabled={false}
                        textStyle={"justify-start"}
                        viewPassword={false}
                        inputClassName={""}
                      />
                    </div>

                    <div className="mt-2 w-full">
                      <button
                        className="bg-[#095C37] cursor-pointer rounded-[8px] w-full flex justify-center items-center p-4 text-white h-[44px]"
                        type="submit"
                        onClick={() => handleSubmit()}
                      >
                        {loading ? "loading..." : "Submit"}
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
        <div className="min-w-[300px]">
          <h1>TopScore</h1>
          <div className="flex justify-between">
            <div>
              <span>UserName: </span>
              <span>{topScorer?.data?.user_name}</span>
            </div>
            <div>
              <span>Score: </span>
              <span>{topScorer?.data?.score}</span>
            </div>
          </div>
        </div>
        <div>
          <h1>LeaderBoard</h1>
          <div className="min-w-[300px]">
            {leaderboard ? (
              leaderboard.data.map((data, index: number) => {
                return (
                  <div key={index} className="flex justify-between">
                    <div>
                      <span>UserName: </span>
                      <span>{data?.user_name}</span>
                    </div>
                    <div>
                      <span>Score: </span>
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
