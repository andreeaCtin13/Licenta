import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/FormNewSection.module.css";
import Button from "../Button";
import { FilesContext } from "../../context/FilesContext";

function FormNewSection() {
  const { fileToSend, setFileToSend } = useContext(FilesContext);
  const { newSection, setNewSection } = useContext(SectionContext);
  const [noOfAssigments, setNoOfAssigments] = useState(0);
  const assignmentDivs = [];
  const [files, setFiles] = useState([]);

  const setAssig = (e, ind, field) => {
    const { name, value } = e.target;
    let updatedAssignments = [];
    if (newSection.hasOwnProperty("cerinte")) {
      updatedAssignments = [...newSection.cerinte];
    }
    if (!updatedAssignments[ind]) {
      updatedAssignments[ind] = { titlu_cerinta: "", cerinta: "" };
    }
    updatedAssignments[ind][name] = value;
    setNewSection((prevSection) => ({
      ...prevSection,
      cerinte: updatedAssignments,
    }));
  };
  for (let ind = 0; ind < noOfAssigments; ind++) {
    assignmentDivs.push(
      <div key={ind} className={style.formRow}>
        <h3>Assignment {ind + 1}</h3>
        <label htmlFor={ind + "_titlu_cerinta"}>Titlul cerintei</label>
        <input
          id={ind + "_titlu_cerinta"}
          name="titlu_cerinta"
          type="text"
          required
          onChange={(e) => {
            setAssig(e, ind);
          }}
        />
        <label htmlFor={ind + "_cerinta"}>Cerinta efectiva</label>
        <input
          id={ind + "_cerinta"}
          name="cerinta"
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
    if (nameOfProperty === "video_link") {
      setNewSection({
        ...newSection,
        resurse: {
          ...newSection.resurse,
          video_link: value,
        },
      });
    } else {
      setNewSection({
        ...newSection,
        [nameOfProperty]: value,
      });
    }
  };
  const handleFileChange = (event) => {
    console.log("Handle file change called."); // Verificare dacă funcția este apelată

    const fileList = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < fileList.length; i++) {
      formData.append("file", fileList[i]); // modificare aici
    }
    setFileToSend(formData);
    setFiles([...files, ...fileList]); // actualizare corectă a stării fișierelor

    const updatedPdfs = [];
    formData.getAll("file").forEach((file) => {
      updatedPdfs.push({
        denumire: file.name,
        file_object: file,
      });
    });
    setNewSection({
      ...newSection,
      resurse: {
        ...newSection.resurse,
        pdfs: updatedPdfs,
      },
    });
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1); // eliminarea fișierului din listă
    setFiles(updatedFiles);

    const updatedPdfs = updatedFiles.map((file) => ({
      denumire: file.name,
      file_object: file,
    }));
    setNewSection({
      ...newSection,
      resurse: {
        ...newSection.resurse,
        pdfs: updatedPdfs,
      },
    });
  };

  // În afișarea fișierelor încărcate:
  {
    files.map((file, index) => (
      <div key={index}>
        <span>{file.name}</span>
        <button onClick={() => handleRemoveFile(index)}>Undo</button>
      </div>
    ));
  }

  return (
    <form className={style.mainForm}>
      <h2>Section details</h2>
      <div className={style.formRow}>
        <label htmlFor="denumire">Title of the section</label>
        <input
          id="denumire"
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "denumire")}
        />
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Description of the section</label>
        <input
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "descriere")}
        />
      </div>
      <h2>Resources</h2>
      <div className={style.formRow}>
        <label htmlFor="">Video link</label>
        <input
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "video_link")}
        />
      </div>

      <h2>PDFS</h2>
      <div className={style.formRow}>
        <div>PDFs</div>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
        />
        <div>
          {files.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button onClick={() => handleRemoveFile(index)}>Undo</button>
            </div>
          ))}
        </div>
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
