import React, { useEffect, useRef, useState } from "react";

const QuestionList = ({ question, quizSection }) => {
  const timeId = useRef();
  const [countdown, setCountdown] = useState(
    Number(quizSection.Time_of_lecture) * 60
  );
  useEffect(() => {
    timeId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timeId.current);
  }, []);
  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timeId.current);
      alert("You are out of time !!!");
    }
  }, [countdown]);
  console.log("question in question list: ", question, quizSection);

  const formatTime = (seconds) => {
    // Tính số giờ
    const hours = Math.floor(seconds / 3600);
    // Tính số phút còn lại
    const minutes = Math.floor((seconds % 3600) / 60);
    // Tính số giây còn lại
    const remainingSeconds = seconds % 60;

    // Chuyển thành chuỗi có độ dài 2 ký tự, thêm số 0 nếu cần
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };
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
    return question.map((q, idx) => {
      console.log("q: ", q);
      return (
        <div className="mb-3">
          <div className="max-h-[30px] mb-2">
            <h2 className="font-bold">
              {idx + 1}. {q.text}
            </h2>
          </div>
          {q.type === "multiple_choice" ? (
            renderMultiChoice(q.options || [])
          ) : (
            <input
              placeholder="nhập đáp án của bạn"
              className="py-2 px-3 border border-gray-400  focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-lg p-2"
            />
          )}
        </div>
      );
    });
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1>Quiz Section</h1>
        <span className="inline-block p-2 bg-blue-200 rounded-lg">
          LEFT TIME: {formatTime(countdown)}
        </span>
      </div>
      {renderQuestion()}
    </div>
  );
};

export default QuestionList;
