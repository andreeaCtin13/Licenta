import React, { useContext, useState } from "react";
import style from "../../styles/mentor/FormNewTest.module.css";
import QuestionInput from "./QuestionInput";
import { SectionContext } from "../../context/SectionContext";

function FormNewTest() {
  const [noOfQuestion, setNoOfQuestion] = useState(1);
  const { newSection, setNewSection } = useContext(SectionContext);

  const questions = Array.from({ length: noOfQuestion }, (_, index) => {
    return <QuestionInput index={index}></QuestionInput>;
  });

  return (
    <div className={style.mainContainer}>
      <h2>Create a test</h2>
      <form action="">
        <div className={style.formRow}>
          <label htmlFor="">Number of question</label>
          <input
            type="number"
            min={1}
            max={100}
            onChange={(e) => {
              setNoOfQuestion(e.target.value);
              setNewSection({
                ...newSection,
                no_of_questions: e.target.value,
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
