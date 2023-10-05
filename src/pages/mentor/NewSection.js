import React from "react";
import style from "../../styles/mentor/NewSection.module.css";
import FormNewSection from "../../components/mentor/FormNewSection";
import FormNewTest from "../../components/mentor/FormNewTest";
import Button from "../../components/Button";

function NewSection() {
  return (
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
        ></Button>
      </div>
    </div>
  );
}

export default NewSection;
