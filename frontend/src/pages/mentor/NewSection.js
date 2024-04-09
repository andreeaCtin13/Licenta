import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/mentor/NewSection.module.css";
import FormNewSection from "../../components/mentor/FormNewSection";
import Button from "../../components/Button";
import FormNewTest from "../../components/mentor/FormNewTest";
import { SectionContext } from "../../context/SectionContext";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useParams } from "react-router";

function NewSection() {
  const { idCourse } = useParams();

  const [newSection, setNewSection] = useState({
    id_curs: idCourse,
  });
  const [newTest, setNewTest] = useState();
  const toast = useRef(null);

  const createSection = async () => {
    if (
      !newSection.hasOwnProperty("id_curs") ||
      !newSection.hasOwnProperty("denumire") ||
      !newSection.hasOwnProperty("descriere") ||
      !newSection.hasOwnProperty("resurse") ||
      !newSection.hasOwnProperty("cerinte") ||
      !newSection.hasOwnProperty("intrebari")
    ) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Nu ai furnizat toate informatiile necesare",
        life: 3000,
      });
      return;
    }
    console.log("CERINTE", newSection.cerinte.length);
    if (newSection.cerinte.length < 1) {
      console.log("intru acilea");
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim o cerinta",
        life: 3000,
      });
      return;
    }

    if (newSection.resurse.length < 1) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi si resursele",
        life: 3000,
      });
      return;
    }
    if (
      !newSection.resurse.filter(
        (resursa) => resursa.tip_resursa === "pdf_path"
      ) === undefined
    ) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim un pdf",
        life: 3000,
      });
      return;
    }
    if (!newSection.resurse.filter((x) => x.tip_resursa === "video_link")) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi un link video",
        life: 3000,
      });
      return;
    }
    if (newSection.intrebari.length < 1) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim o intrebare ",
        life: 3000,
      });
      return;
    }
    // axios
    //   .post(`http://localhost:8080/sectiuni/adaugare`, newSection)
    //   .then((rez) => {
    //     if (rez.message === "successful") {
    //       console.log("s-a realizat treaba");
    //       toast.current.show({
    //         severity: "succes",
    //         summary: "Succesed",
    //         detail: "S-a realizat inserarea",
    //         life: 3000,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     toast.current.show({
    //       severity: "fail",
    //       summary: "Failed",
    //       detail: "Eroare la incarcarea cursurilor",
    //       life: 3000,
    //     });
    //   });
  };
  console.log("AICI:", newSection);
  return (
    <SectionContext.Provider value={{ newSection, setNewSection }}>
      <Toast ref={toast} />

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
              createSection();
            }}
          ></Button>
        </div>
        {/* <div>{newSection}</div> */}
      </div>
    </SectionContext.Provider>
  );
}

export default NewSection;
