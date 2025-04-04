import React from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div>
      <RingLoader
        color="blue"
        cssOverride={{
          display: "block",
          margin: "0 auto",
          zIndex: 100,
        }}
      />
    </div>
  );
};

export default Spinner;
