import React, { useState } from "react";
import style from "../../styles/mentor/FormNewTest.module.css";

function FormNewTest() {
  const [noOfQuestion, setNoOfQuestion] = useState(1);

  const questionInputs = [];

  for (let i = 0; i < noOfQuestion; i++) {
    questionInputs.push(
      <div className={style.questionSection}>
        <div key={i} className={style.formRow}>
          <label>Question {i + 1} </label>
          <input type="text" required />
        </div>
        <div className={style.formRow}>
          <label htmlFor="">Correct Answer</label>
          <input type="text" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="">Wrong Answer</label>
          <input type="text" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="">Wrong Answer</label>
          <input type="text" />
        </div>
        <div className={style.formRow}>
          <label htmlFor="">Wrong Answer</label>
          <input type="text" />
        </div>
      </div>
    );
  }
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
            }}
          />
        </div>
        {questionInputs}
      </form>
    </div>
  );
}

export default FormNewTest;
