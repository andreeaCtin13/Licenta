import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/QuestionInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

function QuestionInput({ index }) {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [newQuestion, setNewQuestion] = useState({
    wrongAnswers: [],
  });
  const [inputs, setInputs] = useState([
    { id: 0, value: "", checkboxName: "checkbox0" },
  ]);

  const handleAddInput = () => {
    const newId = inputs.length;
    setInputs([
      ...inputs,
      { id: newId, value: "", checkboxName: `checkbox${newId}` },
    ]);
  };

  const handleChangeChecked = (event, id) => {
    const { name, checked } = event.target;
    setInputs(
      inputs.map((input) =>
        input.id === id ? { ...input, [name]: checked } : input
      )
    );
  };

  const handleChange = (id, value) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    });
    setInputs(updatedInputs);
  };

  const updateQuestion = () => {
    let updatedQuestions = newSection.hasOwnProperty("intrebari")
      ? [...newSection.intrebari]
      : [];
    updatedQuestions.splice(index, index + 1, newQuestion);
    setNewSection(() => ({
      ...newSection,
      intrebari: updatedQuestions,
    }));
  };

  const handleRemoveInput = (id) => {
    const updatedInputs = inputs.filter((input) => input.id !== id);
    setInputs(updatedInputs);
  };

  return (
    <div className={style.questionSection}>
      <div key={index} className={style.formRow}>
        <label>Question {index + 1}.</label>
        <input
          className={style.inputIntrebare}
          type="text"
          required
          onChange={(e) => {
            setNewQuestion({ ...newQuestion, requirement: e.target.value });
            updateQuestion();
          }}
        />
      </div>
      <div className={style.intro}>Please check the correct answers</div>
      {inputs.map((input) => (
        <div key={input.id} className={style.variantaContainer}>
          <input
            className={style.inputVarianta}
            type="text"
            value={input.value}
            onChange={(e) => handleChange(input.id, e.target.value)}
          />
          <input
            className={style.check}
            type="checkbox"
            name={input.checkboxName}
            checked={input[input.checkboxName] || false}
            onChange={(e) => handleChangeChecked(e, input.id)}
          />
          <FontAwesomeIcon
            className={style.iconX}
            icon={faTimes}
            onClick={() => handleRemoveInput(input.id)}
          />
        </div>
      ))}
      <FontAwesomeIcon onClick={handleAddInput} icon={faPlus} />
    </div>
  );
}

export default QuestionInput;
