import React, { useEffect, useState } from "react";
import styles from "./math-problem.module.css";

const GameStatus = {
    CORRECT: "correct",
    INCORRECT: "incorrect",
    READY: "ready",
};

const generateRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
};

function MathProblem() {
    const [n1, setN1] = useState(0);
    const [n2, setN2] = useState(0);
    const [answer, setAnswer] = useState(0);
    const [gameStatus, setGameStatus] = useState(GameStatus.READY);

    const generateProblem = () => {
        setAnswer("");
        setN1(generateRandomNumber());
        setN2(generateRandomNumber());
        setGameStatus(GameStatus.READY);
  };

  const handleSubmit = () => {
        const numberedAnswer = Number(answer);
        if (n1 + n2 === numberedAnswer) {
        setGameStatus(GameStatus.CORRECT);
        } else {
        setGameStatus(GameStatus.INCORRECT);
        }
  };

  const handleAnswerInput = (e) => {
    setAnswer(e.target.value);
  };

  useEffect(() => {
    generateProblem();
  }, []);
  
  // CSS modules를 적용할 수 있도록 className을 수정하세요.
    return (
        <div>
            <div className={styles.problem}>
                <span>{n1}</span>
                <span>+</span>
                <span>{n2}</span>
            </div>

            <hr className={styles.line} />

            <div className={styles.answerSheet}>
                <div className={styles.equal}> = </div>
                <input
                className={styles.answerInput}
                id="answer"
                type="number"
                name="answer"
                value={answer}
                onChange={handleAnswerInput}
                />
                <button className={styles.submitButton} onClick={handleSubmit}>
                제출
                </button>
            </div>

            <div className={styles.result}>
                {gameStatus === GameStatus.CORRECT
                ? "정답입니다"
                : gameStatus === GameStatus.INCORRECT
                ? "오답입니다"
                : ""}
            </div>

            {gameStatus === GameStatus.CORRECT && 
            (
                <div className={styles.buttonController}>
                <button className={styles.generateProblemButton} onClick={generateProblem}>
                    문제 생성
                </button>
                </div>
            )}

            <pre>
                <code>
                    {JSON.stringify(styles, null, 2)}
                </code>
            </pre>
        </div>
    );
}

export default MathProblem;