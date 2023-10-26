import React, { useContext, useState } from "react";
import style from "../../styles/mentor/FormNewSection.module.css";
import { SectionContext } from "../../context/SectionContext";

function FormNewSection() {
  const [noAssignments, setNoAssignments] = useState(0);
  const assignmentDivs = [];
  const { newSection, setNewSection } = useContext(SectionContext);

  for (let i = 0; i < noAssignments; i++) {
    assignmentDivs.push(
      <div key={i} className={style.formRow}>
        <label>Assignment {i + 1}</label>
        <input
          type="text"
          id={i}
          required
          onChange={(e) => {
            let assig = [...newSection.assigments];
            assig.splice(i, i + 1, e.target.value);
            setNewSection((e) => ({
              ...newSection,
              assigments: assig,
            }));
          }}
        />
      </div>
    );
  }

  return (
    <form className={style.mainForm}>
      <h2>Section details</h2>
      <div className={style.formRow}>
        <label htmlFor="">Title of the section</label>
        <input
          type="text"
          required
          onChange={(e) =>
            setNewSection({
              ...newSection,
              name: e.target.value,
            })
          }
        />
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Description of the section</label>
        <input
          type="text"
          required
          onChange={(e) =>
            setNewSection({
              ...newSection,
              description: e.target.value,
            })
          }
        />
      </div>
      <h2>Resources</h2>
      <div className={style.formRow}>
        <label htmlFor="">Video link</label>
        <input
          type="text"
          required
          onChange={(e) =>
            setNewSection({
              ...newSection,
              videoLink: e.target.value,
            })
          }
        />
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Number of assignments</label>
        <input
          type="number"
          min={0}
          onChange={(e) => {
            setNoAssignments(e.target.value);
            setNewSection({
              ...newSection,
              noAssignments: e.target.value,
            });
          }}
          required
        />
      </div>
      {assignmentDivs}
    </form>
  );
}

export default FormNewSection;
