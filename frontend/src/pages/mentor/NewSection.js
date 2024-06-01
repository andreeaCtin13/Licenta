import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/mentor/NewSection.module.css";
import FormNewSection from "../../components/mentor/FormNewSection";
import Button from "../../components/Button";
import FormNewTest from "../../components/mentor/FormNewTest";
import { SectionContext } from "../../context/SectionContext";
import axios from "axios";
import { Toast } from "primereact/toast";
import { useParams } from "react-router";
import { FilesContext } from "../../context/FilesContext";
import { useNavigate } from "react-router";

function NewSection() {
  const { idCourse } = useParams();
  const [fileToSend, setFileToSend] = useState();
  const navigate = useNavigate();
  const [newSection, setNewSection] = useState({
    id_curs: Number(idCourse),
  });
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
    if (newSection.cerinte.length < 1) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim o cerinta",
        life: 3000,
      });
      return;
    }

    if (!newSection.resurse.hasOwnProperty("video_link")) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi un link video",
        life: 3000,
      });
      return;
    }

    if (!newSection.resurse.hasOwnProperty("pdfs")) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi macar o resursa pdf",
        life: 3000,
      });
      return;
    }

    if (newSection.files.length < 1) {
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim un pdf",
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
    axios
      .post(`http://localhost:8080/sectiuni/adaugare`, newSection, fileToSend)
      .then((rez) => {
        if (rez.message === "successful") {
          toast.current.show({
            severity: "succes",
            summary: "Succesed",
            detail: "S-a realizat inserarea",
            life: 3000,
          });
        }
        navigate(`/mentor-homepage/${idCourse}`);
      })
      .catch((err) => {
        console.log(err.message);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "Eroare la incarcarea cursurilor",
          life: 3000,
        });
      });
  };
  return (
    <FilesContext.Provider value={{ fileToSend, setFileToSend }}>
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
    </FilesContext.Provider>
  );
}

export default NewSection;
