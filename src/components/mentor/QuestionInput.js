import React, { useContext, useState } from "react";
import style from "../../styles/mentor/QuestionInput.module.css";
import { SectionContext } from "../../context/SectionContext";

function QuestionInput({ index }) {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [question, setQuestion] = useState({
    wrongAnswers: [],
  });
  const updateQuestion = () => {
    let updatedQuestions = [...newSection.questions];
    updatedQuestions.splice(index, index + 1, question);

    setNewSection(() => ({
      ...newSection,
      questions: updatedQuestions,
    }));
  };

  const renderWrongAnswerInputs = () => {
    const wrongAnswerInputs = [];
    for (let j = 0; j < 3; j++) {
      wrongAnswerInputs.push(
        <div key={j} className={style.formRow}>
          <label>Wrong Answer</label>
          <input
            type="text"
            onChange={(e) => {
              let wrongAns = [...question.wrongAnswers];
              wrongAns[j] = e.target.value;
              setQuestion({ ...question, wrongAnswers: wrongAns });
              updateQuestion();
            }}
          />
        </div>
      );
    }
    return wrongAnswerInputs;
  };

  return (
    <div className={style.questionSection}>
      <div key={index} className={style.formRow}>
        <label>Question {index + 1} </label>
        <input
          type="text"
          required
          onChange={(e) => {
            setQuestion({ ...question, requirement: e.target.value });
            updateQuestion();
          }}
        />
      </div>
      <div className={style.formRow}>
        <label>Correct Answer</label>
        <input
          type="text"
          onChange={(e) => {
            setQuestion({ ...question, correctAnswer: e.target.value });
            updateQuestion();
          }}
        />
      </div>
      {renderWrongAnswerInputs()}
    </div>
  );
}

export default QuestionInput;
