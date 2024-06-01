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
} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import Button from "../../components/Button";

function Feedback() {
  const { idCourse } = useParams();
  const [page, setPage] = useState(1);
  const [totalRec, setTotalRec] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const [metaKey, setMetaKey] = useState(false);
  const [assigmentsRows, setAssigmentsRows] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedScreen, setSelectedScreen] = useState(null);
  const [acordeonArray, setAcordeonArray] = useState([]);
  const [sectiuni, setSectiuni] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [idCerinta, setIdCerinta] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [fileToDownload, setFileToDownload] = useState("");

  const setData = async (id_cerinta) => {
    try {
      const rez = await axios.get(
        `http://localhost:8080/istoricCerinte/getAll/${idCourse}/${id_cerinta}/filter?&take=8&skip=${page}`
      );
      setAssigmentsRows(rez.data.istoric);
      setTotalRec(Math.ceil(rez.data.count / 8));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setData(idCerinta);
  }, [idCerinta, page]);

  useEffect(() => {
    const getSection = async () => {
      try {
        const rez = await axios.get(
          `http://localhost:8080/sectiuni/selectAll/${idCourse}`
        );
        setSelectedScreen(rez.data.sectiuni[0]?.id_sectiune);
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
    getSection();
  }, [idCourse]);

  useEffect(() => {
    if (selectedScreen !== null) changeView(selectedScreen);
  }, [selectedScreen]);

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

  const onPageChange = (e, type_event) => {
    if (type_event === "next" && page < totalRec) {
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

  const getTheLink = () => {
    const backendFilesDirectory = "/files";
    const file = selectedRow?.rezolvare;
    if (file) {
      const fileName = file.split(`\\`).pop();
      const fileRelativePath = `${backendFilesDirectory}/${fileName}`;
      const backendBaseUrl = "http://localhost:8080";
      const fileUrl = `${backendBaseUrl}${fileRelativePath}`;
      setFileToDownload(fileUrl);
    }
  };

  const actionBodyTemplate = (rowData) => (
    <React.Fragment>
      <div className={style.btnZoneRequest}>
        <Link
          to={fileToDownload}
          download="Example-PDF-document"
          target="_blank"
          rel="noreferrer"
        >
          <button
            className={style.btnRequest}
            onClick={() => {
              setSelectedRow(rowData);
              getTheLink();
            }}
          >
            Descarcă
          </button>
        </Link>
      </div>
    </React.Fragment>
  );

  const sendFeedback = async () => {
    try {
      await axios.put(
        `http://localhost:8080/istoricCerinte/updateIstoricAssigment/${selectedRow?.id_cerinta_istoric}`,
        { feedback }
      );
      setVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const takeIstoricForCurrentAssigment = (event) => {
    const cerinta = acordeonArray[event.index];
    if (cerinta) {
      setIdCerinta(cerinta.id_cerinta);
    }
  };

  return (
    <div className={style.mainContainer}>
      <Link to={`/mentor-homepage/${idCourse}`}>
        <Button
          className={`${style.btn} ${style.btnCancel}`}
          content={<FontAwesomeIcon icon={faArrowLeft} />}
        />
      </Link>
      <h1>Acordă direcții soluții</h1>
      <div className="dock-window">
        <Dock className={style.dock} model={items} position="bottom" />
      </div>
      <h2>
        {sectiuni.length > 0
          ? sectiuni.find((x) => x.id_sectiune === selectedScreen)?.denumire ||
            "Secțiunea"
          : "Nu există secțiuni create"}
      </h2>
      <Accordion
        activeIndex={activeIndex}
        onTabChange={takeIstoricForCurrentAssigment}
      >
        {acordeonArray.map((x) => (
          <AccordionTab header={x.titlu} key={x.id_cerinta}>
            <h3>Cerința aferentă task-ului "{x.titlu}"</h3>
            <p className="m-0">{x.cerinta}</p>
            <DataTable
              className={style.dataTable}
              value={assigmentsRows}
              rows={10}
              totalRecords={totalRec}
              onSelectionChange={(e) => setSelectedRow(e.value)}
              selectionMode="single"
              selection={selectedRow}
              metaKeySelection={metaKey}
              globalFilter={globalFilter}
              header={header}
            >
              <Column
                field="nume"
                header="Nume"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="mail"
                header="Mail"
                style={{ minWidth: "12rem" }}
              />
              <Column
                field="data_finalizare"
                header="Data Finalizare"
                style={{ minWidth: "12rem" }}
              />
              <Column
                body={actionBodyTemplate}
                header="Rezolvare"
                exportable={false}
                style={{ minWidth: "5rem" }}
              />
            </DataTable>
            <div className={style.paginationZone}>
              <button
                className={style.btnPagination}
                onClick={(e) => onPageChange(e, "prev")}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <span>
                Page {page} from {totalRec}
              </span>
              <button
                className={style.btnPagination}
                onClick={(e) => onPageChange(e, "next")}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          </AccordionTab>
        ))}
      </Accordion>
      <Dialog
        header="Feedback"
        visible={visible}
        maximizable
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <p className={style.modalContent}>
          Acordă feedback pentru {selectedRow?.nume || ""}!
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button className={style.btnTrimitereFeedback} onClick={sendFeedback}>
            Trimite feedback
          </button>
        </p>
      </Dialog>
    </div>
  );
}

export default Feedback;
