import React, { useContext, useState } from "react";
import { SectionContext } from "../../context/SectionContext";
import style from "../../styles/mentor/FormNewSection.module.css";
import Button from "../Button";

function FormNewSection() {
  const { newSection, setNewSection } = useContext(SectionContext);
  const [noOfAssigments, setNoOfAssigments] = useState(0);
  const assignmentDivs = [];
  const [files, setFiles] = useState([]);

  console.log(newSection);
  const setAssig = (e, ind) => {
    let assig = newSection.hasOwnProperty("cerinte")
      ? [...newSection.cerinte]
      : [];
    assig.splice(ind, ind + 1, e.target.value);
    setNewSection((e) => ({
      ...newSection,
      cerinte: assig,
    }));
  };

  for (let ind = 0; ind < noOfAssigments; ind++) {
    assignmentDivs.push(
      <div key={ind} className={style.formRow}>
        <label>Assignment {ind + 1}</label>
        <input
          id={ind}
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
    console.log("intru aici", nameOfProperty);
    if (nameOfProperty === "video_link") {
      setNewSection({
        ...newSection,
        resurse: newSection.hasOwnProperty("resurse")
          ? {
              ...newSection.resurse,
              video_link: value,
            }
          : {
              video_link: value,
            },
      });
    } else if (nameOfProperty === "pdf_path") {
    } else {
      setNewSection({
        ...newSection,
        [nameOfProperty]: value,
      });
    }
  };

  console.log(newSection);
  const handleFileChange = (event) => {
    const fileList = event.target.files;
    setFiles([...files, ...fileList]);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
  };

  const handleUpload = () => {
    console.log("Files uploaded:", files);
    setFiles([]);
  };

  console.log(files);

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
