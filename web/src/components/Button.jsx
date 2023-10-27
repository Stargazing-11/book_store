import React from "react";

const Button = ({ background }) => {
  console.log(background);
  return (
    <div>
      <button
        className={`border-solid border-2 border-rose-500 p-1 font-semibold ${
          background === true ? "text-white" : "text-rose-500"
        }  ${background == true ? "bg-rose-500" : "bg-white"} `}
      >
        Get Started
      </button>
    </div>
  );
};

export default Button;
