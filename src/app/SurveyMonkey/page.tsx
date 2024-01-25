"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import fetchQuestions from "~/server/surveyQuestions";

function SurveyMoney() {
  const [word, setWord] = useState<string>();
  useEffect(() => {
    fetchQuestions()
      .then((res) => {
        console.log(res);
        setWord(res);
      })
      .catch((e) => console.error(e));
  }, []);

  if (!word) {
    setWord("loading....");
  }
  return (
    <>
      <Navbar />{" "}
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="text-bold mb-8 text-xl"></div>
        <div className="flex h-1/2 w-auto flex-col items-center rounded-lg bg-neutral p-4">
          <h1 className="pt-4 text-2xl font-bold">{`What are your thoughts on ${word}s`}</h1>

          {/* React form down below */}
          <div className="join m-4 mt-10">
            <form>
              <input
                className="btn join-item rounded"
                type="radio"
                name="options"
                aria-label="strogly disagree"
              />
              <input
                className="btn join-item rounded"
                type="radio"
                name="options"
                aria-label="slightly disagree"
              />
              <input
                className="btn join-item rounded"
                type="radio"
                name="options"
                aria-label="neither agree nor disagree"
              />
              <input
                className="btn join-item rounded"
                type="radio"
                name="options"
                aria-label="somewhat agree"
              />
              <input
                className="btn join-item rounded"
                type="radio"
                name="options"
                aria-label="stronly agree"
              />
              <button className="btn btn-secondary">submit</button>
            </form>
          </div>
        </div>

        {/* TODO fetch the survey questions */}
      </div>
    </>
  );
}
export default SurveyMoney;
