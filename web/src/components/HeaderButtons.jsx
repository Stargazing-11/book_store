import React from "react";
import Button from "./Button";

const HeaderButtons = () => {
  return (
    <div className="grid grid-cols-2">
      <Button background={true} />
      <Button background={false} />
    </div>
  );
};

export default HeaderButtons;
