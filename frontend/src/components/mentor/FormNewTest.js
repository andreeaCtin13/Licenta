import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import QuestionInput from "./QuestionInput";
import style from "../../styles/mentor/FormNewTest.module.css";

function FormNewTest() {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [noOfQuestions, setNoOfQuestions] = useState(1);

  const questions = Array.from({ length: noOfQuestions }, (_, index) => {
    return <QuestionInput key={index} index={index}></QuestionInput>;
  });

  return (
    <div className={style.mainContainer}>
      <h2>Create a test for the new section</h2>
      <form>
        <div className={style.formRow}>
          <label htmlFor="noQuestions">Number of questions</label>
          <input
            id="noQuestions"
            type="number"
            min={1}
            max={80}
            onChange={(e) => {
              setNoOfQuestions(e.target.value);
              setNewSection({
                ...newSection,
                no_of_questions: Number(e.target.value),
              });
            }}
          />
        </div>
        {questions}
      </form>
    </div>
  );
}

export default FormNewTest;
