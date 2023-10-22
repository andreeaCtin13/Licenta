import React, { useContext } from "react";
import style from "../../styles/mentor/QuestionInput.module.css";
import { SectionContext } from "../../context/SectionContext";

function QuestionInput({ index }) {
  const { newSection, setNewSection } = useContext(SectionContext);

  return (
    <div className={style.questionSection}>
      <div key={index} className={style.formRow}>
        <label>Question {index + 1} </label>
        <input type="text" required onClick={(e) => {}} />
      </div>
      <div className={style.formRow}>
        <label>Correct Answer</label>
        <input type="text" onClick={(e) => {}} />
      </div>
      {() => {
        for (let j = 0; j < 3; j++) {
          return (
            <div className={style.formRow}>
              <label>Wrong Answer</label>
              <input id={j} type="text" onClick={(e) => {}} />
            </div>
          );
        }
      }}
    </div>
  );
}

export default QuestionInput;
