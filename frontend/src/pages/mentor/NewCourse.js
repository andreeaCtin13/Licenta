import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import style from "../../styles/mentor/NewCourse.module.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";

function NewCourse() {
  const { user } = useContext(UserContext);
  const toast = useRef(null);
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [curs, setCurs] = useState({
    id_utilizator: user.id_utilizator,
    denumire: "",
    descriere: "",
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

  const uploadCurs = async (e) => {
    e.preventDefault();
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
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Curs creat cu succes",
      });
      navigate("/mentor-homepage");
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
      <form onSubmit={uploadCurs}>
        <div className={style.formRow}>
          <label>Title of the course</label>
          <input
            type="text"
            value={curs.denumire}
            onChange={(e) => updateInput(e.target.value, "denumire")}
            required
          />
        </div>
        <div className={style.formRow}>
          <label>Description</label>
          <input
            type="text"
            value={curs.descriere}
            onChange={(e) => updateInput(e.target.value, "descriere")}
            required
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
            type="submit"
            content="CREATE"
            className={`${style.btn} ${style.btnCreate}`}
          />
        </div>
      </form>
    </div>
  );
}

export default NewCourse;
