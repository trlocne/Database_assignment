import React from "react";

const Lecture = () => {
  const items = [
    {
      key: "1",
      label: "Tab 1",
      children: "Content of Tab Pane 1",
    },
    {
      key: "2",
      label: "Tab 2",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Tab 3",
      children: "Content of Tab Pane 3",
    },
  ];
  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="course_name ">
        <span className="inline-block py-4 bg-slate-400 w-full">
          Some thing i can do
        </span>
      </div>

      <div className="detailed_content">
        <div className="right_detailed_content">
          <div class="video"></div>
          <div class="infor_video"></div>
        </div>
        <div className="left_detailed_content"></div>
      </div>
    </div>
  );
};

export default Lecture;
