"use client";
import React, { useState } from "react";
import Link from "next/link";
import { InputHome } from "@/components/InputHome";
import { useToast } from "@/components/ui/use-toast";
import AnswerPage from "@/components/AnswerPage";
import { addAnswer } from "@/provider/redux/Answer";
import { useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import Sidebar from "@/components/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();
  const dispatch = useDispatch();

  const handleAsk = async (question) => {
    setLoading(true);
    let id = await dispatch(
      addAnswer({
        question: question,
        answer: "",
        notebookId: null,
      })
    );
    id = id.payload;
    try {
      const response = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (response.ok) {
        const data = await response.json();
        setAnswer(data.answer);
        dispatch(
          addAnswer({
            question: question,
            answer: data.result,
            sources: data.source_documents,
            id:id,
            youtube : data.youtube_videos
          })
        );
        setError("");
      } else {
        const data = await response.json();
        setAnswer("");
        setError(data.error || "Failed to get an answer from OpenAI.");
      }
    } catch (error) {
      console.error(error);
      setAnswer("");
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Sidebar />
      {answer ? (
        <>
          {error &&
            toast({
              title: "Error",
              description: error,
              status: "error",
              duration: 5000,
            })}
          {/* {answer && (
          <AnswerPage Answer={answer.content}/>
        )} */}
        </>
      ) : (
        <div className="w-full h-full flex justify-center relative items-center">
          <InputHome onAsk={handleAsk} />
          {loading && (
            <div className="h-full w-full absolute top-0 flex justify-center items-center bg-zinc-200 left-0">
              <ReactLoading
                type="spin"
                color="#13343B"
                height={"50px"}
                width={"70px"}
              />
            </div>
          )}
        </div>
      )}
      <div className="help-btn">
        <i className="ri-question-fill"></i>
      </div>
    </div>
  );
};

export default Home;
