import React from "react";
import style from "../../styles/mentor/NewSection.module.css";
import FormNewSection from "../../components/mentor/FormNewSection";
import FormNewTest from "../../components/mentor/FormNewTest";

function NewSection() {
  return (
    <div className={style.mainContainer}>
      <h1>Hi, create a new section!</h1>
      <FormNewSection></FormNewSection>
      <FormNewTest></FormNewTest>
      <div>
        <button>Back</button>
        <button>Create</button>
      </div>
    </div>
  );
}

export default NewSection;
