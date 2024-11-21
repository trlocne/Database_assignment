/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";
import { Property1Close } from "../../icons/Property1Close";

const TypeNomalSize = ({
  className,
  divClassName,
  text = "Placehoder",
  visible = true,
}) => {
  return (
    <div
      className={`flex w-[525px] h-12 items-center justify-center gap-2.5 px-4 py-2.5 relative rounded-lg border border-solid border-colorgrey ${className}`}
    >
      <div
        className={`relative flex-1 mt-[-0.50px] font-p font-[number:var(--p-font-weight)] text-colorgrey text-[length:var(--p-font-size)] tracking-[var(--p-letter-spacing)] leading-[var(--p-line-height)] [font-style:var(--p-font-style)] ${divClassName}`}
      >
        {text}
      </div>

      {visible && (
        <Property1Close className="!relative !w-6 !h-6" color="#9D9D9D" />
      )}
    </div>
  );
};

export default TypeNomalSize;