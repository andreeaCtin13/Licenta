import React, { useContext, useEffect, useState } from "react";
import style from "../../styles/mentor/Feedback.module.css";
import { useParams } from "react-router";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog } from "primereact/dialog";
import { Dock } from "primereact/dock";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Link } from "react-router-dom";
import {
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
  faHouse
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Button from "../../components/Button";

function Feedback() {
  const { idCourse } = useParams();
  const [page, setPage] = useState(1);
  const [totalRec, setTotalRec] = useState(1);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [metaKey, setMetaKey] = useState();
  const [assigmentsRows, setAssigmentsRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState();
  const [acordeonArray, setAcordeonArray] = useState([]);
  const [sectiuni, setSectiuni] = useState([]);
  const [activeIndex, setActiveIndex] = useState();
  const [idCerinta, setIdCerinta] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [fileToDownload, setFileToDownload] = useState();

  useEffect(() => {
    getSection();
  }, []);
  
  useEffect(() => {
    if (selectedScreen) {
      changeView(selectedScreen);
    }
  }, [selectedScreen]);
  
  useEffect(() => {
    setData(idCerinta);
  }, [idCerinta, page]);
  
  const setData = async (id_cerinta) => {
    try {
      const rez = await axios.get(
        `http://localhost:8080/istoricCerinte/getAll/${idCourse}/${id_cerinta}/filter?&take=8&skip=${page}&feedback=null`
      );
      setAssigmentsRows(rez.data.istoric);
      setTotalRec(Math.ceil(rez.data.count / 8) > 0 ? Math.ceil(rez.data.count / 8) : 1);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    setPage(1);
    setData();
  }, []);

  useEffect(() => {
    setData();
  }, [page]);

  const onPageChange = (e, type_event) => {
    if (type_event === "next" && page < totalRec / 8) {
      setPage(page + 1);
    } else if (type_event === "prev" && page > 1) {
      setPage(page - 1);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Rezolvări Încărcate</h4>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  const getTheLink = (rowData) => {
    const backendFilesDirectory = "/files";
    let file = rowData?.rezolvare;
    const fileName = file?.split(`\\`).pop();
    const fileRelativePath = `${backendFilesDirectory}/${fileName}`;
    const backendBaseUrl = "http://localhost:8080";
    const fileUrl = `${backendBaseUrl}${fileRelativePath}`;
    setFileToDownload(fileUrl);
    handleDownload(fileUrl);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <div className={style.btnZoneRequest}>
          <button
            className={`${style.btnRequest}`}
            onClick={() => {
              setSelectedRow(rowData);
              getTheLink(rowData);
            }}
          >
            Descarcă
          </button>
        </div>
      </React.Fragment>
    );
  };

  const handleDownload = (fileDown) => {
    window.open(fileDown, "_blank");
    clearSelection();
  };

  const clearSelection = () => {
    setSelectedRow(null);
  };

  const sendFeedback = async () => {
    try {
      await axios.put(
        `http://localhost:8080/istoricCerinte/updateIstoricAssigment/${selectedRow?.id_cerinta_istoric}`,
        { feedback }
      );
      setAssigmentsRows((prevRows) =>
        prevRows.filter(
          (row) => row.id_cerinta_istoric !== selectedRow.id_cerinta_istoric
        )
      );
      setVisible(false);
      clearSelection();

    } catch (err) {
      console.error(err);
    }
  };

  const changeView = async (index) => {
    try {
      const rez = await axios.get(
        `http://localhost:8080/cerinte/getAllCerinte/${index}`
      );
      setAcordeonArray(rez.data.cerinte);
    } catch (err) {
      console.error(err);
    }
  };

  const getSection = async () => {
    try {
      const rez = await axios.get(
        `http://localhost:8080/sectiuni/selectAll/${idCourse}`
      );
      setSelectedScreen(rez.data.sectiuni[0].id_sectiune);
      setSectiuni(rez.data.sectiuni);
      setItems(
        rez.data.sectiuni.map((x, index) => ({
          icon: (
            <button
              className={style.btnFeedback}
              onClick={() => {
                changeView(x.id_sectiune);
                setSelectedScreen(x.id_sectiune);
                setActiveIndex(null);
              }}
            >
              {index + 1}
            </button>
          ),
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSection();
  }, []);

  useEffect(() => {
    changeView(selectedScreen);
  }, [selectedScreen]);

  useEffect(() => {
    setData(idCerinta);
  }, [idCerinta]);

  const takeIstoricForCurrentAssigment = (event) => {
    if (acordeonArray[event.index]) {
      setIdCerinta(acordeonArray[event.index].id_cerinta);
    }
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.buttonZone}>
        <Link to={`/mentor-homepage/${idCourse}`}>
          <Button
            className={`${style.btn} ${style.btnCancel}`}
            content={<FontAwesomeIcon icon={faArrowLeft} />}
          ></Button>
        </Link>
        <Link to={`/mentor-homepage`}>
          <Button
            className={`${style.btn} ${style.btnHome}`}
            content={<FontAwesomeIcon icon={faHouse} />}
          ></Button>
        </Link>
      </div>
      <h1>Acordă direcții soluții</h1>
      <div className="dock-window">
        <Dock className={style.dock} model={items} position="bottom" />
      </div>
      <h2>
        Secțiunea{" "}
        {sectiuni.length > 0 ? (
          sectiuni.find((x) => x.id_sectiune === selectedScreen) ? (
            sectiuni.find((x) => x.id_sectiune === selectedScreen).denumire
          ) : (
            <></>
          )
        ) : (
          <>Nu există secțiuni create</>
        )}
      </h2>
      <Accordion
        activeIndex={activeIndex}
        onTabChange={(e) => {
          setActiveIndex(e.index);
          takeIstoricForCurrentAssigment(e);
        }}
      >
        {acordeonArray ? (
          acordeonArray.map((x) => {
            return (
              <AccordionTab
                header={x.titlu}
                id={x.id_cerinta}
                key={x.id_cerinta}
              >
                <h3>Cerința aferentă task-ului "{x.titlu}"</h3>
                <p className="m-0"> {x.cerinta}</p>
                <DataTable
                  className={style.dataTable}
                  value={assigmentsRows}
                  dataKey=""
                  rows={10}
                  totalRecords={totalRec}
                  onSelectionChange={(e) => {
                    setSelectedRow(e.value);
                    setVisible(true);
                  }}
                  selectionMode="single"
                  selection={selectedRow}
                  globalFilter={globalFilter}
                  header={header}
                  onRowClick={(e) => {
                   
                      setSelectedRow(e.data);
                    
                  }}
                >
                  <Column
                    field="nume"
                    header="Nume"
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="mail"
                    header="Mail"
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    field="data_finalizare"
                    header="Data Finalizare"
                    style={{ minWidth: "12rem" }}
                  ></Column>
                  <Column
                    body={actionBodyTemplate}
                    header="Rezolvare"
                    exportable={false}
                    style={{ minWidth: "5rem" }}
                  ></Column>
                </DataTable>
                <div className={style.paginationZone}>
                  <button
                    className={style.btnPagination}
                    onClick={(e) => onPageChange(e, "prev")}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>
                  <span>
                    Pagina {page} din {totalRec}
                  </span>
                  <button
                    className={style.btnPagination}
                    onClick={(e) => onPageChange(e, "next")}
                  >
                    <FontAwesomeIcon icon={faChevronRight} />
                  </button>
                </div>
              </AccordionTab>
            );
          })
        ) : (
          <div>nu exista</div>
        )}
      </Accordion>

      <Dialog
        header="Feedback"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className={style.modalContent}>
          Acordă feedback pentru {selectedRow ? selectedRow.nume : ""}!
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          ></textarea>
          <button
            className={style.btnTrimitereFeedback}
            onClick={sendFeedback}
          >
            Trimite feedback
          </button>
        </p>
      </Dialog>
    </div>
  );
}

export default Feedback;
