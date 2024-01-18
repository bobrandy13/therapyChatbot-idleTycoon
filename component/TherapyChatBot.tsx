import React from "react";

function TherapyBot() {
  return (
    <>
      <label className="form-control w-full max-w-md">
        <div className="label">
          <span className="label-text">What brings you here today???</span>
        </div>
        <textarea
          placeholder="Type here"
          className="textarea textarea-bordered w-full max-w-md"
        />
      </label>
    </>
  );
}

export default TherapyBot;
