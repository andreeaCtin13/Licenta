import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/FormNewSection.module.css";

function FormNewSection() {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [noOfAssigments, setNoOfAssigments] = useState(0);
  const assignmentDivs = [];

  const setAssig = (e, ind) => {
    let assig = [...newSection.assigments];
    assig.splice(ind, ind + 1, e.target.value);
    setNewSection((e) => ({
      ...newSection,
      assigments: assig,
    }));
  };

  for (let ind = 0; ind < noOfAssigments; ind++) {
    assignmentDivs.push(
      <div key={ind} className={style.formRow}>
        <label>Assignment {ind + 1}</label>
        <input
          id={ind}
          type="text"
          required
          onChange={(e) => {
            setAssig(e, ind);
          }}
        />
      </div>
    );
  }

  const updateInput = (value, nameOfProperty) => {
    setNewSection({
      ...newSection,
      [nameOfProperty]: value,
    });
  };

  console.log(newSection);
  return (
    <form className={style.mainForm}>
      <h2>Section details</h2>
      <div className={style.formRow}>
        <label htmlFor="titleSection">Title of the section</label>
        <input
          id="titleSection"
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "name")}
        />
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Description of the section</label>
        <input
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "description")}
        />
      </div>
      <h2>Resources</h2>
      <div className={style.formRow}>
        <label htmlFor="">Video link</label>
        <input
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "videoLink")}
        />
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Number of assignments</label>
        <input
          type="number"
          min={0}
          onChange={(e) => {
            setNoOfAssigments(e.target.value);
            updateInput(e.target.value, "noOfAssigments");
          }}
          required
        />
      </div>
      {assignmentDivs}
    </form>
  );
}

export default FormNewSection;
