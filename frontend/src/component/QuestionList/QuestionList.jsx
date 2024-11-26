import React from "react";

const QuestionList = ({ question }) => {
  console.log("question in question list: ", question);
  const renderMultiChoice = (option) => {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {option.map((o, idx) => {
          return (
            <div className="p-2 border rounded-lg hover:border-blue-300 cursor-pointer">
              <span>
                {String.fromCharCode(idx + 65)}. {o}
              </span>
            </div>
          );
        })}
      </div>
    );
  };
  const renderQuestion = () => {
    return question.map((q) => {
      console.log("q: ", q);
      return (
        <div className="mb-3">
          <div className="max-h-[30px] mb-2">
            <h2 className="font-bold">{q.text}</h2>
          </div>
          {q.type === "multiple_choice" ? (
            renderMultiChoice(q.options || [])
          ) : (
            <input placeholder="nhập đáp án của bạn" />
          )}
        </div>
      );
    });
  };
  return (
    <div>
      <h1>Quiz Section</h1>
      {renderQuestion()}
    </div>
  );
};

export default QuestionList;
