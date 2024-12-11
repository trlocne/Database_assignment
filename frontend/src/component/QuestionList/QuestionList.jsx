import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateIsTakingQuizModal } from "../../redux/videoReducer.js";

const QuestionList = ({ question, quizSection }) => {
  const timeId = useRef();
  const dispatch = useDispatch();
  const [isQuizDone, setIsQuizDone] = useState(false);
  const [countdown, setCountdown] = useState(
    Number(quizSection.homeworkTime) * 60
  );
  const [result, setResult] = useState(0);
  const [answers, setAnswers] = useState(Array(question?.length).fill(""));
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
      setIsQuizDone(true);
    }
  }, [countdown]);
  console.log("answer: ", answers);
  const handleCheckAnswer = () => {
    let newAnswerArray = [...answers];
    console.log("content of input value: ", e.target.value);
    newAnswerArray[idx] = e.target.value;
  };
  const handleChangeAnswer = (e, idx) => {
    let newAnswerArray = [...answers];
    console.log("content of input value: ", e.target.value);
    newAnswerArray[idx] = e.target.value;
    setAnswers(newAnswerArray);
  };
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
  const handleChangeSelect = (answer, idx) => {
    let newAnswerArray = [...answers];
    newAnswerArray[idx] = answer;
    setAnswers(newAnswerArray);
  };
  const renderMultiChoice = (option, originalIdx) => {
    return (
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        {option.map((o, idx) => {
          return (
            <div
              className={`p-2 border rounded-lg hover:border-blue-300 cursor-pointer ${
                answers[originalIdx] === o ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => handleChangeSelect(o, originalIdx)}
            >
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
    console.log("question: ", question);
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
            renderMultiChoice(q.options || [], idx)
          ) : (
            <input
              onChange={(e) => handleChangeAnswer(e, idx)}
              placeholder="nhập đáp án của bạn"
              className="py-2 px-3 border border-gray-400  focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none rounded-lg p-2"
            />
          )}
        </div>
      );
    });
  };
  const handleCompleteQuiz = () => {
    clearInterval(timeId.current);
    setIsQuizDone(true);
    dispatch(updateIsTakingQuizModal(false));
    let count = 0;
    question.forEach((q, idx) => {
      if ((q.sampleAnswer || q.correctOption) === answers[idx]) count++;
    });
    console.log(
      "điểm quiz của bạn là: ",
      parseFloat((count / question.length).toFixed(2))
    );
    setResult(parseFloat((count / question.length).toFixed(2)));
  };
  const renderIsCompleteQuiz = () => {
    return !isQuizDone ? (
      <div>
        <div className="flex justify-between items-center">
          <h1>Quiz Section</h1>
          <span className="inline-block p-2 bg-blue-200 rounded-lg">
            LEFT TIME: {formatTime(countdown)}
          </span>
        </div>
        {renderQuestion()}
        <div className="flex justify-end">
          <button
            className=" py-1 px-4 bg-blue-500  rounded-lg text-white hover:bg-blue-400 h-fit"
            onClick={handleCompleteQuiz}
          >
            Complete
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center">
        {result >= 6.0 ? (
          <span>
            Chúc mừng bạn đã hoàn thành bài Quiz với số điểm là {result}!
          </span>
        ) : (
          <span>Bạn đã không vượt qua bài Quiz với số điểm là {result} !</span>
        )}
      </div>
    );
  };
  return <div>{renderIsCompleteQuiz()}</div>;
};

export default QuestionList;
