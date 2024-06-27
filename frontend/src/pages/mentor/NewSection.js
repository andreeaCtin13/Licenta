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
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse
} from "@fortawesome/free-solid-svg-icons";

function NewSection() {
  const { idCourse } = useParams();
  const [fileToSend, setFileToSend] = useState();
  const navigate = useNavigate();
  const [newSection, setNewSection] = useState({
    id_curs: Number(idCourse),
    denumire: "",
    descriere: "",
    resurse: { video_link: "", pdfs: [] },
    cerinte: [],
    intrebari: [],
    punctaj_minim: 0,
  });
  const toast = useRef(null);

  const createSection = async () => {


    if (
      !newSection.id_curs ||
      !newSection.denumire ||
      !newSection.descriere ||
      !newSection.resurse ||
      !newSection.cerinte ||
      !newSection.intrebari ||
      newSection.punctaj_minim === undefined
    ) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Nu ai furnizat toate informatiile necesare",
        life: 3000,
      });
      return;
    }


    if (newSection.cerinte.length < 1) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim o cerinta",
        life: 3000,
      });
      return;
    }

    if (!newSection.video_link) {
      toast.current.show({
        severity: "error", 
        summary: "Failed",
        detail: "Trebuie sa incluzi un link video",
        life: 3000,
      });
      return;
    }

    if (newSection.intrebari.length < 1) {
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Trebuie sa incluzi minim o intrebare",
        life: 3000,
      });
      return;
    }

    const totalScore = newSection.intrebari?.reduce((acc, intrebare) => {
      return acc + Number(intrebare.punctaj_intrebare);
    }, 0);

    if (newSection.punctaj_minim_promovare > totalScore) {
      console.log("INTRU AICI BRO")
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail:
          "Punctajul minim de promovare trebuie sa fie cel putin egal cu suma punctajelor intrebarilor",
        life: 3000,
      });
      return;
    }


 const formData = new FormData();
    fileToSend.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('sectionData', JSON.stringify(newSection));

  

    await axios
      .post(`http://localhost:8080/sectiuni/adaugare`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      .then((rez) => {
        if (rez.message === "successful") {
          toast.current.show({
            severity: "success",
            summary: "Succes",
            detail: "S-a realizat inserarea",
            life: 3000,
          });
        }
        navigate(`/mentor-homepage/${idCourse}`);
      })
      .catch((err) => {
        console.log(err.message);
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Eroare la incarcarea sectiunii",
          life: 3000,
        });
      });
  };

  return (
    <FilesContext.Provider value={{ fileToSend, setFileToSend }}>
      <SectionContext.Provider value={{ newSection, setNewSection }}>
        <Toast ref={toast} />
        <Link to={`/mentor-homepage`}>
        <Button
          className={`${style.btn} ${style.btnHome}`}
          content={<FontAwesomeIcon icon={faHouse} />}
        ></Button>
      </Link>

        <div className={style.mainContainer}>
          <h1>Salut, crează o nouă secțiune!</h1>
          <div className={style.formsContainer}>
            <FormNewSection />
            <FormNewTest />
          </div>
          <div className={style.btnSection}>
            <Button
              className={`${style.btn} ${style.btnCancel}`}
              content={"Back"}
              onClick={() => navigate(`/mentor-homepage/${idCourse}`)}
            />
            <Button
              className={`${style.btn} ${style.btnCreate}`}
              content={"Create"}
              onClick={createSection}
            />
          </div>
        </div>
      </SectionContext.Provider>
    </FilesContext.Provider>
  );
}

export default NewSection;
