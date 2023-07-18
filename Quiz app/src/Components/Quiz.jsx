import quiz from "../../utils/ConstantQuiz";
import { useState } from "react";
import "../../src/App.css";
const Quiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAns, setCorrectAns] = useState(0);
  const [score, setScore] = useState(0);
  const [preAns, setPreAns] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  let isTrue;
  const handleClick = (ans) => {
    setIsDisable(false);
    isTrue = true;
    if (!preAns.includes(ans)) {
      if (quiz[currentIndex].Answer == ans) {
        setScore(score + 2);
        setCorrectAns(correctAns + 1);
      } else {
        setScore(score - 1);
      }
      setPreAns((preAns) => [...preAns, ans]);
    }
  };
  
  const handleEndClick = () => {
    if (currentIndex >= quiz.length - 1) {
      setCurrentIndex(0);
      setIsEnd(true);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsDisable(true);
    }
  };
  return isEnd ? (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className=" bg-white h-fit p-11 rounded shadow-2xl shadow-black font-mono text-3xl">
        <h1 className="my-2 ">Total Question : {quiz.length}</h1>
        <h1 className="my-2 ">Correct Answer : {correctAns}</h1>
        <h1 className="my-2 ">Total Score : {score}</h1>
        <h1 className="my-2">Wrong Answer : {quiz.length - correctAns}</h1>
        <button
        className="border border-black text-2xl p-2 mt-5 shadow-lg shadow-black hover:bg-fuchsia-200"
          onClick={() => {
            setIsEnd(false);
            setCurrentIndex(0);
            setCorrectAns(0);
            setScore(0);
            setPreAns([]);
            setIsDisable(true);
          }}
        >
          Restart Quiz
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-r from-violet-500 to-fuchsia-500">
      <div className="  bg-white h-fit p-5 rounded shadow-2xl shadow-black">
        <h1 className="text-3xl text-center font-mono">
          Welcome to the quiz app
        </h1>
        <h2 className="font-mono font-semibold text-center mt-5">
          {quiz[currentIndex].question}
        </h2>
        {quiz[currentIndex].choices.map((ans) => {
          return (
            <button
            className="block list-none text-center mt-5 font-mono py-3 px-11 rounded-lg cursor-pointer hover:bg-fuchsia-200  focus:outline-none focus:ring focus:ring-violet-300"
              onClick={() => {
                handleClick(ans);
              }}
            >
             👉 {ans}
            </button>
          );
        })}

        <button
          className=" text-2xl text-mono p-2 px-11 my-5 shadow-lg shadow-black hover:bg-fuchsia-200"
          type="button"
          onClick={() => {
            handleEndClick();
          }}
          disabled={isDisable}
        >
          {currentIndex > quiz.length - 1 ? "Finish" : "Next"}
        </button>
        <h3>
          (Note:-Fore Every Right answer +2 score is Added and wrong answer -1)
        </h3>
      </div>
    </div>
  );
};
export default Quiz;
