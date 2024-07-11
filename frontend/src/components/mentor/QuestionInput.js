import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/QuestionInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPlus } from "@fortawesome/free-solid-svg-icons";

function QuestionInput({ index }) {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [newQuestion, setNewQuestion] = useState({
    variante_de_raspuns: [],
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
    const { checked } = event.target;

    setInputs(
      inputs.map((input) => (input.id === id ? { ...input, checked } : input))
    );

    const updatedVarianteRaspuns = newQuestion.variante_de_raspuns.map(
      (varianta, index) => {
        if (index === id) {
          return { ...varianta, value: inputs[index].value, checked };
        }
        return varianta;
      }
    );
    setNewQuestion({
      ...newQuestion,
      variante_de_raspuns: updatedVarianteRaspuns,
    });

    let updatedQuestions = newSection.hasOwnProperty("intrebari")
      ? [...newSection.intrebari]
      : [];

    const checkboxValues = inputs.map((input, idx) => ({
      text_varianta: input.value,
      este_corecta: idx === id ? checked : input.checked || false,
    }));

    updatedQuestions.splice(index, index + 1, {
      ...newQuestion,
      variante_de_raspuns: checkboxValues,
    });
    setNewSection(() => ({
      ...newSection,
      intrebari: updatedQuestions,
    }));
  };

  const handleChange = (id, value) => {
    const updatedInputs = inputs.map((input) => {
      if (input.id === id) {
        return { ...input, value };
      }
      return input;
    });
    setInputs(updatedInputs);

    const updatedVarianteRaspuns = newQuestion.variante_de_raspuns.map(
      (varianta, index) => {
        if (index === id) {
          return { ...varianta, value };
        }
        return varianta;
      }
    );
    setNewQuestion({
      ...newQuestion,
      variante_de_raspuns: updatedVarianteRaspuns,
    });
  };

  const updateQuestion = () => {
    let updatedQuestions = newSection.hasOwnProperty("intrebari")
      ? [...newSection.intrebari]
      : [];

    // Creăm un array cu valorile checkbox-urilor și inputurilor
    const checkboxValues = inputs.map((input, idx) => ({
      value: input.value,
      checked: input.checked || false,
    }));

    updatedQuestions.splice(index, index + 1, {
      ...newQuestion,
      variante_de_raspuns: checkboxValues,
    });
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
        <label>Întrebarea {index + 1}.</label>
        <input
          className={style.inputIntrebare}
          type="text"
          required
          onChange={(e) => {
            setNewQuestion({
              ...newQuestion,
              requirement: e.target.value,
            });
            updateQuestion();
          }}
          onBlur={(e) => {
            setNewQuestion({
              ...newQuestion,
              requirement: e.target.value,
            });
            updateQuestion();
          }}
        />
      </div>
      <div>
        <label>Punctaj intrebare</label>
        <input
          type="number"
          min={1}
          required
          onChange={(e) => {
            setNewQuestion({
              ...newQuestion,
              punctaj_intrebare: Number(e.target.value),
            });
            updateQuestion();
          }}
          onBlur={(e) => {
            setNewQuestion({
              ...newQuestion,
              punctaj_intrebare: Number(e.target.value),
            });
            updateQuestion();
          }}
        />
      </div>

      <div className={style.intro}>Please check the correct answers</div>
      {inputs.map((input, idx) => (
        <div key={input.id} className={style.variantaContainer}>
          <input
            className={style.inputVarianta}
            type="text"
            value={input.value}
            onChange={(e) => handleChange(input.id, e.target.value)}
            onBlur={(e) => handleChange(input.id, e.target.value)}
          />
          <input
            className={style.check}
            type="checkbox"
            checked={input.checked || false}
            onChange={(e) => handleChangeChecked(e, input.id)}
            onBlur={(e) => handleChangeChecked(e, input.id)}
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
