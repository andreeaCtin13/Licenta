import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/FormNewSection.module.css";
import Button from "../Button";
import { FilesContext } from "../../context/FilesContext";
import { FileUpload } from "primereact/fileupload";

function FormNewSection() {
  const { fileToSend, setFileToSend } = useContext(FilesContext);
  const { newSection, setNewSection } = useContext(SectionContext);
  const [noOfAssigments, setNoOfAssigments] = useState(0);
  const assignmentDivs = [];
  const [files, setFiles] = useState([]);

  const setAssig = (e, ind) => {
    const { name, value } = e.target;
    let updatedAssignments = newSection.cerinte ? [...newSection.cerinte] : [];
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
          onChange={(e) => setAssig(e, ind)}
        />
        <label htmlFor={ind + "_cerinta"}>Cerinta efectiva</label>
        <input
          id={ind + "_cerinta"}
          name="cerinta"
          type="text"
          required
          onChange={(e) => setAssig(e, ind)}
        />
      </div>
    );
  }

  const updateInput = (value, nameOfProperty) => {
    setNewSection((prevSection) => ({
      ...prevSection,
      [nameOfProperty]: value,
    }));
  };

  const handleFileChange = (event) => {
    const fileList = event.target.files;
    const updatedFiles = [...files, ...fileList];
    setFiles(updatedFiles);
    setFileToSend(updatedFiles);

    const updatedPdfs = updatedFiles.map((file) => ({
      denumire: file.name,
      file_object: file,
    }));

    setNewSection((prevSection) => ({
      ...prevSection,
      resurse: {
        ...prevSection.resurse,
        pdfs: updatedPdfs,
      },
    }));
  }

  // const handleRemoveFile = (index) => {
  //   const updatedFiles = [...files];
  //   updatedFiles.splice(index, 1);
  //   setFiles(updatedFiles);
  //   setFileToSend(updatedFiles);

  //   const updatedPdfs = updatedFiles.map((file) => ({
  //     denumire: file.name,
  //     file_object: file,
  //   }));

  //   setNewSection((prevSection) => ({
  //     ...prevSection,
  //     resurse: {
  //       ...prevSection.resurse,
  //       pdfs: updatedPdfs,
  //     },
  //   }));
  // };

  //file shit 

  const handleFileUpload = (event) => {
    const uploadedFiles = event.files;
    const updatedFiles = [...files, ...uploadedFiles];
    setFiles(updatedFiles);
    setFileToSend(updatedFiles);

    const updatedPdfs = updatedFiles.map((file) => ({
      denumire: file.name,
      file_object: file,
    }));

    setNewSection((prevSection) => ({
      ...prevSection,
      resurse: {
        ...prevSection.resurse,
        pdfs: updatedPdfs,
      },
    }));
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    setFileToSend(updatedFiles);

    const updatedPdfs = updatedFiles.map((file) => ({
      denumire: file.name,
      file_object: file,
    }));

    setNewSection((prevSection) => ({
      ...prevSection,
      resurse: {
        ...prevSection.resurse,
        pdfs: updatedPdfs,
      },
    }));
  };

  return (
    <form className={style.mainForm}>
      <h2>Section details</h2>
      <div className={style.formRow}>
        <label htmlFor="denumire">Titlul secțiunii</label>
        <input
          id="denumire"
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "denumire")}
        />
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Descrierea secțiunii</label>
        <input
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "descriere")}
        />
      </div>
      <h2>Resources</h2>
      <div className={style.formRow}>
        <label htmlFor="">Link video</label>
        <input
          type="text"
          required
          onChange={(e) => updateInput(e.target.value, "video_link")}
        />
      </div>
      <h2>PDF-uri</h2>
      <div className={style.formRow}>
        <div>PDF-uri</div>
        <FileUpload
          mode="basic"
          accept="application/pdf"
          multiple
          maxFileSize={10000000}
          onSelect={handleFileUpload}
        />
        <div>
          {files.map((file, index) => (
            <div key={index}>
              <span>{file.name}</span>
              <button type="button" onClick={() => handleRemoveFile(index)}>
                Șterge
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={style.formRow}>
        <label htmlFor="">Numărul de cerințe</label>
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
