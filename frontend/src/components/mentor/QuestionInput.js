import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/QuestionInput.module.css";

function QuestionInput({ index }) {
  const indx = index;
  const { newSection, setNewSection } = useContext(SectionContext);
  const [newQuestion, setNewQuestion] = useState({
    wrongAnswers: [],
  });
  const renderWrongAnswersInputs = () => {
    const wrongAnswerInputs = [];
    for (let jindx = 0; jindx < 3; jindx++) {
      wrongAnswerInputs.push(
        <div key={jindx} className={style.formRow}>
          <label>Wrong Answer</label>
          <input
            type="text"
            onChange={(e) => {
              let newWrongAnswer = [...newQuestion.wrongAnswers];
              newWrongAnswer[jindx] = e.target.value;
              setNewQuestion({ ...newQuestion, wrongAnswers: newWrongAnswer });
              updateQuestion();
            }}
          />
        </div>
      );
    }
    return wrongAnswerInputs;
  };

  const updateQuestion = () => {
    let updatedQuestions = [...newSection.questions];
    updatedQuestions.splice(indx, indx + 1, newQuestion);
    setNewSection(() => ({
      ...newSection,
      questions: updatedQuestions,
    }));
  };

  return (
    <div className={style.questionSection}>
      <div key={indx} className={style.formRow}>
        <label>Question {indx + 1} </label>
        <input
          type="text"
          required
          onChange={(e) => {
            setNewQuestion({ ...newQuestion, requirement: e.target.value });
            updateQuestion();
          }}
        />
      </div>
      <div className={style.formRow}>
        <label>Correct Answer</label>
        <input
          type="text"
          onChange={(e) => {
            setNewQuestion({ ...newQuestion, correctAnswer: e.target.value });
            updateQuestion();
          }}
        />
      </div>
      {renderWrongAnswersInputs()}
    </div>
  );
}

export default QuestionInput;
