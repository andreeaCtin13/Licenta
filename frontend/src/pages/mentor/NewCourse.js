import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import style from "../../styles/mentor/NewCourse.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";

function NewCourse() {
  const { user, setUser } = useContext(UserContext);
  const toast = useRef(null);
  const fileUploadRefs = useRef({});
  const [imageFile, setImageFile] = useState(null);
  const [curs, setCurs] = useState({
    id_utilizator: user.id_utilizator,
  });

  const updateInput = (value, nameOfProperty) => {
    setCurs({
      ...curs,
      [nameOfProperty]: value,
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadCurs = async () => {
    const formData = new FormData();
    formData.append("denumire", curs.denumire);
    formData.append("descriere", curs.descriere);
    formData.append("id_utilizator", curs.id_utilizator);
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await axios.post("http://localhost:8080/curs/adaugare", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Course inserted successfully");
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Course created successfully",
      });
    } catch (err) {
      console.log("Error occurred while inserting course", err);
      toast.current.show({
        severity: "error",
        summary: "Failed",
        detail: "Course creation failed",
      });
    }
  };

  return (
    <div className={style.mainContainer}>
      <Toast ref={toast} />
      <h1>Create a new course</h1>
      <form>
        <div className={style.formRow}>
          <label>Title of the course</label>
          <input
            type="text"
            onChange={(e) => updateInput(e.target.value, "denumire")}
          />
        </div>
        <div className={style.formRow}>
          <label>Description</label>
          <input
            type="text"
            onChange={(e) => updateInput(e.target.value, "descriere")}
          />
        </div>
        <div className={style.formRow}>
          <label>Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        <div className={style.sectionBtns}>
          <Link to="/mentor-homepage" className={style.link}>
            <Button
              className={`${style.btn} ${style.btnCancel}`}
              content="CANCEL"
            />
          </Link>
          <Button
            content="CREATE"
            onClick={uploadCurs}
            className={`${style.btn} ${style.btnCreate}`}
          />
        </div>
      </form>
    </div>
  );
}

export default NewCourse;
