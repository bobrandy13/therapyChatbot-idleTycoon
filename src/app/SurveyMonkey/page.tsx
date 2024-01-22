import React from "react";
import Navbar from "../components/Navbar";

function SurveyMoney() {
  return (
    <>
      <Navbar />{" "}
      <div className="flex h-screen w-screen flex-col items-center justify-center">
        <div className="text-bold mb-8 text-xl">
          <h1>COmplete these surveys to earn yourself a living!</h1>
        </div>
        <div className="h-1/2 w-1/2 rounded-lg bg-neutral p-4">Survey</div>

        {/* TODO fetch the survey questions */}
      </div>
    </>
  );
}

export default SurveyMoney;
