import React, { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useParams } from "react-router";
import style from "../../styles/mentor/CourseStatus.module.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faTrash,
  faArrowLeft,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { Accordion, AccordionTab } from "primereact/accordion";
import Button from "../../components/Button";
import axios from "axios";
import { Toast } from "primereact/toast";
import { FileUpload } from "primereact/fileupload";
import { Dialog } from "primereact/dialog";

function CourseStatus() {
  const { user, setUser } = useContext(UserContext);
  const { idCourse } = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const [sectiuni, setSectiuni] = useState([]);
  const toast = useRef(null);
  const [curs, setCurs] = useState({});
  const fileUploadRefs = useRef({});
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [sectiuneToDelete, setSectiuneToDelete] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentSectionToEdit, setCurrentSectionToEdit] = useState(null);
  const [editSectionData, setEditSectionData] = useState(false);
  const [editModal2Visible, setEditModal2Visible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newAssignmentData, setNewAssignmentData] = useState({
    titlu: "",
    cerinta: "",
  });

  const getCurs = async () => {
    await axios
      .get(`http://localhost:8080/curs/getById/${idCourse}`)
      .then((rez) => {
        setCurs(rez.data.curs);
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "fail",
          summary: "Failed",
          detail: "Eroare la încărcarea cursului",
          life: 3000,
        });
      });
  };

  const getAllSectiuni = async () => {
    try {
      const { data: { sectiuni } } = await axios.get(`http://localhost:8080/sectiuni/selectAll/${idCourse}`);
  
      const sectiuniCuTeste = await Promise.all(sectiuni.map(async (sectiune) => {
        const resurse = await axios.get(`http://localhost:8080/resurse/getResurseCursSection/${sectiune.id_sectiune}`);
        const cerinte = await axios.get(`http://localhost:8080/cerinte/getAllCerinte/${sectiune.id_sectiune}`);
  
        const testForSection = await axios.get(`http://localhost:8080/teste/getTestIds/${sectiune.id_sectiune}`);
  
        return {
          ...sectiune,
          resurse: resurse.data.resurse,
          cerinte: cerinte.data.cerinte,
          id_test: testForSection.data.test[0].id_test
        };
      }));
  
      setSectiuni(sectiuniCuTeste);
    } catch (err) {
      console.log(err);
      toast.current.show({
        severity: "fail",
        summary: "Failed",
        detail: "Eroare la încărcarea secțiunilor",
        life: 3000,
      });
    }
  };
  
  

  useEffect(() => {
    getAllSectiuni();
    getCurs();
  }, []);

  const openAddModal = () => {
    setNewAssignmentData({ titlu: "", cerinta: "" });
    setAddModalVisible(true);
  };

  const closeAddModal = () => {
    setAddModalVisible(false);
  };

  const handleAddAssignment = async() => {
    await axios.post(`http://localhost:8080/cerinte/insert`, {...newAssignmentData, id_sectiune:sectiuneToDelete}).then((rez)=>{
      getAllSectiuni()
    }).catch(
      err=>console.log(err)
    )

    closeAddModal();
  };

  const uploadFile = async (file, id) => {
    let formData = new FormData();
    formData.append("tip_resursa", "pdf_path");
    formData.append("id_sectiune", id);
    formData.append("files", file);


    await axios
      .post(`http://localhost:8080/resurse/insert`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        toast.current.show({
          severity: "info",
          summary: "Success",
          detail: "File Uploaded",
        });
        getAllSectiuni();
        fileUploadRefs.current[id].clear();
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "File upload failed",
        });
      });
  };

  const onUpload = ({ files }, id) => {
    const [file] = files;
    uploadFile(file, id);
  };

  const deleteResource = async (resourceId) => {
    await axios
      .delete(`http://localhost:8080/resurse/delete/${resourceId}`)
      .then(() => {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Resource deleted successfully",
        });
        getAllSectiuni();
      })
      .catch((err) => {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Failed to delete resource",
        });
      });
  };

  const handleDelete = async (id_cerinta) => {
    try {
      await axios.delete(`http://localhost:8080/cerinte/delete/${id_cerinta}`);
      await getAllSectiuni();
    } catch (err) {
      console.log(err);
    }
  };
  
  const deleteSectiune = async () => {
    if (sectiuneToDelete) {
      try {
        await axios.delete(`http://localhost:8080/sectiuni/deleteSectiuneOverall/${sectiuneToDelete.id_sectiune}`);
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Secțiune deleted successfully",
        });
        setDeleteConfirmationVisible(false);
        await getAllSectiuni();
      } catch (err) {
        console.log(err);
        toast.current.show({
          severity: "error",
          summary: "Failed",
          detail: "Failed to delete secțiune",
        });
        setDeleteConfirmationVisible(false);
      }
    }
  };
  
  const updateSection = async () => {
    if (currentSectionToEdit) {
      await axios
        .put(`http://localhost:8080/sectiuni/update/${currentSectionToEdit.id_sectiune}`, {
          ...editSectionData
        })
        .then(async () => {
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Secțiune updated successfully",
          });
          setEditModalVisible(false);
          await getAllSectiuni();
        })
        .catch((err) => {
          console.log(err);
          toast.current.show({
            severity: "error",
            summary: "Failed",
            detail: "Failed to update secțiune",
          });
        });
    }
  };
  

  const openEditModal = (sectiune) => {
    setCurrentSectionToEdit(sectiune);
    setEditSectionData({
      denumire: sectiune.denumire,
      descriere: sectiune.descriere,
    });
    setEditModalVisible(true);
  };

  const openEditModal2 = (sectiune) => {
    setCurrentSectionToEdit(sectiune);
    setEditSectionData({
      video_link: sectiune.resurse.find((x) => x.tip_resursa === "video_link")?.link_resursa || ""
    });
    setEditModal2Visible(true);
  };
  


  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        getAllSectiuni(),
        getCurs()
      ]);
    };
  
    fetchData();
  }, []);
  

  return (
    <div className={style.mainContainer}>
      <Link to={`/mentor-homepage`}>
        <Button
          className={style.btnBack}
          content={<FontAwesomeIcon icon={faArrowLeft} />}
        />
      </Link>
      <Toast ref={toast} />
      <h1>{curs.denumire}</h1>
      <div className={style.flexingContainer}>
      
      <Accordion activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} className={style.accordionContainer}>
        {sectiuni.map((sectiune, i) => {
          return (
            <AccordionTab header={sectiune.denumire} key={i}>
              <div>
                <h2>Numele secțiunii - {sectiune.denumire}</h2>
                <div>
                  Descrierea secțiunii - {sectiune.descriere}
                  <button
                    className={style.iconBtn}
                    onClick={() => openEditModal(sectiune)}
                  >
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
              </div>
              <div>
                <h3>Resursa video </h3>
                <div>
                  <Link to={sectiune.resurse.linkVideo} className={style.link}>
                    {
                      sectiune.resurse.find(
                        (x) => x.tip_resursa === "video_link"
                      )?.titlu_resursa
                    }
                  </Link>
                  <button
                    className={style.iconBtn}
                    onClick={() => openEditModal2(sectiune)}
                  >
                    <FontAwesomeIcon icon={faPencil} className={style.icon} />
                  </button>
                </div>
                <div className={style.rowPDFS}>
                  <h3>Resursele Document:</h3>

                  <FileUpload
                    ref={(el) =>
                      (fileUploadRefs.current[sectiune.id_sectiune] = el)
                    }
                    mode="basic"
                    name="demo[]"
                    accept="application/pdf"
                    customUpload={true}
                    uploadHandler={(e) => onUpload(e, sectiune.id_sectiune)}
                    auto
                    chooseLabel={"Adaugă"}
                  />
                </div>

                <div>
                  {sectiune.resurse
                    .filter((x) => x.tip_resursa === "pdf_path")
                    .map((pdf) => {
                      return (
                        <div key={pdf.id_resursa}>
                          <a
                            href={`http://localhost:8080/resurse/download/${pdf.id_resursa}`}
                            className={style.link}
                          >
                            {pdf.titlu_resursa}
                          </a>
                          <button
                            className={style.iconBtn}
                            onClick={() => deleteResource(pdf.id_resursa)}
                          >
                            <FontAwesomeIcon
                              className={style.faTrash}
                              icon={faTrash}
                            />
                          </button>
                        </div>
                      );
                    })}
                </div>
                <div>
                  <div className={style.flexez}>
                    <h3>Lista de cerințe</h3>
                    <FontAwesomeIcon icon={faPlus} className={style.icon}  onClick={()=>{openAddModal()
                      setSectiuneToDelete(sectiune.id_sectiune)
                    }}
                    />
                  </div>
                  <div>
                    {sectiune.cerinte.map((assignment) => {
                      return (
                        <div

                          key={assignment.id_cerinta}
                          className={style.assignment}
                        >
                           <h4>Titlul cerinței - {assignment.titlu}</h4>
                        <div className={style.requirementRow}>
                            <div>Cerința - {assignment.cerinta}</div>
                            <div>
                                <FontAwesomeIcon
                                    icon={faTrash}
                                    className={style.deleteIcon}
                                    onClick={() => handleDelete(assignment.id_cerinta)}
                                />
                            </div>
                        </div>
                        </div>
                      );
                    })}
                  </div>

                </div>
                <Link to={`/edit-test/${idCourse}/${sectiune.id_test}`}>
                  <Button
                    content={"Editează testul"}
                    className={`${style.btn} ${style.btnEditTest}`}
                  />
                </Link>
                <Button
                  content={<FontAwesomeIcon icon={faTrash} className={style.icon} />}
                  className={`${style.btn} ${style.btnDeleteSection}`}
                  onClick={() => {
                    setSectiuneToDelete(sectiune);
                    setDeleteConfirmationVisible(true);
                  }}
                />
              </div>
            </AccordionTab>
          );
        })}
      </Accordion>
      <div className={style.flexing}>
      <div className={style.buttonZone}>
        <div>
          <Link to={`/new-section/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="Crează o nouă secțiune"
            />
          </Link>
        </div>
        <div>
          <Link to={`/feedback/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="Acordă direcții soluții"
            />
          </Link>
        </div>
        <div>
          <Link to={`/requests/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="Gestionează cereri"
            />
          </Link>
        </div>
        <div>
          <Link to={`/performanta/${idCourse}`}>
            <Button
              className={style.btnCreateSection}
              content="Analizează performanța"
            />
          </Link>
        </div>
      </div>
</div>
      <Dialog
        visible={editModalVisible}
        style={{ width: "50vw" }}
        header="Editează secțiunea"
        modal
        onHide={() => setEditModalVisible(false)}
        footer={
          <div className={style.btnModalaZona}>
            <Button
              content="Anulează"
              className={`p-button-text ${style.btnModala}`}
              onClick={() => setEditModalVisible(false)}
            />
            <Button
              content="Salvează"
              className={`p-button-text ${style.btnModala}`}
              onClick={() => updateSection()}
            />
          </div>
        }
      >
        <div className={style.pField}>
          <label htmlFor="denumire">Denumire</label>
          <input
            id="denumire"
            type="text"
            value={editSectionData.denumire}
            onChange={(e) =>
              setEditSectionData({ ...editSectionData, denumire: e.target.value })
            }
          />
        </div>
        <div className={style.pField}>
          <label htmlFor="descriere">Descriere</label>
          <textarea
            id="descriere"
            value={editSectionData.descriere}
            onChange={(e) =>
              setEditSectionData({ ...editSectionData, descriere: e.target.value })
            }
          />
        </div>
      </Dialog>

      <Dialog
        visible={addModalVisible}
        style={{ width: "50vw" }}
        header="Adaugă o nouă cerință"
        modal
        onHide={closeAddModal}
        footer={
          <div className={style.btnModalaZona}>
            <Button
              content="Anulează"
              className={`p-button-text ${style.btnModala}`}
              onClick={closeAddModal}
            />
            <Button
              content="Salvează"
              className={`p-button-text ${style.btnModala}`}
              onClick={handleAddAssignment}
            />
          </div>
        }
      >
       <div className={style.pField}>
  <label htmlFor="inputTitle">Titlu cerință</label>
  <input
    id="inputTitle"
    type="text"
    value={newAssignmentData.titlu}
    onChange={(e) =>
      setNewAssignmentData({
        ...newAssignmentData,
        titlu: e.target.value,
      })
    }
  />
</div>
<div className={style.pField}>
  <label htmlFor="textareaRequirement">Cerință</label>
  <textarea
    id="textareaRequirement"
    value={newAssignmentData.cerinta}
    onChange={(e) =>
      setNewAssignmentData({
        ...newAssignmentData,
        cerinta: e.target.value,
      })
    }
  />
</div>

      </Dialog>
      <Dialog
  visible={editModal2Visible}
  style={{ width: "50vw" }}
  header="Editează resursa video"
  modal
  onHide={() => setEditModal2Visible(false)}
  footer={
    <div className={style.btnModalaZona}>
      <Button
        content="Anulează"
        className={`p-button-text ${style.btnModala}`}
        onClick={() => setEditModal2Visible(false)}
      />
      <Button
        content="Salvează"
        className={`p-button-text ${style.btnModala}`}
        onClick={() => updateSection()}
      />
    </div>
  }
>
  <div className={style.pField}>
    <label htmlFor="video_link">Link Video</label>
    <input
      id="video_link"
      type="text"
      value={editSectionData.video_link}
      onChange={(e) =>
        setEditSectionData({ ...editSectionData, video_link: e.target.value })
      }
    />
  </div>
</Dialog>
      <Dialog
        visible={deleteConfirmationVisible}
        style={{ width: "50vw" }}
        header="Confirmare ștergere"
        modal
        onHide={() => setDeleteConfirmationVisible(false)}
        footer={
          <div className={style.btnModalaZona}>
            <Button
              content="Nu"
              className={`p-button-text ${style.btnModala}`}
              onClick={() => setDeleteConfirmationVisible(false)}
            />
            <Button
              content="Da"
              className={`p-button-text ${style.btnModala}`}
              onClick={() => deleteSectiune()}
            />
          </div>
        }
      >
        <p>
          Ești sigur că vrei să ștergi secțiunea "{sectiuneToDelete?.denumire}"?
          Această acțiune este ireversibilă.
        </p>
      </Dialog>
      
    </div>
    </div>
  );
}

export default CourseStatus;
