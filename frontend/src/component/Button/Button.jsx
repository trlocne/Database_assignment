/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import React from "react";

const Button = ({
  button,
  type,
  size,
  className,
  textLinkHoverClassName,
  text = "Posts Comment",
}) => {
  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-3xl justify-center relative ${button === "outline" ? "border-2 border-solid" : ""} ${button === "outline" && size === "small" ? "border-colorlight-grey" : (size === "samll") ? "border-colorgrey" : ""} ${["filled", "outline"].includes(button) ? "px-6 py-2.5" : ""} ${["filled", "outline"].includes(button) ? "h-12" : ""} ${button === "filled" && type === "hover" ? "bg-colorsecondary" : (button === "filled" && type === "dark-nomal") ? "bg-colorwhite" : button === "filled" && type === "light-nomal" ? "bg-variable-collection-primary" : ""} ${className}`}
    >
      <div
        className={`w-fit whitespace-nowrap relative ${button === "filled" && type === "light-nomal" ? "[font-family:'Jost',Helvetica]" : "font-a"} ${size === "large" ? "mt-[-2.00px]" : (button === "outline") ? "mt-[-1.50px]" : button === "filled" ? "mt-[-0.50px]" : ""} ${button === "filled" && type === "light-nomal" ? "tracking-[0]" : "tracking-[var(--a-letter-spacing)]"} ${button === "filled" && type === "light-nomal" ? "text-lg" : "text-[length:var(--a-font-size)]"} ${button === "link" || button === "outline" || (button === "filled" && type === "dark-nomal") || (button === "filled" && type === "hover") ? "[font-style:var(--a-font-style)]" : ""} ${type === "hover" && size === "large" ? "text-colorsecondary" : (type === "dark-nomal" && ["link", "outline"].includes(button)) ? "text-colorlight-grey" : type === "light-nomal" && ["link", "outline"].includes(button) ? "text-colorblack" : button === "filled" && type === "hover" ? "text-colorwhite" : button === "filled" && type === "dark-nomal" ? "text-colormain" : button === "filled" && type === "light-nomal" ? "text-variable-collection-white" : ""} ${button === "filled" && type === "light-nomal" ? "font-medium" : "font-[number:var(--a-font-weight)]"} ${button === "filled" && type === "light-nomal" ? "leading-[27px]" : "leading-[var(--a-line-height)]"} ${textLinkHoverClassName}`}
      >
        {type === "hover" && size === "large" && <>Text Link/hover</>}

        {size === "large" && type === "dark-nomal" && <>Text Link/dart/nomal</>}

        {type === "light-nomal" && size === "large" && (
          <>Text Link/light/nomal</>
        )}

        {button === "outline" && size === "small" && <>Outline/dark/nomal</>}

        {size === "samll" && <>Outline/light/nomal</>}

        {button === "filled" && type === "hover" && <>Filled/hover</>}

        {button === "filled" && type === "dark-nomal" && <>Filled/dark/nomal</>}

        {button === "filled" && type === "light-nomal" && <>{text}</>}
      </div>
    </div>
  );
};

export default Button;
