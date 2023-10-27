import React from "react";
import HeaderButtons from "./HeaderButtons";

const Hero = () => {
  return (
    <div>
      <h1 className="font-extrabold text-4xl">Atrons Book Store</h1>
      <p>
        Discover boundless worlds at Atrons, your online gateway to captivating
        stories across genres.
      </p>
      <HeaderButtons />
    </div>
  );
};

export default Hero;
