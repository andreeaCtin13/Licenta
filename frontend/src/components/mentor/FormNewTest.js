import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import QuestionInput from "./QuestionInput";
import style from "../../styles/mentor/FormNewTest.module.css";

function FormNewTest() {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [noOfQuestions, setNoOfQuestions] = useState(1);

  const questions = Array.from({ length: noOfQuestions }, (_, index) => {
    return <QuestionInput key={index} index={index} />;
  });

  const handleNumberOfQuestionsChange = (e) => {
    const newValue = Number(e.target.value);
    setNoOfQuestions(newValue);
    setNewSection({
      ...newSection,
      no_of_questions: newValue,
    });
  };

  const handlePunctajMinimPromovareChange = (e) => {
    const newValue = Number(e.target.value);
    setNewSection({
      ...newSection,
      punctaj_minim_promovare: newValue, // Schimbat în punctaj_minim pentru a corespunde cheii din newSection
    });
  };

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
            value={noOfQuestions}
            onChange={handleNumberOfQuestionsChange}
          />
        </div>
        <div className={style.formRow}>
          <label htmlFor="punctaj_minim_promovare">Punctaj minim promovare</label>
          <input
            id="punctaj_minim_promovare"
            type="number"
            min={1}
            max={100000}
            value={newSection.punctaj_minim_promovare || ""}
            onChange={handlePunctajMinimPromovareChange}
          />
        </div>
        {questions}
      </form>
    </div>
  );
}

export default FormNewTest;
