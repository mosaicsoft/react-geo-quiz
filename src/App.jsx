import { useEffect, useState } from "react";
import data from "./data.json";

export default function App() {
  const [curQus, setCurQus] = useState(0); //current question
  const [ans, setAns] = useState([]); //all answered options
  const [score, setScore] = useState(0); //number of correct answers
  const [isCheck, setIsCheck] = useState(false);
  const [selVal, setSelVal] = useState([]);

  return (
    <div className="container poppins-regular">
      {data.results.map((data, index) => (
        <Quiz
          key={index}
          curQus={curQus}
          setCurQus={setCurQus}
          index={index}
          question={data.question}
          correct_answer={data.correct_answer}
          incorrect_answers={data.incorrect_answers}
          ans={ans}
          setAns={setAns}
          score={score}
          setScore={setScore}
          isCheck={isCheck}
          selVal={selVal}
          setSelVal={setSelVal}
        />
      ))}

      {curQus === data.results.length && (
        <Result
          score={score}
          setCurQus={setCurQus}
          setIsCheck={setIsCheck}
          setAns={setAns}
          setScore={setScore}
          setSelVal={setSelVal}
        />
      )}
    </div>
  );
}

function Quiz({
  index,
  curQus,
  setCurQus,
  question,
  correct_answer,
  incorrect_answers,
  ans,
  setAns,
  score,
  setScore,
  isCheck,
  selVal,
  setSelVal,
}) {
  const options = [...incorrect_answers, correct_answer].sort();

  //const [selVal, setSelVal] = useState(0);

  function handleSubmit(e) {
    e.preventDefault();
    setCurQus(curQus + 1);
    setAns([...ans, selVal[index]]);
    if (!isCheck && selVal[index] === correct_answer) setScore(score + 1);
  }

  function handleRadioChange(val, i) {
    //!isCheck && setSelVal[i](val);
    const newVals = [...selVal];
    newVals[i] = val;
    !isCheck && setSelVal(newVals);
  }

  return (
    <div className={`quiz ${curQus !== index && "hide"}`}>
      <h3>Category : Geography</h3>
      <h5>{index + 1} / 10</h5>
      <h4>
        <div dangerouslySetInnerHTML={{ __html: question }} />
      </h4>

      <form onSubmit={handleSubmit}>
        {options.map((opt, i) => {
          return (
            <div key={opt} className="radio">
              <input
                type="radio"
                id={`r-${index}-${i}`}
                name={`r-${index}`}
                value={opt}
                onChange={() => handleRadioChange(opt, index)}
                required
                disabled={isCheck}
                checked={opt === selVal[index]}
              />
              <label htmlFor={`r-${index}-${i}`}>
                <span dangerouslySetInnerHTML={{ __html: opt }} />

                {isCheck && opt == correct_answer ? (
                  <span className="check">✔️</span>
                ) : (
                  isCheck &&
                  opt === ans[index] && <span className="check">❌</span>
                )}
              </label>
            </div>
          );
        })}
        <button>Next ⏭️</button>
      </form>
    </div>
  );
}

function Result({ score, setCurQus, setIsCheck, setAns, setScore, setSelVal }) {
  return (
    <div className="quiz">
      <h1>{score > 5 ? "Congratulations!" : "Tough Luck!"}</h1>
      <h3>Category : Geography</h3>
      <p className="score">Score : {score} / 10</p>
      <div className="btns">
        <button
          onClick={() => {
            setCurQus(0);
            setIsCheck(false);
            setAns([]);
            setScore(0);
            setSelVal([]);
          }}
        >
          🔃 Try again!
        </button>
        <button
          onClick={() => {
            setCurQus(0);
            setIsCheck(true);
          }}
        >
          ✅ Check Answers
        </button>
      </div>
    </div>
  );
}
