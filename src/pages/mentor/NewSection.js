import React, { useState } from "react";
import style from "../../styles/mentor/NewSection.module.css";
import FormNewSection from "../../components/mentor/FormNewSection";
import Button from "../../components/Button";
import FormNewTest from "../../components/mentor/FormNewTest";
import { SectionContext } from "../../context/SectionContext";

function NewSection() {
  const [newSection, setNewSection] = useState({
    assigments: [],
  });

  return (
    <SectionContext.Provider value={{ newSection, setNewSection }}>
      <div className={style.mainContainer}>
        <h1>Hi, create a new section!</h1>
        <div className={style.formsContainer}>
          <FormNewSection></FormNewSection>
          <FormNewTest></FormNewTest>
        </div>
        <div className={style.btnSection}>
          <Button
            className={`${style.btn} ${style.btnCancel}`}
            content={"Back"}
          ></Button>
          <Button
            className={`${style.btn} ${style.btnCreate}`}
            content={"Create"}
            onClick={() => {
              console.log(newSection);
            }}
          ></Button>
        </div>
        {/* <div>{newSection}</div> */}
      </div>
    </SectionContext.Provider>
  );
}

export default NewSection;
