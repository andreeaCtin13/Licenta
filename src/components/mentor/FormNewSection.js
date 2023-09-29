import React, { useState } from "react";
import style from "../../styles/mentor/FormNewSection.module.css";

function FormNewSection() {
  const [noAssigments, setNoAssigments] = useState(0);
  const assignmentDivs = [];

  for (let i = 0; i < noAssigments; i++) {
    assignmentDivs.push(
      <div key={i}>
        <label>Assignment {i + 1}</label>
        <input type="text" required />
      </div>
    );
  }

  return (
    <form className={style.mainForm}>
      <h2>Section details</h2>
      <div>
        <label htmlFor="">Title of the section</label>
        <input type="text" required />
      </div>
      <div>
        <label htmlFor="">Description of the section</label>
        <input type="text" required />
      </div>
      <h2>Resources</h2>
      <div>
        <label htmlFor="">Video link</label>
        <input type="text" required />
      </div>
      <div>
        <label htmlFor="">Number of assigments</label>
        <input
          type="number"
          min={0}
          onChange={(e) => {
            setNoAssigments(e.target.value);
          }}
          required
        />
      </div>
      {assignmentDivs}
    </form>
  );
}

export default FormNewSection;
